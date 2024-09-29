package db

import (
	"fmt"
	"log"

	"github.com/appwrite/sdk-for-go/appwrite"
)

func ConnectToDatabase() {
	client := appwrite.NewClient(
		appwrite.WithEndpoint("https://cloud.appwrite.io/v1"),
		appwrite.WithProject("66f92c100024c100be11"),
		appwrite.WithKey("standard_6a69a0968628bf4af3bf3e4feefe0ef82e367856a0fc96b5a8d1a0f3d48ecc2c7c4b9d04e92baded048d8eaa8469026d63df6f671301f00b792a4c2d083e68d07c43e10752e82fc9315efad1d35722fbaff5ac836022e8db440cd3a61177328757ee9f91cfb5c9ee1c0185c6cbdce4c5a5f82bb7640c650b95580dbb0288de3c"), // Use env vars for sensitive data
	)

	databases := appwrite.NewDatabases(client)

    _, err := databases.Get("66f94f020019390d6d7f")

    if err!=nil{
        log.Fatalf("Failed to get database: %v", err)
     }

    fmt.Println("Connected to database")

}
