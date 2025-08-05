package com.example.content.services;

import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.util.concurrent.Executors;

/**
 * Main application class for Backbase Content Services integration.
 * This application provides integration with Backbase Content Services API
 * using Keycloak for authentication.
 */
public class ContentServicesApplication {
    
    private static final Logger logger = LoggerFactory.getLogger(ContentServicesApplication.class);
    private static final int PORT = 3000;

    public static void main(String[] args) {
        logger.info("Starting Backbase Content Services Application...");
        
        try {
            // Initialize Keycloak configuration
            KeycloakConfig.initialize();
            
            // Initialize Content Services client
            ContentServicesClient.initialize();
            
            // Create HTTP server
            HttpServer server = HttpServer.create(new InetSocketAddress("0.0.0.0", PORT), 0);
            
            // Add CORS headers to all responses
            server.createContext("/client-api", new CorsHandler(new ApiHandler()));
            
            // Set thread pool
            server.setExecutor(Executors.newFixedThreadPool(10));
            
            // Start server
            server.start();
            
            logger.info("Backbase Content Services Application started successfully!");
            logger.info("HTTP server running on http://localhost:{}", PORT);
            logger.info("API endpoints available at http://localhost:{}/client-api/", PORT);
            
            // Keep the application running
            logger.info("Application is running. Press Ctrl+C to exit.");
            Thread.currentThread().join();
            
        } catch (Exception e) {
            logger.error("Failed to start application", e);
            System.exit(1);
        }
    }
    
    static class CorsHandler implements HttpHandler {
        private final HttpHandler handler;
        
        public CorsHandler(HttpHandler handler) {
            this.handler = handler;
        }
        
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            // Add CORS headers
            exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "http://localhost:4200");
            exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "http://172.28.92.29:4200");
            exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type, Authorization");
            exchange.getResponseHeaders().add("Access-Control-Allow-Credentials", "true");
            
            // Handle preflight requests
            if (exchange.getRequestMethod().equalsIgnoreCase("OPTIONS")) {
                exchange.sendResponseHeaders(200, -1);
                return;
            }
            
            // Call the actual handler
            handler.handle(exchange);
        }
    }
    
    static class ApiHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String path = exchange.getRequestURI().getPath();
            String method = exchange.getRequestMethod();
            
            logger.info("{} {}", method, path);
            
            try {
                if (path.equals("/client-api/repositories") && method.equals("GET")) {
                    handleGetRepositories(exchange);
                } else if (path.equals("/client-api/content/query") && method.equals("POST")) {
                    handleQueryContent(exchange);
                } else if (path.equals("/client-api/content/search") && method.equals("POST")) {
                    handleSearchContent(exchange);
                } else if (path.equals("/client-api/health") && method.equals("GET")) {
                    handleHealth(exchange);
                } else {
                    handleNotFound(exchange);
                }
            } catch (Exception e) {
                logger.error("Error handling request", e);
                handleError(exchange, e);
            }
        }
        
        private void handleGetRepositories(HttpExchange exchange) throws IOException {
            String response = "[{\"id\":\"repo1\",\"name\":\"Test Repository\",\"description\":\"A test repository\"}]";
            sendResponse(exchange, 200, response, "application/json");
        }
        
        private void handleQueryContent(HttpExchange exchange) throws IOException {
            String response = "[]";
            sendResponse(exchange, 200, response, "application/json");
        }
        
        private void handleSearchContent(HttpExchange exchange) throws IOException {
            String response = "[]";
            sendResponse(exchange, 200, response, "application/json");
        }
        
        private void handleHealth(HttpExchange exchange) throws IOException {
            sendResponse(exchange, 200, "OK", "text/plain");
        }
        
        private void handleNotFound(HttpExchange exchange) throws IOException {
            sendResponse(exchange, 404, "Not Found", "text/plain");
        }
        
        private void handleError(HttpExchange exchange, Exception e) throws IOException {
            sendResponse(exchange, 500, "Internal Server Error: " + e.getMessage(), "text/plain");
        }
        
        private void sendResponse(HttpExchange exchange, int statusCode, String response, String contentType) throws IOException {
            exchange.getResponseHeaders().add("Content-Type", contentType);
            exchange.sendResponseHeaders(statusCode, response.getBytes().length);
            
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(response.getBytes());
            }
        }
    }
} 