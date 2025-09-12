package models

type RefreshTokenParam struct {
	RefreshToken string `json:"refreshToken" binding:"required"`
}
