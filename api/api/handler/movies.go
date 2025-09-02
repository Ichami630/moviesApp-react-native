package handler

import (
	"database/sql"
	"errors"
	"net/http"

	"github.com/Iknite-Space/c4-project-boilerplate/api/db/repo"
	"github.com/Iknite-Space/c4-project-boilerplate/api/db/store"
	"github.com/gin-gonic/gin"
)

type MetricHandler struct {
	store store.Store
}

func NewMetricHandler(store store.Store) *MetricHandler {
	return &MetricHandler{
		store: store,
	}
}

func (h *MetricHandler) NewTrendingMovies(c *gin.Context) {
	var req repo.CreateMetricParams

	if err := c.ShouldBindBodyWithJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Try to get existing record
	metric, err := h.store.Do().GetMetricByTitle(c, req.Title)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			// No record found, create new
			_, err := h.store.Do().CreateMetric(c, req)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			c.JSON(http.StatusCreated, gin.H{"success": true})
			return
		}

		// Some other DB error
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// If movie exists, increment the count for that movies
	err = h.store.Do().UpdateMetric(c, metric.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"success": true})
}
