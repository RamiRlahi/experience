# ContentManagementApi

All URIs are relative to *http://backbase.com/contentservices-public*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**moveContent**](ContentManagementApi.md#moveContent) | **POST** /client-api/content/move |  |
| [**moveContentWithHttpInfo**](ContentManagementApi.md#moveContentWithHttpInfo) | **POST** /client-api/content/move |  |
| [**queryContent**](ContentManagementApi.md#queryContent) | **POST** /client-api/content/query |  |
| [**queryContentWithHttpInfo**](ContentManagementApi.md#queryContentWithHttpInfo) | **POST** /client-api/content/query |  |
| [**removeContent**](ContentManagementApi.md#removeContent) | **POST** /client-api/content/remove |  |
| [**removeContentWithHttpInfo**](ContentManagementApi.md#removeContentWithHttpInfo) | **POST** /client-api/content/remove |  |
| [**revertContent**](ContentManagementApi.md#revertContent) | **POST** /client-api/content/revert |  |
| [**revertContentWithHttpInfo**](ContentManagementApi.md#revertContentWithHttpInfo) | **POST** /client-api/content/revert |  |
| [**saveContent**](ContentManagementApi.md#saveContent) | **POST** /client-api/content/save |  |
| [**saveContentWithHttpInfo**](ContentManagementApi.md#saveContentWithHttpInfo) | **POST** /client-api/content/save |  |



## moveContent

> Set<Document> moveContent(documentToMove)



Performs moving of documents.

### Example

```java
// Import classes:
import com.example.content.services.invoker.ApiClient;
import com.example.content.services.invoker.ApiException;
import com.example.content.services.invoker.Configuration;
import com.example.content.services.invoker.models.*;
import com.example.content.services.api.ContentManagementApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://backbase.com/contentservices-public");

        ContentManagementApi apiInstance = new ContentManagementApi(defaultClient);
        List<DocumentToMove> documentToMove = Arrays.asList(); // List<DocumentToMove> | 
        try {
            Set<Document> result = apiInstance.moveContent(documentToMove);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling ContentManagementApi#moveContent");
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
| **documentToMove** | [**List&lt;DocumentToMove&gt;**](DocumentToMove.md)|  | [optional] |

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
| **200** | Documents successfully moved. |  -  |
| **400** | Invalid request |  -  |
| **404** | Object not found |  -  |

## moveContentWithHttpInfo

> ApiResponse<Set<Document>> moveContent moveContentWithHttpInfo(documentToMove)



Performs moving of documents.

### Example

```java
// Import classes:
import com.example.content.services.invoker.ApiClient;
import com.example.content.services.invoker.ApiException;
import com.example.content.services.invoker.ApiResponse;
import com.example.content.services.invoker.Configuration;
import com.example.content.services.invoker.models.*;
import com.example.content.services.api.ContentManagementApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://backbase.com/contentservices-public");

        ContentManagementApi apiInstance = new ContentManagementApi(defaultClient);
        List<DocumentToMove> documentToMove = Arrays.asList(); // List<DocumentToMove> | 
        try {
            ApiResponse<Set<Document>> response = apiInstance.moveContentWithHttpInfo(documentToMove);
            System.out.println("Status code: " + response.getStatusCode());
            System.out.println("Response headers: " + response.getHeaders());
            System.out.println("Response body: " + response.getData());
        } catch (ApiException e) {
            System.err.println("Exception when calling ContentManagementApi#moveContent");
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
| **documentToMove** | [**List&lt;DocumentToMove&gt;**](DocumentToMove.md)|  | [optional] |

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
| **200** | Documents successfully moved. |  -  |
| **400** | Invalid request |  -  |
| **404** | Object not found |  -  |


## queryContent

> Set<Document> queryContent(queryRequest)



Performs a content query.

### Example

```java
// Import classes:
import com.example.content.services.invoker.ApiClient;
import com.example.content.services.invoker.ApiException;
import com.example.content.services.invoker.Configuration;
import com.example.content.services.invoker.models.*;
import com.example.content.services.api.ContentManagementApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://backbase.com/contentservices-public");

        ContentManagementApi apiInstance = new ContentManagementApi(defaultClient);
        QueryRequest queryRequest = new QueryRequest(); // QueryRequest | Performs a content query.
        try {
            Set<Document> result = apiInstance.queryContent(queryRequest);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling ContentManagementApi#queryContent");
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
| **queryRequest** | [**QueryRequest**](QueryRequest.md)| Performs a content query. | [optional] |

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
| **200** | Query result. |  -  |
| **400** | Invalid request |  -  |
| **404** | Object not found |  -  |

## queryContentWithHttpInfo

> ApiResponse<Set<Document>> queryContent queryContentWithHttpInfo(queryRequest)



Performs a content query.

### Example

```java
// Import classes:
import com.example.content.services.invoker.ApiClient;
import com.example.content.services.invoker.ApiException;
import com.example.content.services.invoker.ApiResponse;
import com.example.content.services.invoker.Configuration;
import com.example.content.services.invoker.models.*;
import com.example.content.services.api.ContentManagementApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://backbase.com/contentservices-public");

        ContentManagementApi apiInstance = new ContentManagementApi(defaultClient);
        QueryRequest queryRequest = new QueryRequest(); // QueryRequest | Performs a content query.
        try {
            ApiResponse<Set<Document>> response = apiInstance.queryContentWithHttpInfo(queryRequest);
            System.out.println("Status code: " + response.getStatusCode());
            System.out.println("Response headers: " + response.getHeaders());
            System.out.println("Response body: " + response.getData());
        } catch (ApiException e) {
            System.err.println("Exception when calling ContentManagementApi#queryContent");
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
| **queryRequest** | [**QueryRequest**](QueryRequest.md)| Performs a content query. | [optional] |

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
| **200** | Query result. |  -  |
| **400** | Invalid request |  -  |
| **404** | Object not found |  -  |


## removeContent

> void removeContent(removeRequest)



Performs deletion of documents by their ids.

### Example

```java
// Import classes:
import com.example.content.services.invoker.ApiClient;
import com.example.content.services.invoker.ApiException;
import com.example.content.services.invoker.Configuration;
import com.example.content.services.invoker.models.*;
import com.example.content.services.api.ContentManagementApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://backbase.com/contentservices-public");

        ContentManagementApi apiInstance = new ContentManagementApi(defaultClient);
        RemoveRequest removeRequest = new RemoveRequest(); // RemoveRequest | Performs deletion of documents by their ids.
        try {
            apiInstance.removeContent(removeRequest);
        } catch (ApiException e) {
            System.err.println("Exception when calling ContentManagementApi#removeContent");
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
| **removeRequest** | [**RemoveRequest**](RemoveRequest.md)| Performs deletion of documents by their ids. | [optional] |

### Return type


null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | Documents successfully deleted. |  -  |
| **400** | Invalid request |  -  |
| **404** | Object not found |  -  |
| **409** | Conflict |  -  |

## removeContentWithHttpInfo

> ApiResponse<Void> removeContent removeContentWithHttpInfo(removeRequest)



Performs deletion of documents by their ids.

### Example

```java
// Import classes:
import com.example.content.services.invoker.ApiClient;
import com.example.content.services.invoker.ApiException;
import com.example.content.services.invoker.ApiResponse;
import com.example.content.services.invoker.Configuration;
import com.example.content.services.invoker.models.*;
import com.example.content.services.api.ContentManagementApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://backbase.com/contentservices-public");

        ContentManagementApi apiInstance = new ContentManagementApi(defaultClient);
        RemoveRequest removeRequest = new RemoveRequest(); // RemoveRequest | Performs deletion of documents by their ids.
        try {
            ApiResponse<Void> response = apiInstance.removeContentWithHttpInfo(removeRequest);
            System.out.println("Status code: " + response.getStatusCode());
            System.out.println("Response headers: " + response.getHeaders());
        } catch (ApiException e) {
            System.err.println("Exception when calling ContentManagementApi#removeContent");
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
| **removeRequest** | [**RemoveRequest**](RemoveRequest.md)| Performs deletion of documents by their ids. | [optional] |

### Return type


ApiResponse<Void>

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | Documents successfully deleted. |  -  |
| **400** | Invalid request |  -  |
| **404** | Object not found |  -  |
| **409** | Conflict |  -  |


## revertContent

> Set<Document> revertContent(itemToRevert)



Performs documents reverting to specific versions.

### Example

```java
// Import classes:
import com.example.content.services.invoker.ApiClient;
import com.example.content.services.invoker.ApiException;
import com.example.content.services.invoker.Configuration;
import com.example.content.services.invoker.models.*;
import com.example.content.services.api.ContentManagementApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://backbase.com/contentservices-public");

        ContentManagementApi apiInstance = new ContentManagementApi(defaultClient);
        List<ItemToRevert> itemToRevert = Arrays.asList(); // List<ItemToRevert> | Performs documents reverting to specific versions.
        try {
            Set<Document> result = apiInstance.revertContent(itemToRevert);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling ContentManagementApi#revertContent");
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
| **itemToRevert** | [**List&lt;ItemToRevert&gt;**](ItemToRevert.md)| Performs documents reverting to specific versions. | [optional] |

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
| **200** | Documents successfully reverted to the specified versions. |  -  |
| **400** | Invalid request |  -  |
| **404** | Object not found |  -  |

## revertContentWithHttpInfo

> ApiResponse<Set<Document>> revertContent revertContentWithHttpInfo(itemToRevert)



Performs documents reverting to specific versions.

### Example

```java
// Import classes:
import com.example.content.services.invoker.ApiClient;
import com.example.content.services.invoker.ApiException;
import com.example.content.services.invoker.ApiResponse;
import com.example.content.services.invoker.Configuration;
import com.example.content.services.invoker.models.*;
import com.example.content.services.api.ContentManagementApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://backbase.com/contentservices-public");

        ContentManagementApi apiInstance = new ContentManagementApi(defaultClient);
        List<ItemToRevert> itemToRevert = Arrays.asList(); // List<ItemToRevert> | Performs documents reverting to specific versions.
        try {
            ApiResponse<Set<Document>> response = apiInstance.revertContentWithHttpInfo(itemToRevert);
            System.out.println("Status code: " + response.getStatusCode());
            System.out.println("Response headers: " + response.getHeaders());
            System.out.println("Response body: " + response.getData());
        } catch (ApiException e) {
            System.err.println("Exception when calling ContentManagementApi#revertContent");
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
| **itemToRevert** | [**List&lt;ItemToRevert&gt;**](ItemToRevert.md)| Performs documents reverting to specific versions. | [optional] |

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
| **200** | Documents successfully reverted to the specified versions. |  -  |
| **400** | Invalid request |  -  |
| **404** | Object not found |  -  |


## saveContent

> Set<Document> saveContent(updateProperties, documentToSave)



Performs creation or update of documents.

### Example

```java
// Import classes:
import com.example.content.services.invoker.ApiClient;
import com.example.content.services.invoker.ApiException;
import com.example.content.services.invoker.Configuration;
import com.example.content.services.invoker.models.*;
import com.example.content.services.api.ContentManagementApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://backbase.com/contentservices-public");

        ContentManagementApi apiInstance = new ContentManagementApi(defaultClient);
        Boolean updateProperties = false; // Boolean | Determines whether during content update properties from save request should be also updated (if true). Default value is false.
        List<DocumentToSave> documentToSave = Arrays.asList(); // List<DocumentToSave> | Performs creation or update of documents.
        try {
            Set<Document> result = apiInstance.saveContent(updateProperties, documentToSave);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling ContentManagementApi#saveContent");
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
| **updateProperties** | **Boolean**| Determines whether during content update properties from save request should be also updated (if true). Default value is false. | [optional] [default to false] |
| **documentToSave** | [**List&lt;DocumentToSave&gt;**](DocumentToSave.md)| Performs creation or update of documents. | [optional] |

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
| **200** | Documents successfully created and/or updated. |  -  |
| **400** | Invalid request |  -  |
| **403** | File threat detected |  -  |
| **404** | Object not found |  -  |

## saveContentWithHttpInfo

> ApiResponse<Set<Document>> saveContent saveContentWithHttpInfo(updateProperties, documentToSave)



Performs creation or update of documents.

### Example

```java
// Import classes:
import com.example.content.services.invoker.ApiClient;
import com.example.content.services.invoker.ApiException;
import com.example.content.services.invoker.ApiResponse;
import com.example.content.services.invoker.Configuration;
import com.example.content.services.invoker.models.*;
import com.example.content.services.api.ContentManagementApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://backbase.com/contentservices-public");

        ContentManagementApi apiInstance = new ContentManagementApi(defaultClient);
        Boolean updateProperties = false; // Boolean | Determines whether during content update properties from save request should be also updated (if true). Default value is false.
        List<DocumentToSave> documentToSave = Arrays.asList(); // List<DocumentToSave> | Performs creation or update of documents.
        try {
            ApiResponse<Set<Document>> response = apiInstance.saveContentWithHttpInfo(updateProperties, documentToSave);
            System.out.println("Status code: " + response.getStatusCode());
            System.out.println("Response headers: " + response.getHeaders());
            System.out.println("Response body: " + response.getData());
        } catch (ApiException e) {
            System.err.println("Exception when calling ContentManagementApi#saveContent");
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
| **updateProperties** | **Boolean**| Determines whether during content update properties from save request should be also updated (if true). Default value is false. | [optional] [default to false] |
| **documentToSave** | [**List&lt;DocumentToSave&gt;**](DocumentToSave.md)| Performs creation or update of documents. | [optional] |

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
| **200** | Documents successfully created and/or updated. |  -  |
| **400** | Invalid request |  -  |
| **403** | File threat detected |  -  |
| **404** | Object not found |  -  |

