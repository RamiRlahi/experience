package com.example.content.services;

import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class KeycloakConfig {
    
    private static final Logger logger = LoggerFactory.getLogger(KeycloakConfig.class);
    
    private static Keycloak keycloak;
    
    // Keycloak configuration
    private static final String KEYCLOAK_URL = "http://localhost:8080";
    private static final String REALM = "myrealm";
    private static final String CLIENT_ID = "angular-client";
    private static final String USERNAME = "admin";
    private static final String PASSWORD = "password123";
    
    public static void initialize() {
        try {
            logger.info("Initializing Keycloak configuration...");
            
            keycloak = KeycloakBuilder.builder()
                    .serverUrl(KEYCLOAK_URL)
                    .realm(REALM)
                    .clientId(CLIENT_ID)
                    .username(USERNAME)
                    .password(PASSWORD)
                    .build();
            
            logger.info("Keycloak configuration initialized successfully");
            
        } catch (Exception e) {
            logger.error("Failed to initialize Keycloak configuration", e);
            throw new RuntimeException("Keycloak initialization failed", e);
        }
    }
    
    public static Keycloak getKeycloak() {
        if (keycloak == null) {
            throw new IllegalStateException("Keycloak not initialized. Call initialize() first.");
        }
        return keycloak;
    }
    
    public static String getAccessToken() {
        try {
            if (keycloak == null) {
                throw new IllegalStateException("Keycloak not initialized. Call initialize() first.");
            }
            
            String token = keycloak.tokenManager().getAccessToken().getToken();
            logger.debug("Retrieved access token successfully");
            return token;
            
        } catch (Exception e) {
            logger.error("Failed to get access token", e);
            throw new RuntimeException("Failed to get access token", e);
        }
    }
} 