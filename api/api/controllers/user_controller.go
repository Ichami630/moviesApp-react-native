package controllers

import (
	"net/http"

	"github.com/Iknite-Space/c4-project-boilerplate/api/db/repo"
	"github.com/Iknite-Space/c4-project-boilerplate/api/db/store"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

type UserController struct {
	store store.Store
}

func NewUserController(store store.Store) *UserController {
	return &UserController{
		store: store,
	}
}

// regirster a new user
func (h *UserController) Register(c *gin.Context) {
	var req repo.CreateUserParams

	if err := c.ShouldBindBodyWithJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	//hash the password
	hashpwd, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "could not hash password"})
		return
	}
	//insert user's info to db
	if err := h.store.Do().CreateUser(c, repo.CreateUserParams{
		Name:     req.Name,
		Email:    req.Email,
		Password: string(hashpwd),
	}); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to create user"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"success": true,
		"message": "User Created Successfuly",
	})
}
