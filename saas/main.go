package main

import (
	"hexguard/api"
	"hexguard/db"
	"log"

	"github.com/gin-gonic/gin"
)

func main(){
	db.ConnectToDatabase()
	
	router := gin.Default()
	
	api.SetupRoutes(router)

	if err := router.Run(":3000"); err != nil {
		log.Fatal("failed to run server")
	}
}
