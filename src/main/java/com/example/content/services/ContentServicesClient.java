package com.example.content.services;

import okhttp3.OkHttpClient;
import okhttp3.logging.HttpLoggingInterceptor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.concurrent.TimeUnit;

/**
 * Content Services client for interacting with Backbase Content Services API.
 * This client will use the generated API code from the OpenAPI specification.
 */
public class ContentServicesClient {
    
    private static final Logger logger = LoggerFactory.getLogger(ContentServicesClient.class);
    
    private static OkHttpClient httpClient;
    
    // Configuration properties - these should be externalized
    private static final String CONTENT_SERVICES_URL = System.getProperty("content.services.url", "https://your-backbase-instance.com/content-services");
    private static final int TIMEOUT_SECONDS = Integer.parseInt(System.getProperty("content.services.timeout", "30"));
    
    public static void initialize() {
        logger.info("Initializing Content Services client...");
        
        try {
            // Create HTTP client with logging
            HttpLoggingInterceptor loggingInterceptor = new HttpLoggingInterceptor();
            loggingInterceptor.setLevel(HttpLoggingInterceptor.Level.BODY);
            
            httpClient = new OkHttpClient.Builder()
                    .addInterceptor(loggingInterceptor)
                    .addInterceptor(new AuthInterceptor())
                    .connectTimeout(TIMEOUT_SECONDS, TimeUnit.SECONDS)
                    .readTimeout(TIMEOUT_SECONDS, TimeUnit.SECONDS)
                    .writeTimeout(TIMEOUT_SECONDS, TimeUnit.SECONDS)
                    .build();
            
            logger.info("Content Services client initialized successfully");
            logger.info("Content Services URL: {}", CONTENT_SERVICES_URL);
            logger.info("Timeout: {} seconds", TIMEOUT_SECONDS);
            
        } catch (Exception e) {
            logger.error("Failed to initialize Content Services client", e);
            throw new RuntimeException("Content Services client initialization failed", e);
        }
    }
    
    public static OkHttpClient getHttpClient() {
        if (httpClient == null) {
            throw new IllegalStateException("Content Services client not initialized. Call initialize() first.");
        }
        return httpClient;
    }
    
    public static String getContentServicesUrl() {
        return CONTENT_SERVICES_URL;
    }
    
    /**
     * Authentication interceptor that adds Keycloak tokens to requests.
     */
    private static class AuthInterceptor implements okhttp3.Interceptor {
        @Override
        public okhttp3.Response intercept(Chain chain) throws java.io.IOException {
            okhttp3.Request originalRequest = chain.request();
            
            // Add authorization header with Keycloak token
            String token = KeycloakConfig.getAccessToken();
            okhttp3.Request authenticatedRequest = originalRequest.newBuilder()
                    .header("Authorization", "Bearer " + token)
                    .build();
            
            return chain.proceed(authenticatedRequest);
        }
    }
} 