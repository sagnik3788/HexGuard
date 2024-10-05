package upload

import (
	"context"
	"fmt"
	"log"
	"mime/multipart"
	"net/http"
	"os"
	"time"

	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/gin-gonic/gin"
	"github.com/streadway/amqp"
)

func UploadHandler(c *gin.Context) {
	file, header, err := c.Request.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "File is required"})
		return
	}
	defer file.Close()

	if err := ValidateBinaryFile(header); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	fileName := fmt.Sprintf("%d%s", time.Now().Unix(), header.Filename)

	bucketName := os.Getenv("BucketName")

	fmt.Println(bucketName)

	if bucketName == "" {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Bucket name not set"})
		return
	}

	fileURL, err := uploadFileTos3(file, fileName, "hex-bucket")
	if err != nil {
		log.Println("Upload error:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to upload file"})
		return
	}

	err = publishToRabbitMQ(fileURL)
	if err != nil {
		log.Println("RabbitMQ publish error:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to publish message"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"file_url": fileURL})
}

func uploadFileTos3(file multipart.File, fileName string, bucketName string) (string, error) {
	region := os.Getenv("region")
	if region == "" {
		return "", fmt.Errorf("region not set")
	}

	cfg, err := config.LoadDefaultConfig(context.TODO(), config.WithRegion(region))
	if err != nil {
		return "", fmt.Errorf("failed to load configuration, %v", err)
	}

	svc := s3.NewFromConfig(cfg)

	ctx, cancel := context.WithTimeout(context.TODO(), 10*time.Second)
	defer cancel()

	input := &s3.PutObjectInput{
		Bucket: aws.String(bucketName),
		Key:    aws.String(fileName),
		Body:   file,
	}

	_, err = svc.PutObject(ctx, input)
	if err != nil {
		return "", fmt.Errorf("failed to upload file, %v", err)
	}

	fileURL := fmt.Sprintf("https://%s.s3.%s.amazonaws.com/%s", bucketName, region, fileName)
	return fileURL, nil
}


func publishToRabbitMQ(fileURL string)  error {
	//connect 

	conn , err := amqp.Dial("amqp://guest:guest@localhost:5672/")

	if err != nil {
		return fmt.Errorf("failed to connect to RabbitMQ, %v", err)
	}

	defer conn.Close()

	ch , err := conn.Channel()

	if err != nil {
		return fmt.Errorf("failed to open a channel, %v", err)
}

	defer ch.Close()

	// q, err := ch.QueueDeclare(
	// 	"file_uploads", // name
	// 	false,           // durable
	// 	false,        // delete when unused
	// 	false,          // exclusive
	// 	false,          // no-wait
	// 	nil,            // arguments
	// )
	q, err := ch.QueueDeclare(
		"file_uploads", // name
		false,           // durable
		false,          // delete when unused
		false,          // exclusive
		false,          // no-wait
		nil,            // arguments
	)

	if err != nil {
		return fmt.Errorf("failed to declare a queue, %v", err)
	}

	err = ch.Publish(
		"",          // exchange
		q.Name,     // routing key (queue name)
		false,      // mandatory
		false,      // immediate
		amqp.Publishing{
			ContentType: "text/plain",
			Body:        []byte(fileURL),
			DeliveryMode: amqp.Persistent,
		})

		

		if err != nil {
			return fmt.Errorf("failed to publish a message: %v", err)
		}
	
		log.Printf(" [x] Published %s to RabbitMQ", fileURL)
		return nil


}

