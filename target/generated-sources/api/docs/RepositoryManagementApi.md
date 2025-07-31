# RepositoryManagementApi

All URIs are relative to *http://backbase.com/contentservices-public*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**copyRepository**](RepositoryManagementApi.md#copyRepository) | **POST** /client-api/repositories/{srcRepositoryId}/copy/{dstRepositoryId} |  |
| [**copyRepositoryWithHttpInfo**](RepositoryManagementApi.md#copyRepositoryWithHttpInfo) | **POST** /client-api/repositories/{srcRepositoryId}/copy/{dstRepositoryId} |  |
| [**createRepositories**](RepositoryManagementApi.md#createRepositories) | **POST** /client-api/repositories |  |
| [**createRepositoriesWithHttpInfo**](RepositoryManagementApi.md#createRepositoriesWithHttpInfo) | **POST** /client-api/repositories |  |
| [**deleteRepository**](RepositoryManagementApi.md#deleteRepository) | **DELETE** /client-api/repositories/{repositoryId} |  |
| [**deleteRepositoryWithHttpInfo**](RepositoryManagementApi.md#deleteRepositoryWithHttpInfo) | **DELETE** /client-api/repositories/{repositoryId} |  |
| [**getRepository**](RepositoryManagementApi.md#getRepository) | **GET** /client-api/repositories/{repositoryId} |  |
| [**getRepositoryWithHttpInfo**](RepositoryManagementApi.md#getRepositoryWithHttpInfo) | **GET** /client-api/repositories/{repositoryId} |  |



## copyRepository

> void copyRepository(srcRepositoryId, dstRepositoryId)



Copies the content of the source repository to the destination repository.

### Example

```java
// Import classes:
import com.example.content.services.invoker.ApiClient;
import com.example.content.services.invoker.ApiException;
import com.example.content.services.invoker.Configuration;
import com.example.content.services.invoker.models.*;
import com.example.content.services.api.RepositoryManagementApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://backbase.com/contentservices-public");

        RepositoryManagementApi apiInstance = new RepositoryManagementApi(defaultClient);
        String srcRepositoryId = "srcRepositoryId_example"; // String | Repository Id to copy from
        String dstRepositoryId = "dstRepositoryId_example"; // String | Repository Id to copy to
        try {
            apiInstance.copyRepository(srcRepositoryId, dstRepositoryId);
        } catch (ApiException e) {
            System.err.println("Exception when calling RepositoryManagementApi#copyRepository");
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
| **srcRepositoryId** | **String**| Repository Id to copy from | |
| **dstRepositoryId** | **String**| Repository Id to copy to | |

### Return type


null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Content successfully copied. |  -  |
| **404** | Object not found |  -  |

## copyRepositoryWithHttpInfo

> ApiResponse<Void> copyRepository copyRepositoryWithHttpInfo(srcRepositoryId, dstRepositoryId)



Copies the content of the source repository to the destination repository.

### Example

```java
// Import classes:
import com.example.content.services.invoker.ApiClient;
import com.example.content.services.invoker.ApiException;
import com.example.content.services.invoker.ApiResponse;
import com.example.content.services.invoker.Configuration;
import com.example.content.services.invoker.models.*;
import com.example.content.services.api.RepositoryManagementApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://backbase.com/contentservices-public");

        RepositoryManagementApi apiInstance = new RepositoryManagementApi(defaultClient);
        String srcRepositoryId = "srcRepositoryId_example"; // String | Repository Id to copy from
        String dstRepositoryId = "dstRepositoryId_example"; // String | Repository Id to copy to
        try {
            ApiResponse<Void> response = apiInstance.copyRepositoryWithHttpInfo(srcRepositoryId, dstRepositoryId);
            System.out.println("Status code: " + response.getStatusCode());
            System.out.println("Response headers: " + response.getHeaders());
        } catch (ApiException e) {
            System.err.println("Exception when calling RepositoryManagementApi#copyRepository");
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
| **srcRepositoryId** | **String**| Repository Id to copy from | |
| **dstRepositoryId** | **String**| Repository Id to copy to | |

### Return type


ApiResponse<Void>

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Content successfully copied. |  -  |
| **404** | Object not found |  -  |


## createRepositories

> void createRepositories(repository)



Creates repositories.

### Example

```java
// Import classes:
import com.example.content.services.invoker.ApiClient;
import com.example.content.services.invoker.ApiException;
import com.example.content.services.invoker.Configuration;
import com.example.content.services.invoker.models.*;
import com.example.content.services.api.RepositoryManagementApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://backbase.com/contentservices-public");

        RepositoryManagementApi apiInstance = new RepositoryManagementApi(defaultClient);
        List<Repository> repository = Arrays.asList(); // List<Repository> | A list of repositories to be created.
        try {
            apiInstance.createRepositories(repository);
        } catch (ApiException e) {
            System.err.println("Exception when calling RepositoryManagementApi#createRepositories");
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
| **repository** | [**List&lt;Repository&gt;**](Repository.md)| A list of repositories to be created. | [optional] |

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
| **201** | Repository are successfully created. |  -  |
| **400** | Invalid request |  -  |
| **409** | Conflict |  -  |

## createRepositoriesWithHttpInfo

> ApiResponse<Void> createRepositories createRepositoriesWithHttpInfo(repository)



Creates repositories.

### Example

```java
// Import classes:
import com.example.content.services.invoker.ApiClient;
import com.example.content.services.invoker.ApiException;
import com.example.content.services.invoker.ApiResponse;
import com.example.content.services.invoker.Configuration;
import com.example.content.services.invoker.models.*;
import com.example.content.services.api.RepositoryManagementApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://backbase.com/contentservices-public");

        RepositoryManagementApi apiInstance = new RepositoryManagementApi(defaultClient);
        List<Repository> repository = Arrays.asList(); // List<Repository> | A list of repositories to be created.
        try {
            ApiResponse<Void> response = apiInstance.createRepositoriesWithHttpInfo(repository);
            System.out.println("Status code: " + response.getStatusCode());
            System.out.println("Response headers: " + response.getHeaders());
        } catch (ApiException e) {
            System.err.println("Exception when calling RepositoryManagementApi#createRepositories");
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
| **repository** | [**List&lt;Repository&gt;**](Repository.md)| A list of repositories to be created. | [optional] |

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
| **201** | Repository are successfully created. |  -  |
| **400** | Invalid request |  -  |
| **409** | Conflict |  -  |


## deleteRepository

> void deleteRepository(repositoryId)



Deletes a repository. If an external storage is configured for the repository, then behavior differs based on exact implementation of external storage connector. By default (in Backbase C3 implementations), contents remain in the external storage and just the database reference will be removed.

### Example

```java
// Import classes:
import com.example.content.services.invoker.ApiClient;
import com.example.content.services.invoker.ApiException;
import com.example.content.services.invoker.Configuration;
import com.example.content.services.invoker.models.*;
import com.example.content.services.api.RepositoryManagementApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://backbase.com/contentservices-public");

        RepositoryManagementApi apiInstance = new RepositoryManagementApi(defaultClient);
        String repositoryId = "repositoryId_example"; // String | The Identifier of the Repository to process.
        try {
            apiInstance.deleteRepository(repositoryId);
        } catch (ApiException e) {
            System.err.println("Exception when calling RepositoryManagementApi#deleteRepository");
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
| **repositoryId** | **String**| The Identifier of the Repository to process. | |

### Return type


null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | Repository was successfully deleted. |  -  |
| **404** | Object not found |  -  |

## deleteRepositoryWithHttpInfo

> ApiResponse<Void> deleteRepository deleteRepositoryWithHttpInfo(repositoryId)



Deletes a repository. If an external storage is configured for the repository, then behavior differs based on exact implementation of external storage connector. By default (in Backbase C3 implementations), contents remain in the external storage and just the database reference will be removed.

### Example

```java
// Import classes:
import com.example.content.services.invoker.ApiClient;
import com.example.content.services.invoker.ApiException;
import com.example.content.services.invoker.ApiResponse;
import com.example.content.services.invoker.Configuration;
import com.example.content.services.invoker.models.*;
import com.example.content.services.api.RepositoryManagementApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://backbase.com/contentservices-public");

        RepositoryManagementApi apiInstance = new RepositoryManagementApi(defaultClient);
        String repositoryId = "repositoryId_example"; // String | The Identifier of the Repository to process.
        try {
            ApiResponse<Void> response = apiInstance.deleteRepositoryWithHttpInfo(repositoryId);
            System.out.println("Status code: " + response.getStatusCode());
            System.out.println("Response headers: " + response.getHeaders());
        } catch (ApiException e) {
            System.err.println("Exception when calling RepositoryManagementApi#deleteRepository");
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
| **repositoryId** | **String**| The Identifier of the Repository to process. | |

### Return type


ApiResponse<Void>

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | Repository was successfully deleted. |  -  |
| **404** | Object not found |  -  |


## getRepository

> Repository getRepository(repositoryId)



Returns a repository definition.

### Example

```java
// Import classes:
import com.example.content.services.invoker.ApiClient;
import com.example.content.services.invoker.ApiException;
import com.example.content.services.invoker.Configuration;
import com.example.content.services.invoker.models.*;
import com.example.content.services.api.RepositoryManagementApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://backbase.com/contentservices-public");

        RepositoryManagementApi apiInstance = new RepositoryManagementApi(defaultClient);
        String repositoryId = "repositoryId_example"; // String | The Identifier of the Repository to process.
        try {
            Repository result = apiInstance.getRepository(repositoryId);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling RepositoryManagementApi#getRepository");
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
| **repositoryId** | **String**| The Identifier of the Repository to process. | |

### Return type

[**Repository**](Repository.md)


### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Repository successfully returned. |  -  |
| **404** | Object not found |  -  |

## getRepositoryWithHttpInfo

> ApiResponse<Repository> getRepository getRepositoryWithHttpInfo(repositoryId)



Returns a repository definition.

### Example

```java
// Import classes:
import com.example.content.services.invoker.ApiClient;
import com.example.content.services.invoker.ApiException;
import com.example.content.services.invoker.ApiResponse;
import com.example.content.services.invoker.Configuration;
import com.example.content.services.invoker.models.*;
import com.example.content.services.api.RepositoryManagementApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://backbase.com/contentservices-public");

        RepositoryManagementApi apiInstance = new RepositoryManagementApi(defaultClient);
        String repositoryId = "repositoryId_example"; // String | The Identifier of the Repository to process.
        try {
            ApiResponse<Repository> response = apiInstance.getRepositoryWithHttpInfo(repositoryId);
            System.out.println("Status code: " + response.getStatusCode());
            System.out.println("Response headers: " + response.getHeaders());
            System.out.println("Response body: " + response.getData());
        } catch (ApiException e) {
            System.err.println("Exception when calling RepositoryManagementApi#getRepository");
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
| **repositoryId** | **String**| The Identifier of the Repository to process. | |

### Return type

ApiResponse<[**Repository**](Repository.md)>


### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Repository successfully returned. |  -  |
| **404** | Object not found |  -  |

