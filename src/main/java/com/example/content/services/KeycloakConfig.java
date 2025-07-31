package com.example.content.services;

import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Keycloak configuration for authentication with Backbase Content Services.
 */
public class KeycloakConfig {
    
    private static final Logger logger = LoggerFactory.getLogger(KeycloakConfig.class);
    
    private static Keycloak keycloak;
    
    // Configuration properties - these should be externalized
    private static final String KEYCLOAK_URL = System.getProperty("keycloak.url", "http://localhost:8080");
    private static final String REALM = System.getProperty("keycloak.realm", "myrealm");
    private static final String CLIENT_ID = System.getProperty("keycloak.client.id", "angular-client");
    private static final String CLIENT_SECRET = System.getProperty("keycloak.client.secret", "your-client-secret");
    
    public static void initialize() {
        logger.info("Initializing Keycloak configuration...");
        
        try {
            keycloak = KeycloakBuilder.builder()
                    .serverUrl(KEYCLOAK_URL)
                    .realm(REALM)
                    .clientId(CLIENT_ID)
                    .clientSecret(CLIENT_SECRET)
                    .grantType("client_credentials")
                    .build();
            
            logger.info("Keycloak configuration initialized successfully");
            logger.info("Keycloak URL: {}", KEYCLOAK_URL);
            logger.info("Realm: {}", REALM);
            logger.info("Client ID: {}", CLIENT_ID);
            
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
            return getKeycloak().tokenManager().getAccessToken().getToken();
        } catch (Exception e) {
            logger.error("Failed to get access token", e);
            throw new RuntimeException("Failed to get access token", e);
        }
    }
} 