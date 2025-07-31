package com.example.content.services.model;

public class AuthResponse {
    private String token;
    private String refreshToken;
    private int expiresIn;
    private User user;

    // Default constructor
    public AuthResponse() {}

    // Constructor with parameters
    public AuthResponse(String token, String refreshToken, int expiresIn) {
        this.token = token;
        this.refreshToken = refreshToken;
        this.expiresIn = expiresIn;
    }

    public AuthResponse(String token, String refreshToken, int expiresIn, User user) {
        this.token = token;
        this.refreshToken = refreshToken;
        this.expiresIn = expiresIn;
        this.user = user;
    }

    // Getters and setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public int getExpiresIn() {
        return expiresIn;
    }

    public void setExpiresIn(int expiresIn) {
        this.expiresIn = expiresIn;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "AuthResponse{" +
                "token='[HIDDEN]'" +
                ", refreshToken='[HIDDEN]'" +
                ", expiresIn=" + expiresIn +
                ", user=" + user +
                '}';
    }
} 