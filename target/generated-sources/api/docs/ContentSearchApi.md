# ContentSearchApi

All URIs are relative to *http://backbase.com/contentservices-public*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**searchContent**](ContentSearchApi.md#searchContent) | **POST** /client-api/content/search |  |
| [**searchContentWithHttpInfo**](ContentSearchApi.md#searchContentWithHttpInfo) | **POST** /client-api/content/search |  |



## searchContent

> Set<Document> searchContent(searchRequest)



Performs search in content metadata.

### Example

```java
// Import classes:
import com.example.content.services.invoker.ApiClient;
import com.example.content.services.invoker.ApiException;
import com.example.content.services.invoker.Configuration;
import com.example.content.services.invoker.models.*;
import com.example.content.services.api.ContentSearchApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://backbase.com/contentservices-public");

        ContentSearchApi apiInstance = new ContentSearchApi(defaultClient);
        SearchRequest searchRequest = new SearchRequest(); // SearchRequest | 
        try {
            Set<Document> result = apiInstance.searchContent(searchRequest);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling ContentSearchApi#searchContent");
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
| **searchRequest** | [**SearchRequest**](SearchRequest.md)|  | [optional] |

### Return type

[**Set&lt;Document&gt;**](Document.md)


### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Search result. |  -  |
| **400** | Invalid request |  -  |

## searchContentWithHttpInfo

> ApiResponse<Set<Document>> searchContent searchContentWithHttpInfo(searchRequest)



Performs search in content metadata.

### Example

```java
// Import classes:
import com.example.content.services.invoker.ApiClient;
import com.example.content.services.invoker.ApiException;
import com.example.content.services.invoker.ApiResponse;
import com.example.content.services.invoker.Configuration;
import com.example.content.services.invoker.models.*;
import com.example.content.services.api.ContentSearchApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://backbase.com/contentservices-public");

        ContentSearchApi apiInstance = new ContentSearchApi(defaultClient);
        SearchRequest searchRequest = new SearchRequest(); // SearchRequest | 
        try {
            ApiResponse<Set<Document>> response = apiInstance.searchContentWithHttpInfo(searchRequest);
            System.out.println("Status code: " + response.getStatusCode());
            System.out.println("Response headers: " + response.getHeaders());
            System.out.println("Response body: " + response.getData());
        } catch (ApiException e) {
            System.err.println("Exception when calling ContentSearchApi#searchContent");
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
| **searchRequest** | [**SearchRequest**](SearchRequest.md)|  | [optional] |

### Return type

ApiResponse<[**Set&lt;Document&gt;**](Document.md)>


### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Search result. |  -  |
| **400** | Invalid request |  -  |

