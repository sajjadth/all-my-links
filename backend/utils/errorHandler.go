package utils

import "log"

func ErrorHandler(err error, msg string) {
	if err != nil {
		log.Fatal(err, msg)
		return
	}
}
