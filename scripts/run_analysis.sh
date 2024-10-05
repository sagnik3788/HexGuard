#!/bin/bash

# Define your RabbitMQ configurations
RABBITMQ_QUEUE="file_uploads"
RABBITMQ_HOST="localhost"
RABBITMQ_USER="guest"
RABBITMQ_PASS="guest"

# Define your Docker image
DOCKER_IMAGE="x64dbg-analysis-container"   # Set your Docker image name

# Define a lock file directory
LOCK_DIR="/tmp/rabbitmq_lock"

# Function to process a file
process_file() {
    local file_path=$1
    local lock_file="${LOCK_DIR}/$(basename "$file_path").lock"

    # Check if the lock file exists
    if [ -f "$lock_file" ]; then
        echo "File is already being processed: $file_path"
        return
    fi

    # Create a lock file
    touch "$lock_file"
    echo "Processing file: $file_path"

    filename=$(basename "$file_path")

    # Run a Docker container to download and analyze the file in the background
    container_id=$(docker run -d --rm "${DOCKER_IMAGE}" \
        /bin/bash -c "wget -P /analysis/files '$file_path' && python3 /analysis/files/${filename}")

    echo "Container ${container_id} started for ${filename}"

    # Remove the lock file after processing
    # Use a background job to remove the lock file once the Docker container is done
    {
        wait "$container_id"  # Wait for the container to finish
        rm -f "$lock_file"    # Remove the lock file after processing
        echo "Processing complete for ${file_path}. Lock file removed."
    } &  # Run this cleanup in the background
}

# Function to acknowledge a message in RabbitMQ
acknowledge_message() {
    local message_id=$1
    local url="http://${RABBITMQ_HOST}:15672/api/queues/%2F/${RABBITMQ_QUEUE}/messages"
    
    curl -u "${RABBITMQ_USER}:${RABBITMQ_PASS}" -H "Content-Type: application/json" -X DELETE "${url}" -d "{\"id\":\"${message_id}\",\"ack\":true}"
}

# Function to listen to RabbitMQ for new files
consume_rabbitmq_messages() {
    echo "Listening to RabbitMQ queue: ${RABBITMQ_QUEUE}"

    while true; do
        message=$(rabbitmqadmin get queue="${RABBITMQ_QUEUE}" --format=raw_json -u "${RABBITMQ_USER}" -p "${RABBITMQ_PASS}" -H "${RABBITMQ_HOST}")

        if [[ -n "$message" ]]; then
            file_path=$(echo "$message" | jq -r '.[0].payload')
            message_id=$(echo "$message" | jq -r '.[0].properties["message_id"]')

            if [[ "$file_path" != "null" ]]; then
                echo "Received file: $file_path"
                process_file "$file_path" &  # Run process_file in the background
                
                # Acknowledge the message after processing it
                acknowledge_message "${message_id}"
            else
                echo "No valid file path received, waiting..."
            fi
        else
            echo "No new messages, waiting..."
        fi

        sleep 5  # Wait for a while before checking again
    done
}

# Create lock directory if it doesn't exist
mkdir -p "$LOCK_DIR"

# Start consuming messages from RabbitMQ and processing them
echo "Script started"
consume_rabbitmq_messages
