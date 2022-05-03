package routes

import (
	"net/http"

	"github.com/gorilla/mux"
	"github.com/sajjadth/all_my_links/controllers"
)

func LinkRoutes(router *mux.Router) {
	router.HandleFunc("/api/links/get", controllers.GetLinks).Methods(http.MethodPost)
	router.HandleFunc("/api/links/insert", controllers.InsertLink).Methods(http.MethodPost)
	router.HandleFunc("/api/links/delete", controllers.DeleteLink).Methods(http.MethodDelete)
	router.HandleFunc("/api/links/update", controllers.UpdateLink).Methods(http.MethodPut)
}
