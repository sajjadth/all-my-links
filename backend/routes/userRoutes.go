package routes

import (
	"net/http"

	"github.com/gorilla/mux"
	"github.com/sajjadth/all_my_links/controllers"
)

func UserRoutes(router *mux.Router) {
	router.HandleFunc("/api/user/signup", controllers.RegisterUser).Methods(http.MethodPost)
	router.HandleFunc("/api/user/login", controllers.LoginUser).Methods(http.MethodPost)
	router.HandleFunc("/api/user/validate", controllers.ValidateUser).Methods(http.MethodPost)
	router.HandleFunc("/api/user/update/displayinfo", controllers.UpdateDisplayInfo).Methods(http.MethodPut)
	router.HandleFunc("/api/user/{username}", controllers.GetUserToShow).Methods(http.MethodGet)
}
