# ContentImportApi

All URIs are relative to *http://backbase.com/contentservices-public*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**importContent**](ContentImportApi.md#importContent) | **POST** /client-api/repositories/{repositoryId}/import |  |
| [**importContentWithHttpInfo**](ContentImportApi.md#importContentWithHttpInfo) | **POST** /client-api/repositories/{repositoryId}/import |  |



## importContent

> List<ItemImportResult> importContent(repositoryId, _file, parentPath, createPath, overwrite, createRepository)



### Example

```java
// Import classes:
import com.example.content.services.invoker.ApiClient;
import com.example.content.services.invoker.ApiException;
import com.example.content.services.invoker.Configuration;
import com.example.content.services.invoker.models.*;
import com.example.content.services.api.ContentImportApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://backbase.com/contentservices-public");

        ContentImportApi apiInstance = new ContentImportApi(defaultClient);
        String repositoryId = "repositoryId_example"; // String | Repository to import to. The repository should already exist if cr parameter is false.
        File _file = new File("/path/to/file"); // File | File to upload.
        String parentPath = "/"; // String | The path of the parent folder where to import the bundle.
        Boolean createPath = false; // Boolean | Create Path. Only considered if path is provided, allows the full path to be created if not already there.
        Boolean overwrite = true; // Boolean | If any file is found at one or more locations specified in the ContentBundle, they will be overwritten.
        Boolean createRepository = false; // Boolean | Create repository. Indicates if repository should be created.
        try {
            List<ItemImportResult> result = apiInstance.importContent(repositoryId, _file, parentPath, createPath, overwrite, createRepository);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling ContentImportApi#importContent");
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
| **repositoryId** | **String**| Repository to import to. The repository should already exist if cr parameter is false. | |
| **_file** | **File**| File to upload. | |
| **parentPath** | **String**| The path of the parent folder where to import the bundle. | [optional] [default to /] |
| **createPath** | **Boolean**| Create Path. Only considered if path is provided, allows the full path to be created if not already there. | [optional] [default to false] |
| **overwrite** | **Boolean**| If any file is found at one or more locations specified in the ContentBundle, they will be overwritten. | [optional] [default to true] |
| **createRepository** | **Boolean**| Create repository. Indicates if repository should be created. | [optional] [default to false] |

### Return type

[**List&lt;ItemImportResult&gt;**](ItemImportResult.md)


### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: multipart/form-data
- **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Import has been done successfully. |  -  |
| **400** | Invalid request |  -  |
| **404** | Object not found |  -  |

## importContentWithHttpInfo

> ApiResponse<List<ItemImportResult>> importContent importContentWithHttpInfo(repositoryId, _file, parentPath, createPath, overwrite, createRepository)



### Example

```java
// Import classes:
import com.example.content.services.invoker.ApiClient;
import com.example.content.services.invoker.ApiException;
import com.example.content.services.invoker.ApiResponse;
import com.example.content.services.invoker.Configuration;
import com.example.content.services.invoker.models.*;
import com.example.content.services.api.ContentImportApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://backbase.com/contentservices-public");

        ContentImportApi apiInstance = new ContentImportApi(defaultClient);
        String repositoryId = "repositoryId_example"; // String | Repository to import to. The repository should already exist if cr parameter is false.
        File _file = new File("/path/to/file"); // File | File to upload.
        String parentPath = "/"; // String | The path of the parent folder where to import the bundle.
        Boolean createPath = false; // Boolean | Create Path. Only considered if path is provided, allows the full path to be created if not already there.
        Boolean overwrite = true; // Boolean | If any file is found at one or more locations specified in the ContentBundle, they will be overwritten.
        Boolean createRepository = false; // Boolean | Create repository. Indicates if repository should be created.
        try {
            ApiResponse<List<ItemImportResult>> response = apiInstance.importContentWithHttpInfo(repositoryId, _file, parentPath, createPath, overwrite, createRepository);
            System.out.println("Status code: " + response.getStatusCode());
            System.out.println("Response headers: " + response.getHeaders());
            System.out.println("Response body: " + response.getData());
        } catch (ApiException e) {
            System.err.println("Exception when calling ContentImportApi#importContent");
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
| **repositoryId** | **String**| Repository to import to. The repository should already exist if cr parameter is false. | |
| **_file** | **File**| File to upload. | |
| **parentPath** | **String**| The path of the parent folder where to import the bundle. | [optional] [default to /] |
| **createPath** | **Boolean**| Create Path. Only considered if path is provided, allows the full path to be created if not already there. | [optional] [default to false] |
| **overwrite** | **Boolean**| If any file is found at one or more locations specified in the ContentBundle, they will be overwritten. | [optional] [default to true] |
| **createRepository** | **Boolean**| Create repository. Indicates if repository should be created. | [optional] [default to false] |

### Return type

ApiResponse<[**List&lt;ItemImportResult&gt;**](ItemImportResult.md)>


### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: multipart/form-data
- **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Import has been done successfully. |  -  |
| **400** | Invalid request |  -  |
| **404** | Object not found |  -  |

