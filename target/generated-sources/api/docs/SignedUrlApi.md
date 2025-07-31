# SignedUrlApi

All URIs are relative to *http://backbase.com/contentservices-public*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createSignedUrl**](SignedUrlApi.md#createSignedUrl) | **POST** /client-api/content/signedUrl |  |
| [**createSignedUrlWithHttpInfo**](SignedUrlApi.md#createSignedUrlWithHttpInfo) | **POST** /client-api/content/signedUrl |  |



## createSignedUrl

> SignedUrlResponse createSignedUrl(signedUrlRequest)



Create signed url for document.

### Example

```java
// Import classes:
import com.example.content.services.invoker.ApiClient;
import com.example.content.services.invoker.ApiException;
import com.example.content.services.invoker.Configuration;
import com.example.content.services.invoker.models.*;
import com.example.content.services.api.SignedUrlApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://backbase.com/contentservices-public");

        SignedUrlApi apiInstance = new SignedUrlApi(defaultClient);
        SignedUrlRequest signedUrlRequest = new SignedUrlRequest(); // SignedUrlRequest | Create signed url request.
        try {
            SignedUrlResponse result = apiInstance.createSignedUrl(signedUrlRequest);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling SignedUrlApi#createSignedUrl");
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
| **signedUrlRequest** | [**SignedUrlRequest**](SignedUrlRequest.md)| Create signed url request. | [optional] |

### Return type

[**SignedUrlResponse**](SignedUrlResponse.md)


### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Signed URL generated successfully. |  -  |
| **400** | Invalid request |  -  |
| **404** | Object not found |  -  |

## createSignedUrlWithHttpInfo

> ApiResponse<SignedUrlResponse> createSignedUrl createSignedUrlWithHttpInfo(signedUrlRequest)



Create signed url for document.

### Example

```java
// Import classes:
import com.example.content.services.invoker.ApiClient;
import com.example.content.services.invoker.ApiException;
import com.example.content.services.invoker.ApiResponse;
import com.example.content.services.invoker.Configuration;
import com.example.content.services.invoker.models.*;
import com.example.content.services.api.SignedUrlApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://backbase.com/contentservices-public");

        SignedUrlApi apiInstance = new SignedUrlApi(defaultClient);
        SignedUrlRequest signedUrlRequest = new SignedUrlRequest(); // SignedUrlRequest | Create signed url request.
        try {
            ApiResponse<SignedUrlResponse> response = apiInstance.createSignedUrlWithHttpInfo(signedUrlRequest);
            System.out.println("Status code: " + response.getStatusCode());
            System.out.println("Response headers: " + response.getHeaders());
            System.out.println("Response body: " + response.getData());
        } catch (ApiException e) {
            System.err.println("Exception when calling SignedUrlApi#createSignedUrl");
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
| **signedUrlRequest** | [**SignedUrlRequest**](SignedUrlRequest.md)| Create signed url request. | [optional] |

### Return type

ApiResponse<[**SignedUrlResponse**](SignedUrlResponse.md)>


### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Signed URL generated successfully. |  -  |
| **400** | Invalid request |  -  |
| **404** | Object not found |  -  |

