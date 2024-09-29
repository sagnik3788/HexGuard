package main

import(
	"log"
    "net/http"

    "github.com/gin-gonic/gin"
)

func main(){
	router := gin.Default()
	router.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "server is ok!",
		})
	})

	if err := router.Run(":3000"); err != nil {
		log.Fatal("failed to run server")
	}
}