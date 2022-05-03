package controllers

import (
	"encoding/json"
	"net/http"
	"os"
	"time"

	"github.com/sajjadth/all_my_links/auth"
	"github.com/sajjadth/all_my_links/utils"
)

type Link struct {
	LinkId   int    `json:"linkId"`
	Platform string `json:"platform"`
	Username string `json:"username"`
	Priority int    `json:"priority"`
}
type Links struct {
	LinkId            int `json:"linkId"`
	DisplayName       string
	Discription       string
	Links             []*Link `json:"links"`
	Token             string  `json:"token"`
	UserId            int
	success           bool
	message           string
	Platform          string `json:"platform"`
	PlatformsUsername string `json:"username"`
	username          string
	UpdatedAt         time.Time
}

func (l *Links) successful(status bool, msg string) {
	l.success = status
	l.message = msg
}

func (l *Links) setUserId(UserId int, username string) {
	l.UserId = UserId
	l.username = username
}

func (l *Links) Updated() {
	l.UpdatedAt = time.Now()
}

func GetLinks(w http.ResponseWriter, r *http.Request) {
	links := &Links{}
	claims := auth.JWTWrapped{SecretKey: os.Getenv("JWTSECRETKEY")}
	json.NewDecoder(r.Body).Decode(&links)
	data, err := claims.ValidateToken(links.Token)
	if err != nil {
		links.successful(false, "incorrect token.")
		json.NewEncoder(w).Encode(map[string]interface{}{"success": links.success, "message": links.message})
	}
	links.setUserId(data.UserId, data.Username)
	db := utils.DatabaseConnection()
	row, err := db.Query("SELECT links.platform, links.username, links.link_id, users.display_name, users.discription FROM links JOIN users USING(user_id) WHERE user_id = ?;",
		links.UserId)
	if err != nil {
		links.successful(false, "cant find any link.")
		json.NewEncoder(w).Encode(map[string]interface{}{"success": links.success, "message": links.message})
	}
	for row.Next() {
		link := &Link{}
		err := row.Scan(&link.Platform, &link.Username, &link.LinkId, &links.DisplayName, &links.Discription)
		utils.ErrorHandler(err, "cant scan link in to struct")
		links.Links = append(links.Links, link)
	}
	links.successful(true, "successfully find links.")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"success":     links.success,
		"message":     links.message,
		"links":       links.Links,
		"displayName": links.DisplayName,
		"username":    links.username,
		"discription": links.Discription})
}

func InsertLink(w http.ResponseWriter, r *http.Request) {
	links := &Links{}
	claims := auth.JWTWrapped{SecretKey: os.Getenv("JWTSECRETKEY")}
	json.NewDecoder(r.Body).Decode(&links)
	data, err := claims.ValidateToken(links.Token)
	if err != nil {
		links.successful(false, "incorrect token.")
		json.NewEncoder(w).Encode(map[string]interface{}{"success": links.success, "message": links.message})
	}
	links.setUserId(data.UserId, data.Username)
	db := utils.DatabaseConnection()
	_, err = db.Exec("INSERT INTO links(platform, username, user_id) VALUES(?,?,?);",
		links.Platform,
		links.PlatformsUsername,
		links.UserId)
	if err != nil {
		links.successful(false, "incorrect token.")
		json.NewEncoder(w).Encode(map[string]interface{}{"success": links.success, "message": links.message})
		return
	}
	links.successful(true, "link successfully added.")
	json.NewEncoder(w).Encode(map[string]interface{}{"success": links.success, "message": links.message})
}

func DeleteLink(w http.ResponseWriter, r *http.Request) {
	links := &Links{}
	claims := auth.JWTWrapped{SecretKey: os.Getenv("JWTSECRETKEY")}
	json.NewDecoder(r.Body).Decode(&links)
	data, err := claims.ValidateToken(links.Token)
	if err != nil {
		links.successful(false, "incorrect token.")
		json.NewEncoder(w).Encode(map[string]interface{}{"success": links.success, "message": links.message})
	}
	links.setUserId(data.UserId, data.Username)
	db := utils.DatabaseConnection()
	res, errDb := db.Exec("DELETE FROM links WHERE username = ? AND platform = ? AND user_id = ? AND link_id = ?;",
		links.PlatformsUsername,
		links.Platform,
		links.UserId,
		links.LinkId)
	row, err := res.RowsAffected()
	utils.ErrorHandler(err, "cant show rows")
	if errDb != nil || row == 0 {
		links.successful(false, "incorrect info.")
		json.NewEncoder(w).Encode(map[string]interface{}{"success": links.success, "message": links.message})
		return
	}
	links.successful(true, "link successfully deleted.")
	json.NewEncoder(w).Encode(map[string]interface{}{"success": links.success, "message": links.message})
}

func UpdateLink(w http.ResponseWriter, r *http.Request) {
	links := &Links{}
	claims := auth.JWTWrapped{SecretKey: os.Getenv("JWTSECRETKEY")}
	json.NewDecoder(r.Body).Decode(&links)
	data, err := claims.ValidateToken(links.Token)
	if err != nil {
		links.successful(false, "incorrect token.")
		json.NewEncoder(w).Encode(map[string]interface{}{"success": links.success, "message": links.message})
	}
	links.setUserId(data.UserId, data.Username)
	db := utils.DatabaseConnection()
	res, errDb := db.Exec("UPDATE links SET username = ? WHERE platform = ? AND user_id = ? AND  link_id = ?;",
		links.PlatformsUsername,
		links.Platform,
		links.UserId,
		links.LinkId)
	row, err := res.RowsAffected()
	utils.ErrorHandler(err, "cant show rows")
	if errDb != nil || row == 0 {
		links.successful(false, "incorrect info.")
		json.NewEncoder(w).Encode(map[string]interface{}{"success": links.success, "message": links.message})
		return
	}
	links.successful(true, "link successfully updated.")
	json.NewEncoder(w).Encode(map[string]interface{}{"success": links.success, "message": links.message})
}
