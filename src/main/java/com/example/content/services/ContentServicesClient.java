package com.example.content.services;

import okhttp3.OkHttpClient;
import okhttp3.logging.HttpLoggingInterceptor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.concurrent.TimeUnit;

public class ContentServicesClient {
    
    private static final Logger logger = LoggerFactory.getLogger(ContentServicesClient.class);
    
    private static OkHttpClient httpClient;
    
    // Content Services API configuration
    private static final String CONTENT_SERVICES_URL = "http://ips-edge-edge-devc.apps.ocp-uat.biat.int/api/content-service";
    private static final int TIMEOUT_SECONDS = 30;
    
    public static void initialize() {
        logger.info("Initializing Content Services client...");
        
        // Create HTTP logging interceptor
        HttpLoggingInterceptor loggingInterceptor = new HttpLoggingInterceptor();
        loggingInterceptor.setLevel(HttpLoggingInterceptor.Level.BODY);
        
        // Create HTTP client with authentication interceptor
        httpClient = new OkHttpClient.Builder()
                .addInterceptor(new AuthInterceptor())
                .addInterceptor(loggingInterceptor)
                .connectTimeout(TIMEOUT_SECONDS, TimeUnit.SECONDS)
                .readTimeout(TIMEOUT_SECONDS, TimeUnit.SECONDS)
                .writeTimeout(TIMEOUT_SECONDS, TimeUnit.SECONDS)
                .build();
        
        logger.info("Content Services client initialized successfully");
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
    
    private static class AuthInterceptor implements okhttp3.Interceptor {
        @Override
        public okhttp3.Response intercept(Chain chain) throws java.io.IOException {
            okhttp3.Request originalRequest = chain.request();
            
            // Get access token from Keycloak
            String token = KeycloakConfig.getAccessToken();
            
            // Add authorization header
            okhttp3.Request authenticatedRequest = originalRequest.newBuilder()
                    .header("Authorization", "Bearer " + token)
                    .build();
            
            return chain.proceed(authenticatedRequest);
        }
    }
} 