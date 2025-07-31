# ContentStreamApi

All URIs are relative to *http://backbase.com/contentservices-public*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**renderContentStreamById**](ContentStreamApi.md#renderContentStreamById) | **GET** /client-api/contentstream-id/{repositoryId}/{objectId} |  |
| [**renderContentStreamByIdWithHttpInfo**](ContentStreamApi.md#renderContentStreamByIdWithHttpInfo) | **GET** /client-api/contentstream-id/{repositoryId}/{objectId} |  |
| [**renderContentStreamByRelationshipId**](ContentStreamApi.md#renderContentStreamByRelationshipId) | **GET** /client-api/contentstream-relationship/{relationshipId} |  |
| [**renderContentStreamByRelationshipIdWithHttpInfo**](ContentStreamApi.md#renderContentStreamByRelationshipIdWithHttpInfo) | **GET** /client-api/contentstream-relationship/{relationshipId} |  |



## renderContentStreamById

> File renderContentStreamById(repositoryId, objectId, download)



Gets content stream of an object by object id.

### Example

```java
// Import classes:
import com.example.content.services.invoker.ApiClient;
import com.example.content.services.invoker.ApiException;
import com.example.content.services.invoker.Configuration;
import com.example.content.services.invoker.models.*;
import com.example.content.services.api.ContentStreamApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://backbase.com/contentservices-public");

        ContentStreamApi apiInstance = new ContentStreamApi(defaultClient);
        String repositoryId = "repositoryId_example"; // String | Repository ID of the object to retrieve content stream of.
        String objectId = "objectId_example"; // String | Object ID to retrieve content stream of.
        Boolean download = true; // Boolean | Determines whether content should be downloaded (if true) or rendered (if false) in browser. Default value is false.
        try {
            File result = apiInstance.renderContentStreamById(repositoryId, objectId, download);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling ContentStreamApi#renderContentStreamById");
            System.err.println("Status code: " + e.getCode());
            System.err.println("Reason: " + e.getResponseBody());
            System.err.println("Response headers: " + e.getResponseHeaders());
            e.printStackTrace();
        }
    }
}
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **repositoryId** | **String**| Repository ID of the object to retrieve content stream of. | |
| **objectId** | **String**| Object ID to retrieve content stream of. | |
| **download** | **Boolean**| Determines whether content should be downloaded (if true) or rendered (if false) in browser. Default value is false. | [optional] |

### Return type

[**File**](File.md)


### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/octet-stream, application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Object is found. Content stream is returned. |  -  |
| **304** | Object is found. Content stream shoud be taken from cache. |  -  |
| **404** | Object not found |  -  |

## renderContentStreamByIdWithHttpInfo

> ApiResponse<File> renderContentStreamById renderContentStreamByIdWithHttpInfo(repositoryId, objectId, download)



Gets content stream of an object by object id.

### Example

```java
// Import classes:
import com.example.content.services.invoker.ApiClient;
import com.example.content.services.invoker.ApiException;
import com.example.content.services.invoker.ApiResponse;
import com.example.content.services.invoker.Configuration;
import com.example.content.services.invoker.models.*;
import com.example.content.services.api.ContentStreamApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://backbase.com/contentservices-public");

        ContentStreamApi apiInstance = new ContentStreamApi(defaultClient);
        String repositoryId = "repositoryId_example"; // String | Repository ID of the object to retrieve content stream of.
        String objectId = "objectId_example"; // String | Object ID to retrieve content stream of.
        Boolean download = true; // Boolean | Determines whether content should be downloaded (if true) or rendered (if false) in browser. Default value is false.
        try {
            ApiResponse<File> response = apiInstance.renderContentStreamByIdWithHttpInfo(repositoryId, objectId, download);
            System.out.println("Status code: " + response.getStatusCode());
            System.out.println("Response headers: " + response.getHeaders());
            System.out.println("Response body: " + response.getData());
        } catch (ApiException e) {
            System.err.println("Exception when calling ContentStreamApi#renderContentStreamById");
            System.err.println("Status code: " + e.getCode());
            System.err.println("Response headers: " + e.getResponseHeaders());
            System.err.println("Reason: " + e.getResponseBody());
            e.printStackTrace();
        }
    }
}
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **repositoryId** | **String**| Repository ID of the object to retrieve content stream of. | |
| **objectId** | **String**| Object ID to retrieve content stream of. | |
| **download** | **Boolean**| Determines whether content should be downloaded (if true) or rendered (if false) in browser. Default value is false. | [optional] |

### Return type

ApiResponse<[**File**](File.md)>


### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/octet-stream, application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Object is found. Content stream is returned. |  -  |
| **304** | Object is found. Content stream shoud be taken from cache. |  -  |
| **404** | Object not found |  -  |


## renderContentStreamByRelationshipId

> File renderContentStreamByRelationshipId(relationshipId)



Gets content stream of a relationship&#39;s target object by relationship id.

### Example

```java
// Import classes:
import com.example.content.services.invoker.ApiClient;
import com.example.content.services.invoker.ApiException;
import com.example.content.services.invoker.Configuration;
import com.example.content.services.invoker.models.*;
import com.example.content.services.api.ContentStreamApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://backbase.com/contentservices-public");

        ContentStreamApi apiInstance = new ContentStreamApi(defaultClient);
        String relationshipId = "relationshipId_example"; // String | Relationship ID of the target object.
        try {
            File result = apiInstance.renderContentStreamByRelationshipId(relationshipId);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling ContentStreamApi#renderContentStreamByRelationshipId");
            System.err.println("Status code: " + e.getCode());
            System.err.println("Reason: " + e.getResponseBody());
            System.err.println("Response headers: " + e.getResponseHeaders());
            e.printStackTrace();
        }
    }
}
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **relationshipId** | **String**| Relationship ID of the target object. | |

### Return type

[**File**](File.md)


### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/octet-stream, application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Object is found. Content stream is returned. |  -  |
| **304** | Object is found. Content stream shoud be taken from cache. |  -  |
| **404** | Object not found |  -  |

## renderContentStreamByRelationshipIdWithHttpInfo

> ApiResponse<File> renderContentStreamByRelationshipId renderContentStreamByRelationshipIdWithHttpInfo(relationshipId)



Gets content stream of a relationship&#39;s target object by relationship id.

### Example

```java
// Import classes:
import com.example.content.services.invoker.ApiClient;
import com.example.content.services.invoker.ApiException;
import com.example.content.services.invoker.ApiResponse;
import com.example.content.services.invoker.Configuration;
import com.example.content.services.invoker.models.*;
import com.example.content.services.api.ContentStreamApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://backbase.com/contentservices-public");

        ContentStreamApi apiInstance = new ContentStreamApi(defaultClient);
        String relationshipId = "relationshipId_example"; // String | Relationship ID of the target object.
        try {
            ApiResponse<File> response = apiInstance.renderContentStreamByRelationshipIdWithHttpInfo(relationshipId);
            System.out.println("Status code: " + response.getStatusCode());
            System.out.println("Response headers: " + response.getHeaders());
            System.out.println("Response body: " + response.getData());
        } catch (ApiException e) {
            System.err.println("Exception when calling ContentStreamApi#renderContentStreamByRelationshipId");
            System.err.println("Status code: " + e.getCode());
            System.err.println("Response headers: " + e.getResponseHeaders());
            System.err.println("Reason: " + e.getResponseBody());
            e.printStackTrace();
        }
    }
}
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **relationshipId** | **String**| Relationship ID of the target object. | |

### Return type

ApiResponse<[**File**](File.md)>


### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/octet-stream, application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Object is found. Content stream is returned. |  -  |
| **304** | Object is found. Content stream shoud be taken from cache. |  -  |
| **404** | Object not found |  -  |

