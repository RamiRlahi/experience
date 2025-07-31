# ContentExportApi

All URIs are relative to *http://backbase.com/contentservices-public*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**writeExportContentBundleOnClientCall**](ContentExportApi.md#writeExportContentBundleOnClientCall) | **POST** /client-api/repositories/{repositoryId}/export |  |
| [**writeExportContentBundleOnClientCallWithHttpInfo**](ContentExportApi.md#writeExportContentBundleOnClientCallWithHttpInfo) | **POST** /client-api/repositories/{repositoryId}/export |  |



## writeExportContentBundleOnClientCall

> File writeExportContentBundleOnClientCall(repositoryId, optionalMeta, requestBody)



Returns a zip containing a full repository export or export of individual content items by specified ids.

### Example

```java
// Import classes:
import com.example.content.services.invoker.ApiClient;
import com.example.content.services.invoker.ApiException;
import com.example.content.services.invoker.Configuration;
import com.example.content.services.invoker.models.*;
import com.example.content.services.api.ContentExportApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://backbase.com/contentservices-public");

        ContentExportApi apiInstance = new ContentExportApi(defaultClient);
        String repositoryId = "repositoryId_example"; // String | Repository ID from which to take export from
        List<String> optionalMeta = Arrays.asList(); // List<String> | optional metadata to include in the export of individual items. If empty, export no metadata; if null, export all.
        List<String> requestBody = Arrays.asList(); // List<String> | List of content ids to export. If empty list is provided, only bare repository.xml is exported with no content. If body is null, full repository export is performed.
        try {
            File result = apiInstance.writeExportContentBundleOnClientCall(repositoryId, optionalMeta, requestBody);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling ContentExportApi#writeExportContentBundleOnClientCall");
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
| **repositoryId** | **String**| Repository ID from which to take export from | |
| **optionalMeta** | [**List&lt;String&gt;**](String.md)| optional metadata to include in the export of individual items. If empty, export no metadata; if null, export all. | [optional] |
| **requestBody** | [**List&lt;String&gt;**](String.md)| List of content ids to export. If empty list is provided, only bare repository.xml is exported with no content. If body is null, full repository export is performed. | [optional] |

### Return type

[**File**](File.md)


### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/zip, application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Export has been done successfully. |  -  |
| **404** | Object not found |  -  |
| **500** | Internal server error |  -  |

## writeExportContentBundleOnClientCallWithHttpInfo

> ApiResponse<File> writeExportContentBundleOnClientCall writeExportContentBundleOnClientCallWithHttpInfo(repositoryId, optionalMeta, requestBody)



Returns a zip containing a full repository export or export of individual content items by specified ids.

### Example

```java
// Import classes:
import com.example.content.services.invoker.ApiClient;
import com.example.content.services.invoker.ApiException;
import com.example.content.services.invoker.ApiResponse;
import com.example.content.services.invoker.Configuration;
import com.example.content.services.invoker.models.*;
import com.example.content.services.api.ContentExportApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://backbase.com/contentservices-public");

        ContentExportApi apiInstance = new ContentExportApi(defaultClient);
        String repositoryId = "repositoryId_example"; // String | Repository ID from which to take export from
        List<String> optionalMeta = Arrays.asList(); // List<String> | optional metadata to include in the export of individual items. If empty, export no metadata; if null, export all.
        List<String> requestBody = Arrays.asList(); // List<String> | List of content ids to export. If empty list is provided, only bare repository.xml is exported with no content. If body is null, full repository export is performed.
        try {
            ApiResponse<File> response = apiInstance.writeExportContentBundleOnClientCallWithHttpInfo(repositoryId, optionalMeta, requestBody);
            System.out.println("Status code: " + response.getStatusCode());
            System.out.println("Response headers: " + response.getHeaders());
            System.out.println("Response body: " + response.getData());
        } catch (ApiException e) {
            System.err.println("Exception when calling ContentExportApi#writeExportContentBundleOnClientCall");
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
| **repositoryId** | **String**| Repository ID from which to take export from | |
| **optionalMeta** | [**List&lt;String&gt;**](String.md)| optional metadata to include in the export of individual items. If empty, export no metadata; if null, export all. | [optional] |
| **requestBody** | [**List&lt;String&gt;**](String.md)| List of content ids to export. If empty list is provided, only bare repository.xml is exported with no content. If body is null, full repository export is performed. | [optional] |

### Return type

ApiResponse<[**File**](File.md)>


### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/zip, application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Export has been done successfully. |  -  |
| **404** | Object not found |  -  |
| **500** | Internal server error |  -  |

