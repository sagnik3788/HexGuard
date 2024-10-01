package main

import (
	"hexguard/api"
	"hexguard/db"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main(){

	err := godotenv.Load()

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	db.ConnectToDatabase()
	
	router := gin.Default()
	
	api.SetupRoutes(router)

	if err := router.Run(":3000"); err != nil {
		log.Fatal("failed to run server")
	}
}
