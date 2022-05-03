package controllers

import (
	"encoding/json"
	"net/http"
	"os"
	"time"

	"github.com/gorilla/mux"
	"github.com/sajjadth/all_my_links/auth"
	"github.com/sajjadth/all_my_links/utils"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	UserId      int
	DisplayName string `json:"displayName"`
	Username    string `json:"username"`
	Password    string `json:"password"`
	Email       string `json:"email"`
	createdAt   time.Time
	updatedAt   time.Time
	success     bool
	message     string
	Discription string `json:"discription"`
	Token       string `json:"token"`
}

func (u *User) created() {
	now := time.Now()
	u.createdAt = now
}

func (u *User) updated() {
	now := time.Now()
	u.updatedAt = now
}

func (u *User) hashPassword() {
	hashed, err := bcrypt.GenerateFromPassword([]byte(u.Password), 14)
	utils.ErrorHandler(err, "cant hash password")
	u.Password = string(hashed)
}

func (u *User) comparePassword(password string) bool {
	cp := bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(password))
	return cp == nil
}

func (u *User) successful(status bool, msg string) {
	u.success = status
	u.message = msg
}

func (u *User) setUserIdAndUsername(userId int, username string) {
	u.UserId = userId
	u.Username = username
}

func RegisterUser(w http.ResponseWriter, r *http.Request) {
	user := &User{}
	json.NewDecoder(r.Body).Decode(&user)
	user.hashPassword()
	user.created()
	db := utils.DatabaseConnection()
	defer db.Close()
	_, err := db.Exec("INSERT INTO users (username, email, password, created_at) VALUES(?,?,?,?)",
		user.Username,
		user.Email,
		user.Password,
		user.createdAt)
	if err != nil {
		user.successful(false, "username or email already taken.")
	} else {
		user.successful(true, "account successfully created.")
	}
	json.NewEncoder(w).Encode(map[string]interface{}{"success": user.success, "message": user.message})
}

func LoginUser(w http.ResponseWriter, r *http.Request) {
	user := &User{}
	json.NewDecoder(r.Body).Decode(&user)
	password := user.Password
	db := utils.DatabaseConnection()
	err := db.QueryRow(`SELECT password,user_id FROM users WHERE username = ?`, user.Username).Scan(&user.Password, &user.UserId)
	if err != nil {
		user.successful(false, "username or password incorrect.")
		json.NewEncoder(w).Encode(map[string]interface{}{"success": user.success, "message": user.message})
		return
	}
	if isUserValid := user.comparePassword(password); !isUserValid {
		user.successful(false, "username or password incorrect.")
		json.NewEncoder(w).Encode(map[string]interface{}{"success": user.success, "message": user.message})
		return
	}
	claims := &auth.JWTWrapped{SecretKey: os.Getenv("JWTSECRETKEY"),
		ExpiresAT: time.Now().Add(time.Hour * 720),
		Issuer:    user.Username}
	token, err := claims.GenerateToken(user.UserId, user.Username)
	utils.ErrorHandler(err, "cant generate token")
	user.successful(true, "user successfully logged in.")
	json.NewEncoder(w).Encode(map[string]interface{}{"success": user.success, "message": user.message, "token": token})
}

func ValidateUser(w http.ResponseWriter, r *http.Request) {
	user := &User{}
	json.NewDecoder(r.Body).Decode(&user)
	token := auth.JWTWrapped{SecretKey: os.Getenv("JWTSECRETKEY")}
	_, err := token.ValidateToken(user.Token)
	if err != nil {
		user.successful(false, "token is not valid.")
		json.NewEncoder(w).Encode(map[string]interface{}{"success": user.success, "message": user.message})
		return
	}
	user.successful(true, "token is valid.")
	json.NewEncoder(w).Encode(map[string]interface{}{"success": user.success, "message": user.message})
}

func UpdateDisplayInfo(w http.ResponseWriter, r *http.Request) {
	user := &User{}
	claims := auth.JWTWrapped{SecretKey: os.Getenv("JWTSECRETKEY")}
	json.NewDecoder(r.Body).Decode(&user)
	data, err := claims.ValidateToken(user.Token)
	if err != nil {
		user.successful(false, "incorrect token.")
		json.NewEncoder(w).Encode(map[string]interface{}{"success": user.success, "message": user.message})
	}
	user.setUserIdAndUsername(data.UserId, data.Username)
	db := utils.DatabaseConnection()
	user.updated()
	res, errDb := db.Exec("UPDATE users SET display_name = ?, discription = ?, updated_at = ? WHERE user_id = ? AND username = ?;",
		user.DisplayName,
		user.Discription,
		user.updatedAt,
		user.UserId,
		user.Username)
	row, err := res.RowsAffected()
	utils.ErrorHandler(err, "cant show rows")
	if errDb != nil || row == 0 {
		user.successful(false, "incorrect info.")
		json.NewEncoder(w).Encode(map[string]interface{}{"success": user.success, "message": user.message})
		return
	}
	user.successful(true, "display info successfully updated.")
	json.NewEncoder(w).Encode(map[string]interface{}{"success": user.success, "message": user.message})
}

func GetUserToShow(w http.ResponseWriter, r *http.Request) {
	usernameTOShow := mux.Vars(r)["username"]
	user := &User{}
	links := &Links{}
	db := utils.DatabaseConnection()
	res, err := db.Query("SELECT user_id FROM users WHERE username = ?;", usernameTOShow)
	if err != nil {
		user.successful(false, "cant find user.")
		json.NewEncoder(w).Encode(map[string]interface{}{"success": user.success, "message": user.message})
		return
	}
	for res.Next() {
		err := res.Scan(&user.UserId)
		utils.ErrorHandler(err, "cant handle Scan user_id")
	}
	if user.UserId == 0 {
		user.successful(false, "cant find user.")
		json.NewEncoder(w).Encode(map[string]interface{}{"success": user.success, "message": user.message})
		return
	}
	utils.ErrorHandler(err, "cant scan user_id")
	res, err = db.Query("SELECT users.display_name, links.platform, links.username, users.discription FROM links JOIN users USING(user_id) WHERE user_id = ?;", user.UserId)
	if err != nil {
		user.successful(false, "cant find any result.")
		json.NewEncoder(w).Encode(map[string]interface{}{"success": user.success, "message": user.message})
		return
	}
	for res.Next() {
		link := &Link{}
		err := res.Scan(&user.DisplayName, &link.Platform, &link.Username, &user.Discription)
		utils.ErrorHandler(err, "cant handle Scan")
		links.Links = append(links.Links, link)
	}
	user.successful(true, "successfully find result's.")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"success":     user.success,
		"message":     user.message,
		"displayName": user.DisplayName,
		"links":       links.Links,
		"discription": user.Discription})
}
