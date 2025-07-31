# ContentUploadApi

All URIs are relative to *http://backbase.com/contentservices-public*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**handleContentUpload**](ContentUploadApi.md#handleContentUpload) | **POST** /client-api/repositories/{repositoryId}/upload |  |
| [**handleContentUploadWithHttpInfo**](ContentUploadApi.md#handleContentUploadWithHttpInfo) | **POST** /client-api/repositories/{repositoryId}/upload |  |



## handleContentUpload

> Document handleContentUpload(repositoryId, targetPath, _file, name, cmisColonObjectTypeId, cmisColonCreatedBy, cmisColonLastModifiedBy, bbColonTitle, bbColonLocale, changeToken, createSignedUrl)



Performs uploading of content

### Example

```java
// Import classes:
import com.example.content.services.invoker.ApiClient;
import com.example.content.services.invoker.ApiException;
import com.example.content.services.invoker.Configuration;
import com.example.content.services.invoker.models.*;
import com.example.content.services.api.ContentUploadApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://backbase.com/contentservices-public");

        ContentUploadApi apiInstance = new ContentUploadApi(defaultClient);
        String repositoryId = "repositoryId_example"; // String | ID of the repository to save and/or update uploaded content items.
        String targetPath = "targetPath_example"; // String | Path where the item should be added.
        File _file = new File("/path/to/file"); // File | File to upload.
        String name = "name_example"; // String | File name.
        String cmisColonObjectTypeId = "cmis:document"; // String | Document Object Type ID property.
        String cmisColonCreatedBy = "cmisColonCreatedBy_example"; // String | Document created by property.
        String cmisColonLastModifiedBy = "cmisColonLastModifiedBy_example"; // String | Document last modified by property.
        String bbColonTitle = "bbColonTitle_example"; // String | Document title property.
        String bbColonLocale = "bbColonLocale_example"; // String | Document locale property.
        String changeToken = "changeToken_example"; // String | Document change token property.
        Boolean createSignedUrl = false; // Boolean | If storage type supports generation of signed url for given content, setting this to true will generate a signed url for a limited time.
        try {
            Document result = apiInstance.handleContentUpload(repositoryId, targetPath, _file, name, cmisColonObjectTypeId, cmisColonCreatedBy, cmisColonLastModifiedBy, bbColonTitle, bbColonLocale, changeToken, createSignedUrl);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling ContentUploadApi#handleContentUpload");
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
| **repositoryId** | **String**| ID of the repository to save and/or update uploaded content items. | |
| **targetPath** | **String**| Path where the item should be added. | |
| **_file** | **File**| File to upload. | |
| **name** | **String**| File name. | |
| **cmisColonObjectTypeId** | **String**| Document Object Type ID property. | [optional] [enum: cmis:document] |
| **cmisColonCreatedBy** | **String**| Document created by property. | [optional] |
| **cmisColonLastModifiedBy** | **String**| Document last modified by property. | [optional] |
| **bbColonTitle** | **String**| Document title property. | [optional] |
| **bbColonLocale** | **String**| Document locale property. | [optional] |
| **changeToken** | **String**| Document change token property. | [optional] |
| **createSignedUrl** | **Boolean**| If storage type supports generation of signed url for given content, setting this to true will generate a signed url for a limited time. | [optional] [default to false] |

### Return type

[**Document**](Document.md)


### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: multipart/form-data
- **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Document successfully created and/or updated. |  -  |
| **400** | Invalid request |  -  |
| **403** | File threat detected |  -  |
| **404** | Object not found |  -  |

## handleContentUploadWithHttpInfo

> ApiResponse<Document> handleContentUpload handleContentUploadWithHttpInfo(repositoryId, targetPath, _file, name, cmisColonObjectTypeId, cmisColonCreatedBy, cmisColonLastModifiedBy, bbColonTitle, bbColonLocale, changeToken, createSignedUrl)



Performs uploading of content

### Example

```java
// Import classes:
import com.example.content.services.invoker.ApiClient;
import com.example.content.services.invoker.ApiException;
import com.example.content.services.invoker.ApiResponse;
import com.example.content.services.invoker.Configuration;
import com.example.content.services.invoker.models.*;
import com.example.content.services.api.ContentUploadApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://backbase.com/contentservices-public");

        ContentUploadApi apiInstance = new ContentUploadApi(defaultClient);
        String repositoryId = "repositoryId_example"; // String | ID of the repository to save and/or update uploaded content items.
        String targetPath = "targetPath_example"; // String | Path where the item should be added.
        File _file = new File("/path/to/file"); // File | File to upload.
        String name = "name_example"; // String | File name.
        String cmisColonObjectTypeId = "cmis:document"; // String | Document Object Type ID property.
        String cmisColonCreatedBy = "cmisColonCreatedBy_example"; // String | Document created by property.
        String cmisColonLastModifiedBy = "cmisColonLastModifiedBy_example"; // String | Document last modified by property.
        String bbColonTitle = "bbColonTitle_example"; // String | Document title property.
        String bbColonLocale = "bbColonLocale_example"; // String | Document locale property.
        String changeToken = "changeToken_example"; // String | Document change token property.
        Boolean createSignedUrl = false; // Boolean | If storage type supports generation of signed url for given content, setting this to true will generate a signed url for a limited time.
        try {
            ApiResponse<Document> response = apiInstance.handleContentUploadWithHttpInfo(repositoryId, targetPath, _file, name, cmisColonObjectTypeId, cmisColonCreatedBy, cmisColonLastModifiedBy, bbColonTitle, bbColonLocale, changeToken, createSignedUrl);
            System.out.println("Status code: " + response.getStatusCode());
            System.out.println("Response headers: " + response.getHeaders());
            System.out.println("Response body: " + response.getData());
        } catch (ApiException e) {
            System.err.println("Exception when calling ContentUploadApi#handleContentUpload");
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
| **repositoryId** | **String**| ID of the repository to save and/or update uploaded content items. | |
| **targetPath** | **String**| Path where the item should be added. | |
| **_file** | **File**| File to upload. | |
| **name** | **String**| File name. | |
| **cmisColonObjectTypeId** | **String**| Document Object Type ID property. | [optional] [enum: cmis:document] |
| **cmisColonCreatedBy** | **String**| Document created by property. | [optional] |
| **cmisColonLastModifiedBy** | **String**| Document last modified by property. | [optional] |
| **bbColonTitle** | **String**| Document title property. | [optional] |
| **bbColonLocale** | **String**| Document locale property. | [optional] |
| **changeToken** | **String**| Document change token property. | [optional] |
| **createSignedUrl** | **Boolean**| If storage type supports generation of signed url for given content, setting this to true will generate a signed url for a limited time. | [optional] [default to false] |

### Return type

ApiResponse<[**Document**](Document.md)>


### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: multipart/form-data
- **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Document successfully created and/or updated. |  -  |
| **400** | Invalid request |  -  |
| **403** | File threat detected |  -  |
| **404** | Object not found |  -  |

