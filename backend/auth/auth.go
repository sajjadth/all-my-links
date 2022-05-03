package auth

import (
	"errors"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/sajjadth/all_my_links/utils"
)

type JWTWrapped struct {
	SecretKey string
	Issuer    string
	ExpiresAT time.Time
}

type JWTClaims struct {
	UserId   int
	Username string
	jwt.StandardClaims
}

func (j *JWTWrapped) GenerateToken(userId int, username string) (signedToken string, err error) {
	claims := &JWTClaims{
		UserId:   userId,
		Username: username,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: j.ExpiresAT.Unix(),
			Issuer:    j.Issuer,
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	signedToken, err = token.SignedString([]byte(j.SecretKey))
	utils.ErrorHandler(err, "cant sign token")
	return
}

func (j *JWTWrapped) ValidateToken(signedToken string) (claims *JWTClaims, err error) {
	token, err := jwt.ParseWithClaims(signedToken, &JWTClaims{}, func(t *jwt.Token) (interface{}, error) { return []byte(j.SecretKey), nil })
	if err != nil {
		err = errors.New("couldn't parse token")
		return
	}
	claims, ok := token.Claims.(*JWTClaims)
	if !ok {
		err = errors.New("couldn't parse claims")
	}
	if claims.ExpiresAt < time.Now().Unix() {
		err = errors.New("JWT expired")
		return
	}
	return
}
