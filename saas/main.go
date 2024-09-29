package main

import(
	"log"

    "github.com/gin-gonic/gin"
	"hexguard/db"
)

func main(){

	db.ConnectToDatabase()
	

	router := gin.Default()
	router.GET("/", func(c *gin.Context) {
		c.Header("Content-Type", "text/html")
		c.String(200, "<h1>HexGuard Go!</h1>")
	})

	if err := router.Run(":3000"); err != nil {
		log.Fatal("failed to run server")
	}
}
