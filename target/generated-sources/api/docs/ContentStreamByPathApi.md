# ContentStreamByPathApi

All URIs are relative to *http://backbase.com/contentservices-public*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**renderContentStreamByPathClientApi**](ContentStreamByPathApi.md#renderContentStreamByPathClientApi) | **GET** /client-api/contentstream/{repositoryId}/{objectPath} |  |
| [**renderContentStreamByPathClientApiWithHttpInfo**](ContentStreamByPathApi.md#renderContentStreamByPathClientApiWithHttpInfo) | **GET** /client-api/contentstream/{repositoryId}/{objectPath} |  |



## renderContentStreamByPathClientApi

> File renderContentStreamByPathClientApi(repositoryId, objectPath, versionLabel, download)



Gets content stream of an object by path.

### Example

```java
// Import classes:
import com.example.content.services.invoker.ApiClient;
import com.example.content.services.invoker.ApiException;
import com.example.content.services.invoker.Configuration;
import com.example.content.services.invoker.models.*;
import com.example.content.services.api.ContentStreamByPathApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://backbase.com/contentservices-public");

        ContentStreamByPathApi apiInstance = new ContentStreamByPathApi(defaultClient);
        String repositoryId = "repositoryId_example"; // String | Repository ID of the object to retrieve content stream of.
        String objectPath = "objectPath_example"; // String | Path to retrieve the content stream of.
        String versionLabel = "versionLabel_example"; // String | Optional version of the content to be retrieved. Returns latest version when is not set.
        Boolean download = true; // Boolean | Determines whether content should be downloaded (if true) or rendered (if false) in browser. Default value is false.
        try {
            File result = apiInstance.renderContentStreamByPathClientApi(repositoryId, objectPath, versionLabel, download);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling ContentStreamByPathApi#renderContentStreamByPathClientApi");
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
| **objectPath** | **String**| Path to retrieve the content stream of. | |
| **versionLabel** | **String**| Optional version of the content to be retrieved. Returns latest version when is not set. | [optional] |
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

## renderContentStreamByPathClientApiWithHttpInfo

> ApiResponse<File> renderContentStreamByPathClientApi renderContentStreamByPathClientApiWithHttpInfo(repositoryId, objectPath, versionLabel, download)



Gets content stream of an object by path.

### Example

```java
// Import classes:
import com.example.content.services.invoker.ApiClient;
import com.example.content.services.invoker.ApiException;
import com.example.content.services.invoker.ApiResponse;
import com.example.content.services.invoker.Configuration;
import com.example.content.services.invoker.models.*;
import com.example.content.services.api.ContentStreamByPathApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://backbase.com/contentservices-public");

        ContentStreamByPathApi apiInstance = new ContentStreamByPathApi(defaultClient);
        String repositoryId = "repositoryId_example"; // String | Repository ID of the object to retrieve content stream of.
        String objectPath = "objectPath_example"; // String | Path to retrieve the content stream of.
        String versionLabel = "versionLabel_example"; // String | Optional version of the content to be retrieved. Returns latest version when is not set.
        Boolean download = true; // Boolean | Determines whether content should be downloaded (if true) or rendered (if false) in browser. Default value is false.
        try {
            ApiResponse<File> response = apiInstance.renderContentStreamByPathClientApiWithHttpInfo(repositoryId, objectPath, versionLabel, download);
            System.out.println("Status code: " + response.getStatusCode());
            System.out.println("Response headers: " + response.getHeaders());
            System.out.println("Response body: " + response.getData());
        } catch (ApiException e) {
            System.err.println("Exception when calling ContentStreamByPathApi#renderContentStreamByPathClientApi");
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
| **objectPath** | **String**| Path to retrieve the content stream of. | |
| **versionLabel** | **String**| Optional version of the content to be retrieved. Returns latest version when is not set. | [optional] |
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

