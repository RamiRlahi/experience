package com.example.content.services.controller;

import com.example.content.services.KeycloakConfig;
import com.example.content.services.model.AuthRequest;
import com.example.content.services.model.AuthResponse;
import com.example.content.services.model.ApiResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import okhttp3.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class AuthController {
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    private static final ObjectMapper objectMapper = new ObjectMapper();
    private static final OkHttpClient httpClient = new OkHttpClient();

    public static String login(AuthRequest request) {
        try {
            // Create form data for Keycloak token request
            RequestBody formBody = new FormBody.Builder()
                    .add("grant_type", "password")
                    .add("client_id", "angular-client")
                    .add("username", request.getEmail())
                    .add("password", request.getPassword())
                    .build();

            Request keycloakRequest = new Request.Builder()
                    .url("http://172.28.92.29:8080/auth/realms/myrealm/protocol/openid-connect/token")
                    .post(formBody)
                    .build();

            try (Response response = httpClient.newCall(keycloakRequest).execute()) {
                if (response.isSuccessful() && response.body() != null) {
                    String responseBody = response.body().string();
                    Map<String, Object> tokenResponse = objectMapper.readValue(responseBody, Map.class);
                    
                    // Create success response
                    AuthResponse authResponse = new AuthResponse();
                    authResponse.setToken((String) tokenResponse.get("access_token"));
                    authResponse.setRefreshToken((String) tokenResponse.get("refresh_token"));
                    authResponse.setExpiresIn((Integer) tokenResponse.get("expires_in"));
                    
                    ApiResponse<AuthResponse> apiResponse = new ApiResponse<>();
                    apiResponse.setSuccess(true);
                    apiResponse.setData(authResponse);
                    
                    return objectMapper.writeValueAsString(apiResponse);
                } else {
                    // Create error response
                    ApiResponse<AuthResponse> apiResponse = new ApiResponse<>();
                    apiResponse.setSuccess(false);
                    apiResponse.setMessage("Invalid credentials");
                    
                    return objectMapper.writeValueAsString(apiResponse);
                }
            }
        } catch (Exception e) {
            logger.error("Login error", e);
            try {
                ApiResponse<AuthResponse> apiResponse = new ApiResponse<>();
                apiResponse.setSuccess(false);
                apiResponse.setMessage("Login failed: " + e.getMessage());
                
                return objectMapper.writeValueAsString(apiResponse);
            } catch (Exception ex) {
                return "{\"success\":false,\"message\":\"Internal server error\"}";
            }
        }
    }

    public static String register(AuthRequest request) {
        try {
            // For registration, we would typically create a user in Keycloak
            // This is a simplified version - in production you'd use Keycloak Admin API
            
            ApiResponse<AuthResponse> apiResponse = new ApiResponse<>();
            apiResponse.setSuccess(false);
            apiResponse.setMessage("Registration not implemented yet. Please create user in Keycloak admin console.");
            
            return objectMapper.writeValueAsString(apiResponse);
        } catch (Exception e) {
            logger.error("Registration error", e);
            try {
                ApiResponse<AuthResponse> apiResponse = new ApiResponse<>();
                apiResponse.setSuccess(false);
                apiResponse.setMessage("Registration failed: " + e.getMessage());
                
                return objectMapper.writeValueAsString(apiResponse);
            } catch (Exception ex) {
                return "{\"success\":false,\"message\":\"Internal server error\"}";
            }
        }
    }

    public static String refreshToken(String refreshToken) {
        try {
            RequestBody formBody = new FormBody.Builder()
                    .add("grant_type", "refresh_token")
                    .add("client_id", "angular-client")
                    .add("refresh_token", refreshToken)
                    .build();

            Request keycloakRequest = new Request.Builder()
                    .url("http://172.28.92.29:8080/auth/realms/myrealm/protocol/openid-connect/token")
                    .post(formBody)
                    .build();

            try (Response response = httpClient.newCall(keycloakRequest).execute()) {
                if (response.isSuccessful() && response.body() != null) {
                    String responseBody = response.body().string();
                    Map<String, Object> tokenResponse = objectMapper.readValue(responseBody, Map.class);
                    
                    AuthResponse authResponse = new AuthResponse();
                    authResponse.setToken((String) tokenResponse.get("access_token"));
                    authResponse.setRefreshToken((String) tokenResponse.get("refresh_token"));
                    authResponse.setExpiresIn((Integer) tokenResponse.get("expires_in"));
                    
                    ApiResponse<AuthResponse> apiResponse = new ApiResponse<>();
                    apiResponse.setSuccess(true);
                    apiResponse.setData(authResponse);
                    
                    return objectMapper.writeValueAsString(apiResponse);
                } else {
                    ApiResponse<AuthResponse> apiResponse = new ApiResponse<>();
                    apiResponse.setSuccess(false);
                    apiResponse.setMessage("Token refresh failed");
                    
                    return objectMapper.writeValueAsString(apiResponse);
                }
            }
        } catch (Exception e) {
            logger.error("Token refresh error", e);
            try {
                ApiResponse<AuthResponse> apiResponse = new ApiResponse<>();
                apiResponse.setSuccess(false);
                apiResponse.setMessage("Token refresh failed: " + e.getMessage());
                
                return objectMapper.writeValueAsString(apiResponse);
            } catch (Exception ex) {
                return "{\"success\":false,\"message\":\"Internal server error\"}";
            }
        }
    }
} 