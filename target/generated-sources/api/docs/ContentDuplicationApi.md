# ContentDuplicationApi

All URIs are relative to *http://backbase.com/contentservices-public*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**duplicateContent**](ContentDuplicationApi.md#duplicateContent) | **POST** /client-api/content/duplicate |  |
| [**duplicateContentWithHttpInfo**](ContentDuplicationApi.md#duplicateContentWithHttpInfo) | **POST** /client-api/content/duplicate |  |



## duplicateContent

> DuplicateResponse duplicateContent(duplicateRequest)



Performs duplication of documents.

### Example

```java
// Import classes:
import com.example.content.services.invoker.ApiClient;
import com.example.content.services.invoker.ApiException;
import com.example.content.services.invoker.Configuration;
import com.example.content.services.invoker.models.*;
import com.example.content.services.api.ContentDuplicationApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://backbase.com/contentservices-public");

        ContentDuplicationApi apiInstance = new ContentDuplicationApi(defaultClient);
        DuplicateRequest duplicateRequest = new DuplicateRequest(); // DuplicateRequest | Duplicate content request.
        try {
            DuplicateResponse result = apiInstance.duplicateContent(duplicateRequest);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling ContentDuplicationApi#duplicateContent");
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
| **duplicateRequest** | [**DuplicateRequest**](DuplicateRequest.md)| Duplicate content request. | [optional] |

### Return type

[**DuplicateResponse**](DuplicateResponse.md)


### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Documents successfully duplicated. |  -  |
| **400** | Invalid request |  -  |
| **404** | Object not found |  -  |
| **409** | Conflict |  -  |

## duplicateContentWithHttpInfo

> ApiResponse<DuplicateResponse> duplicateContent duplicateContentWithHttpInfo(duplicateRequest)



Performs duplication of documents.

### Example

```java
// Import classes:
import com.example.content.services.invoker.ApiClient;
import com.example.content.services.invoker.ApiException;
import com.example.content.services.invoker.ApiResponse;
import com.example.content.services.invoker.Configuration;
import com.example.content.services.invoker.models.*;
import com.example.content.services.api.ContentDuplicationApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://backbase.com/contentservices-public");

        ContentDuplicationApi apiInstance = new ContentDuplicationApi(defaultClient);
        DuplicateRequest duplicateRequest = new DuplicateRequest(); // DuplicateRequest | Duplicate content request.
        try {
            ApiResponse<DuplicateResponse> response = apiInstance.duplicateContentWithHttpInfo(duplicateRequest);
            System.out.println("Status code: " + response.getStatusCode());
            System.out.println("Response headers: " + response.getHeaders());
            System.out.println("Response body: " + response.getData());
        } catch (ApiException e) {
            System.err.println("Exception when calling ContentDuplicationApi#duplicateContent");
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
| **duplicateRequest** | [**DuplicateRequest**](DuplicateRequest.md)| Duplicate content request. | [optional] |

### Return type

ApiResponse<[**DuplicateResponse**](DuplicateResponse.md)>


### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Documents successfully duplicated. |  -  |
| **400** | Invalid request |  -  |
| **404** | Object not found |  -  |
| **409** | Conflict |  -  |

