package controllers

import (
	"net/http"
	"os"
	"time"

	"github.com/Iknite-Space/c4-project-boilerplate/api/api/models"
	"github.com/Iknite-Space/c4-project-boilerplate/api/db/store"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

var jwtSecret = []byte(os.Getenv("JWT_SECRET"))

type AuthController struct {
	store store.Store
}

func NewAuthController(store store.Store) *AuthController {
	return &AuthController{
		store: store,
	}
}

func (h *AuthController) Login(c *gin.Context) {
	var req models.LoginParams

	if err := c.ShouldBindBodyWithJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid body"})
		return
	}

	//get user from db
	user, err := h.store.Do().GetUserByEmail(c, req.Email)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid email/password"})
		return
	}

	//compare plain password to stored hashed password
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "invalid email or password"})
		return
	}

	//generate jwt access token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": user.ID,
		"email":   user.Email,
		"exp":     time.Now().Add(time.Minute * 15).Unix(), // expires in 15 minutes
	})
	accessToken, _ := token.SignedString(jwtSecret)

	//create refresh token
	refresh := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": user.ID,
		"email":   user.Email,
		"exp":     time.Now().Add(time.Hour * 24 * 30).Unix(), // expires in 24h
	})
	refreshToken, _ := refresh.SignedString(jwtSecret)

	c.JSON(http.StatusOK, gin.H{
		"success":      true,
		"user":         user,
		"accessToken":  accessToken,
		"refreshToken": refreshToken,
	})

}

func (h *AuthController) Refresh(c *gin.Context) {
	var req models.RefreshTokenParam
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Missing refresh token"})
		return
	}

	// Parse refresh token
	token, err := jwt.Parse(req.RefreshToken, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, jwt.ErrTokenInvalidClaims
		}
		return jwtSecret, nil
	})

	if err != nil || !token.Valid {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid or expired refresh token"})
		return
	}

	// Extract claims
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid token claims"})
		return
	}

	// Issue new access token
	newAccess := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": claims["user_id"],
		"email":   claims["email"],
		"exp":     time.Now().Add(time.Minute * 15).Unix(),
	})
	accessToken, _ := newAccess.SignedString(jwtSecret)

	// re-issue new refresh token for sliding expiration
	newRefresh := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": claims["user_id"],
		"email":   claims["email"],
		"exp":     time.Now().Add(time.Hour * 24 * 30).Unix(),
	})
	refreshToken, _ := newRefresh.SignedString(jwtSecret)

	c.JSON(http.StatusOK, gin.H{
		"success":      true,
		"accessToken":  accessToken,
		"refreshToken": refreshToken,
	})
}
