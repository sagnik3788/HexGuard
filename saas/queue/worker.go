package queue

import (
	"fmt"
	"log"
	"time"

	// "time"

	"github.com/streadway/amqp"
)

func ConsumeFromRabbitMQ() {
	// Connect to RabbitMQ
	conn, err := amqp.Dial("amqp://guest:guest@localhost:5672/")
	if err != nil {
		log.Fatalf("Failed to connect to RabbitMQ: %v", err)
		return
	}
	defer conn.Close()

	// Open a channel
	ch, err := conn.Channel()
	if err != nil {
		log.Fatalf("Failed to open a channel: %v", err)
		return
	}
	defer ch.Close()

	// Declare the queue
	q, err := ch.QueueDeclare(
		"file_uploads", // name
		false,          // durable
		false,          // delete when unused
		false,          // exclusive
		false,          // no-wait
		nil,            // arguments
	)
	if err != nil {
		log.Fatalf("Failed to declare a queue: %v", err)
		return
	}

	// Set QoS to ensure only one unacknowledged message is delivered at a time
	err = ch.Qos(1, 0, false)
	if err != nil {
		log.Fatalf("Failed to set QoS: %v", err)
		return
	}

	// Consume messages from the queue
	msgs, err := ch.Consume(
		q.Name, // queue
		"",     // consumer
		false,  // auto-ack (manual acknowledgment)
		false,  // exclusive
		false,  // no-local
		false,  // no-wait
		nil,    // args
	)
	if err != nil {
		log.Fatalf("Failed to register a consumer: %v", err)
		return
	}

	forever := make(chan bool)

	// Start consuming messages
	go func() {
		for d := range msgs {
			s3URL := string(d.Body)
			fmt.Printf("Received S3 URL: %s\n", s3URL)
			log.Printf("Processing message: %s", s3URL)

			// Simulate a 10-second processing delay
			 time.Sleep(10 * time.Second)

			// Manually acknowledge the message
			if err := d.Ack(false); err != nil {
				log.Printf("Failed to acknowledge message: %v", err)
			} else {
				log.Printf("Message acknowledged: %s", s3URL)
			}
		}
	}()

	fmt.Println(" [*] Waiting for messages. To exit press CTRL+C")
	<-forever
}

