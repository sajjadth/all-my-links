package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/sajjadth/all_my_links/routes"
	"github.com/sajjadth/all_my_links/utils"
)

func main() {
	err := godotenv.Load()
	utils.ErrorHandler(err, "cant load env var")
	hostName := fmt.Sprintf("%s:%s", os.Getenv("HOST"), os.Getenv("APPPORT"))

	router := mux.NewRouter()

	routes.UserRoutes(router)
	routes.LinkRoutes(router)

	log.Fatal(http.ListenAndServe(hostName, handlers.CORS(handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"}), handlers.AllowedMethods([]string{"GET", "POST", "DELETE", "PUT", "HEAD", "OPTIONS"}), handlers.AllowedOrigins([]string{"*"}))(router)))
}
