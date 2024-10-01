package api

import (
	"hexguard/api/upload"
	"net/http"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine) {
    router.GET("/", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{
            "message": "running",
          })
    })
    
    // Upload endpoint
    router.POST("/api/v1/upload", upload.UploadHandler)
}
