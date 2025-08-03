# Content Services API Integration

This document describes the integration of the Backbase Content Services API with the Angular dashboard application.

## Overview

The application has been updated to use the Backbase Content Services API instead of local storage for managing repositories, folders, and files. The integration uses Keycloak authentication to secure API calls.

## Architecture

### Services

1. **ContentServicesApiService** (`src/services/content-services-api.service.ts`)
   - Handles all API calls to the Content Services API
   - Manages authentication headers using Keycloak tokens
   - Provides methods for CRUD operations on repositories, folders, and files

2. **DashboardContentService** (`src/services/dashboard-content.service.ts`)
   - Orchestrates data flow between the API and dashboard component
   - Manages state for repositories, folders, and files
   - Handles data transformation and caching

### Models

Updated content models in `src/models/content.model.ts`:
- **Document**: Represents content items from the API
- **Repository**: Represents content repositories
- **DashboardFolder**: Extended folder model for UI display
- **DashboardFile**: Extended file model for UI display

## API Endpoints Used

The integration uses the following Content Services API endpoints:

- `GET /client-api/repositories` - List repositories
- `POST /client-api/repositories` - Create repository
- `DELETE /client-api/repositories/{id}` - Delete repository
- `POST /client-api/content/query` - Query content by path/ID
- `POST /client-api/content/search` - Search content
- `POST /client-api/content/save` - Save/create content
- `POST /client-api/content/remove` - Delete content
- `GET /client-api/content/stream/{id}` - Get file content
- `POST /client-api/content/upload` - Upload files

## Configuration

### API URL Configuration

Update the API base URL in `src/services/content-services-api.service.ts`:

```typescript
private readonly API_BASE_URL = 'http://your-content-services-api-url/client-api';
```

### Keycloak Configuration

Ensure your Keycloak configuration matches the settings in your Keycloak server:

- **Realm**: `myrealm`
- **Client ID**: `angular-client`
- **Client Type**: Public (Client authentication: OFF)

## Features

### Dashboard Features

1. **Repository Management**
   - View all repositories
   - Create new repositories
   - Delete repositories

2. **Folder Management**
   - View folders across all repositories
   - Create new folders
   - Delete folders
   - Navigate into folders

3. **File Management**
   - View files across all repositories
   - Upload files
   - Delete files
   - File preview on hover

4. **Search Functionality**
   - Search across repositories, folders, and files
   - Real-time search results

5. **Layout Options**
   - Card view
   - Grid view
   - Table view

### Authentication

- Uses Keycloak authentication tokens
- Automatic token refresh
- Secure API calls with Bearer tokens

## Usage

### Starting the Application

1. **Start Keycloak**:
   ```bash
   docker run -d --name keycloak -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin -v ./keycloak_data:/opt/keycloak/data quay.io/keycloak/keycloak:22.0.5 start-dev
   ```

2. **Configure Keycloak**:
   - Access Keycloak Admin Console: `http://localhost:8080/admin`
   - Create realm: `myrealm`
   - Create client: `angular-client` (public client)
   - Create user with credentials

3. **Start Content Services API**:
   - Ensure your Content Services API is running on the configured URL

4. **Start Angular Application**:
   ```bash
   cd experience
   ng serve
   ```

### Using the Dashboard

1. **Login**: Use your Keycloak credentials
2. **View Content**: Browse repositories, folders, and files
3. **Search**: Use the search bar to find specific content
4. **Upload**: Use the floating action button to create new content
5. **Preview**: Hover over files to see previews

## Error Handling

The application includes comprehensive error handling:

- **Loading States**: Shows loading spinners during API calls
- **Error States**: Displays error messages with retry options
- **Network Errors**: Handles connection issues gracefully
- **Authentication Errors**: Redirects to login when tokens expire

## File Preview

The dashboard supports file previews for various file types:

- **Images**: PNG, JPG, JPEG
- **Documents**: PDF, TXT, JSON, XML
- **Videos**: MP4
- **Other**: Generic file information

## Security

- All API calls are authenticated using Keycloak tokens
- Tokens are automatically refreshed
- Sensitive data is not stored locally
- HTTPS is recommended for production

## Troubleshooting

### Common Issues

1. **401 Unauthorized Errors**
   - Check Keycloak client configuration
   - Verify token is valid
   - Ensure client is public type

2. **API Connection Errors**
   - Verify Content Services API is running
   - Check API URL configuration
   - Ensure CORS is properly configured

3. **File Upload Issues**
   - Check file size limits
   - Verify supported file types
   - Ensure proper permissions

### Debug Mode

Enable debug logging by checking browser console for detailed error messages and API call logs.

## Future Enhancements

Potential improvements for the integration:

1. **Advanced Search**: Full-text search with filters
2. **Bulk Operations**: Multi-select and bulk actions
3. **Version Control**: File versioning support
4. **Collaboration**: Sharing and permissions
5. **Offline Support**: Caching for offline access
6. **Real-time Updates**: WebSocket integration for live updates 