package com.example.content.services;

import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class KeycloakConfig {
    
    private static final Logger logger = LoggerFactory.getLogger(KeycloakConfig.class);
    
    private static Keycloak keycloak;
    
    // Keycloak configuration
    private static final String KEYCLOAK_URL = "http://172.28.92.29:8080/auth";
    private static final String REALM = "biat-bank-employee";
    private static final String CLIENT_ID = "bb-tooling-client";
    private static final String USERNAME = "admin";
    private static final String PASSWORD = "admin";
    
    
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