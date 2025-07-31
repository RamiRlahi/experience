package com.example.content.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Main application class for Backbase Content Services integration.
 * This application provides integration with Backbase Content Services API
 * using Keycloak for authentication.
 */
public class ContentServicesApplication {
    
    private static final Logger logger = LoggerFactory.getLogger(ContentServicesApplication.class);

    public static void main(String[] args) {
        logger.info("Starting Backbase Content Services Application...");
        
        try {
            // Initialize Keycloak configuration
            KeycloakConfig.initialize();
            
            // Initialize Content Services client
            ContentServicesClient.initialize();
            
            logger.info("Backbase Content Services Application started successfully!");
            
            // Keep the application running
            Thread.currentThread().join();
            
        } catch (Exception e) {
            logger.error("Failed to start application", e);
            System.exit(1);
        }
    }
} 