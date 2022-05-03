package utils

import (
	"database/sql"
	"fmt"
	"os"

	_ "github.com/go-sql-driver/mysql"
)

func DatabaseConnection() *sql.DB {
	dsn := fmt.Sprintf("%s:%s@(%s:%s)/%s?parseTime=true",
		os.Getenv("DATABASEUSERNAME"),
		os.Getenv("PASSWORD"),
		os.Getenv("HOST"),
		os.Getenv("PORT"),
		os.Getenv("DATABASENAME"))
	db, err := sql.Open("mysql", dsn)
	ErrorHandler(err, "cant connect to database")
	return db
}
