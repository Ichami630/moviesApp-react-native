package api

import (
	"net/http"

	"github.com/Iknite-Space/c4-project-boilerplate/api/api/controllers"
	"github.com/Iknite-Space/c4-project-boilerplate/api/db/store"
	"github.com/gin-gonic/gin"
)

type Router struct {
	store store.Store
}

func NewRouter(store store.Store) *Router {
	return &Router{
		store: store,
	}
}

func (h *Router) WireHttpHandler() http.Handler {

	r := gin.Default()
	r.Use(gin.CustomRecovery(func(c *gin.Context, _ any) {
		c.String(http.StatusInternalServerError, "Internal Server Error: panic")
		c.AbortWithStatus(http.StatusInternalServerError)
	}))

	//controllers
	movieCtrl := controllers.NewMovieController(h.store)
	userCtrl := controllers.NewUserController(h.store)

	//public routes
	r.GET("//healthcheck", h.handleHealthcheck)
	r.POST("/register", userCtrl.Register)
	r.POST("/trendingmovies", movieCtrl.NewTrendingMovies)
	r.GET("/trendingmovies", movieCtrl.GetTrendingMovies)

	return r
}

func (h *Router) handleHealthcheck(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "welcome check",
	})
}
