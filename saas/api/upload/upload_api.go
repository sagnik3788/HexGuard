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
