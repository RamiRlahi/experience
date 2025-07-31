# ResourceImportApi

All URIs are relative to *http://backbase.com/contentservices-public*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**importResourceBundle**](ResourceImportApi.md#importResourceBundle) | **POST** /client-api/resources/import |  |
| [**importResourceBundleWithHttpInfo**](ResourceImportApi.md#importResourceBundleWithHttpInfo) | **POST** /client-api/resources/import |  |



## importResourceBundle

> Set<String> importResourceBundle(_file, rootPath)



Import resource provided as a zipped bundle to resourceRepository.

### Example

```java
// Import classes:
import com.example.content.services.invoker.ApiClient;
import com.example.content.services.invoker.ApiException;
import com.example.content.services.invoker.Configuration;
import com.example.content.services.invoker.models.*;
import com.example.content.services.api.ResourceImportApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://backbase.com/contentservices-public");

        ResourceImportApi apiInstance = new ResourceImportApi(defaultClient);
        File _file = new File("/path/to/file"); // File | File to upload.
        String rootPath = "contextRoot"; // String | Set the rootPath to import the bundle. Allowed regex is [a-zA-Z0-9-_]+. Bundle will be imported to contextRoot if rootPath is not specified.
        try {
            Set<String> result = apiInstance.importResourceBundle(_file, rootPath);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling ResourceImportApi#importResourceBundle");
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
| **_file** | **File**| File to upload. | |
| **rootPath** | **String**| Set the rootPath to import the bundle. Allowed regex is [a-zA-Z0-9-_]+. Bundle will be imported to contextRoot if rootPath is not specified. | [optional] [default to contextRoot] |

### Return type

**Set&lt;String&gt;**


### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: multipart/form-data
- **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Import has been done successfully. Return array of imported items ids. |  -  |
| **400** | Invalid request |  -  |

## importResourceBundleWithHttpInfo

> ApiResponse<Set<String>> importResourceBundle importResourceBundleWithHttpInfo(_file, rootPath)



Import resource provided as a zipped bundle to resourceRepository.

### Example

```java
// Import classes:
import com.example.content.services.invoker.ApiClient;
import com.example.content.services.invoker.ApiException;
import com.example.content.services.invoker.ApiResponse;
import com.example.content.services.invoker.Configuration;
import com.example.content.services.invoker.models.*;
import com.example.content.services.api.ResourceImportApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://backbase.com/contentservices-public");

        ResourceImportApi apiInstance = new ResourceImportApi(defaultClient);
        File _file = new File("/path/to/file"); // File | File to upload.
        String rootPath = "contextRoot"; // String | Set the rootPath to import the bundle. Allowed regex is [a-zA-Z0-9-_]+. Bundle will be imported to contextRoot if rootPath is not specified.
        try {
            ApiResponse<Set<String>> response = apiInstance.importResourceBundleWithHttpInfo(_file, rootPath);
            System.out.println("Status code: " + response.getStatusCode());
            System.out.println("Response headers: " + response.getHeaders());
            System.out.println("Response body: " + response.getData());
        } catch (ApiException e) {
            System.err.println("Exception when calling ResourceImportApi#importResourceBundle");
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
| **_file** | **File**| File to upload. | |
| **rootPath** | **String**| Set the rootPath to import the bundle. Allowed regex is [a-zA-Z0-9-_]+. Bundle will be imported to contextRoot if rootPath is not specified. | [optional] [default to contextRoot] |

### Return type

ApiResponse<**Set&lt;String&gt;**>


### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: multipart/form-data
- **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Import has been done successfully. Return array of imported items ids. |  -  |
| **400** | Invalid request |  -  |

