# RetentionPoliciesManagementApi

All URIs are relative to *http://backbase.com/contentservices-public*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**addRetentionPoliciesForRepository**](RetentionPoliciesManagementApi.md#addRetentionPoliciesForRepository) | **POST** /client-api/repositories/{repositoryId}/retention-policies |  |
| [**addRetentionPoliciesForRepositoryWithHttpInfo**](RetentionPoliciesManagementApi.md#addRetentionPoliciesForRepositoryWithHttpInfo) | **POST** /client-api/repositories/{repositoryId}/retention-policies |  |
| [**createRetentionPolicy**](RetentionPoliciesManagementApi.md#createRetentionPolicy) | **POST** /client-api/retention-policies |  |
| [**createRetentionPolicyWithHttpInfo**](RetentionPoliciesManagementApi.md#createRetentionPolicyWithHttpInfo) | **POST** /client-api/retention-policies |  |
| [**deleteRetentionPolicy**](RetentionPoliciesManagementApi.md#deleteRetentionPolicy) | **DELETE** /client-api/retention-policies/{policyId} |  |
| [**deleteRetentionPolicyWithHttpInfo**](RetentionPoliciesManagementApi.md#deleteRetentionPolicyWithHttpInfo) | **DELETE** /client-api/retention-policies/{policyId} |  |
| [**detachRetentionPolicies**](RetentionPoliciesManagementApi.md#detachRetentionPolicies) | **DELETE** /client-api/repositories/{repositoryId}/retention-policies |  |
| [**detachRetentionPoliciesWithHttpInfo**](RetentionPoliciesManagementApi.md#detachRetentionPoliciesWithHttpInfo) | **DELETE** /client-api/repositories/{repositoryId}/retention-policies |  |
| [**getAllRetentionPolicies**](RetentionPoliciesManagementApi.md#getAllRetentionPolicies) | **GET** /client-api/retention-policies |  |
| [**getAllRetentionPoliciesWithHttpInfo**](RetentionPoliciesManagementApi.md#getAllRetentionPoliciesWithHttpInfo) | **GET** /client-api/retention-policies |  |
| [**getRetentionPoliciesForRepository**](RetentionPoliciesManagementApi.md#getRetentionPoliciesForRepository) | **GET** /client-api/repositories/{repositoryId}/retention-policies |  |
| [**getRetentionPoliciesForRepositoryWithHttpInfo**](RetentionPoliciesManagementApi.md#getRetentionPoliciesForRepositoryWithHttpInfo) | **GET** /client-api/repositories/{repositoryId}/retention-policies |  |
| [**getRetentionPolicy**](RetentionPoliciesManagementApi.md#getRetentionPolicy) | **GET** /client-api/retention-policies/{policyId} |  |
| [**getRetentionPolicyWithHttpInfo**](RetentionPoliciesManagementApi.md#getRetentionPolicyWithHttpInfo) | **GET** /client-api/retention-policies/{policyId} |  |
| [**runRetentionPolicy**](RetentionPoliciesManagementApi.md#runRetentionPolicy) | **POST** /client-api/retention-policies/run/{repositoryId} |  |
| [**runRetentionPolicyWithHttpInfo**](RetentionPoliciesManagementApi.md#runRetentionPolicyWithHttpInfo) | **POST** /client-api/retention-policies/run/{repositoryId} |  |
| [**updateRetentionPolicyforRepository**](RetentionPoliciesManagementApi.md#updateRetentionPolicyforRepository) | **PUT** /client-api/retention-policies/{policyId} |  |
| [**updateRetentionPolicyforRepositoryWithHttpInfo**](RetentionPoliciesManagementApi.md#updateRetentionPolicyforRepositoryWithHttpInfo) | **PUT** /client-api/retention-policies/{policyId} |  |



## addRetentionPoliciesForRepository

> List<RetentionPolicy> addRetentionPoliciesForRepository(repositoryId, requestBody)



Returns a list of retention policies added to the given repository.

### Example

```java
// Import classes:
import com.example.content.services.invoker.ApiClient;
import com.example.content.services.invoker.ApiException;
import com.example.content.services.invoker.Configuration;
import com.example.content.services.invoker.models.*;
import com.example.content.services.api.RetentionPoliciesManagementApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://backbase.com/contentservices-public");

        RetentionPoliciesManagementApi apiInstance = new RetentionPoliciesManagementApi(defaultClient);
        String repositoryId = "repositoryId_example"; // String | The Identifier of the Repository to process.
        Set<String> requestBody = Arrays.asList(); // Set<String> | 
        try {
            List<RetentionPolicy> result = apiInstance.addRetentionPoliciesForRepository(repositoryId, requestBody);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling RetentionPoliciesManagementApi#addRetentionPoliciesForRepository");
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
| **requestBody** | [**Set&lt;String&gt;**](String.md)|  | [optional] |

### Return type

[**List&lt;RetentionPolicy&gt;**](RetentionPolicy.md)


### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Retention Policies successfully addded to the reposity. |  -  |
| **404** | Object not found |  -  |

## addRetentionPoliciesForRepositoryWithHttpInfo

> ApiResponse<List<RetentionPolicy>> addRetentionPoliciesForRepository addRetentionPoliciesForRepositoryWithHttpInfo(repositoryId, requestBody)



Returns a list of retention policies added to the given repository.

### Example

```java
// Import classes:
import com.example.content.services.invoker.ApiClient;
import com.example.content.services.invoker.ApiException;
import com.example.content.services.invoker.ApiResponse;
import com.example.content.services.invoker.Configuration;
import com.example.content.services.invoker.models.*;
import com.example.content.services.api.RetentionPoliciesManagementApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://backbase.com/contentservices-public");

        RetentionPoliciesManagementApi apiInstance = new RetentionPoliciesManagementApi(defaultClient);
        String repositoryId = "repositoryId_example"; // String | The Identifier of the Repository to process.
        Set<String> requestBody = Arrays.asList(); // Set<String> | 
        try {
            ApiResponse<List<RetentionPolicy>> response = apiInstance.addRetentionPoliciesForRepositoryWithHttpInfo(repositoryId, requestBody);
            System.out.println("Status code: " + response.getStatusCode());
            System.out.println("Response headers: " + response.getHeaders());
            System.out.println("Response body: " + response.getData());
        } catch (ApiException e) {
            System.err.println("Exception when calling RetentionPoliciesManagementApi#addRetentionPoliciesForRepository");
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
| **requestBody** | [**Set&lt;String&gt;**](String.md)|  | [optional] |

### Return type

ApiResponse<[**List&lt;RetentionPolicy&gt;**](RetentionPolicy.md)>


### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Retention Policies successfully addded to the reposity. |  -  |
| **404** | Object not found |  -  |


## createRetentionPolicy

> RetentionPolicy createRetentionPolicy(retentionPolicy)



Creates a retention policy.

### Example

```java
// Import classes:
import com.example.content.services.invoker.ApiClient;
import com.example.content.services.invoker.ApiException;
import com.example.content.services.invoker.Configuration;
import com.example.content.services.invoker.models.*;
import com.example.content.services.api.RetentionPoliciesManagementApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://backbase.com/contentservices-public");

        RetentionPoliciesManagementApi apiInstance = new RetentionPoliciesManagementApi(defaultClient);
        RetentionPolicy retentionPolicy = new RetentionPolicy(); // RetentionPolicy | Retention Policy to create.
        try {
            RetentionPolicy result = apiInstance.createRetentionPolicy(retentionPolicy);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling RetentionPoliciesManagementApi#createRetentionPolicy");
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
| **retentionPolicy** | [**RetentionPolicy**](RetentionPolicy.md)| Retention Policy to create. | |

### Return type

[**RetentionPolicy**](RetentionPolicy.md)


### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Retention poolicy successfully created. |  -  |
| **400** | Invalid request |  -  |
| **409** | Conflict |  -  |

## createRetentionPolicyWithHttpInfo

> ApiResponse<RetentionPolicy> createRetentionPolicy createRetentionPolicyWithHttpInfo(retentionPolicy)



Creates a retention policy.

### Example

```java
// Import classes:
import com.example.content.services.invoker.ApiClient;
import com.example.content.services.invoker.ApiException;
import com.example.content.services.invoker.ApiResponse;
import com.example.content.services.invoker.Configuration;
import com.example.content.services.invoker.models.*;
import com.example.content.services.api.RetentionPoliciesManagementApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://backbase.com/contentservices-public");

        RetentionPoliciesManagementApi apiInstance = new RetentionPoliciesManagementApi(defaultClient);
        RetentionPolicy retentionPolicy = new RetentionPolicy(); // RetentionPolicy | Retention Policy to create.
        try {
            ApiResponse<RetentionPolicy> response = apiInstance.createRetentionPolicyWithHttpInfo(retentionPolicy);
            System.out.println("Status code: " + response.getStatusCode());
            System.out.println("Response headers: " + response.getHeaders());
            System.out.println("Response body: " + response.getData());
        } catch (ApiException e) {
            System.err.println("Exception when calling RetentionPoliciesManagementApi#createRetentionPolicy");
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
| **retentionPolicy** | [**RetentionPolicy**](RetentionPolicy.md)| Retention Policy to create. | |

### Return type

ApiResponse<[**RetentionPolicy**](RetentionPolicy.md)>


### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Retention poolicy successfully created. |  -  |
| **400** | Invalid request |  -  |
| **409** | Conflict |  -  |


## deleteRetentionPolicy

> void deleteRetentionPolicy(policyId)



Deletes a retention policy.

### Example

```java
// Import classes:
import com.example.content.services.invoker.ApiClient;
import com.example.content.services.invoker.ApiException;
import com.example.content.services.invoker.Configuration;
import com.example.content.services.invoker.models.*;
import com.example.content.services.api.RetentionPoliciesManagementApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://backbase.com/contentservices-public");

        RetentionPoliciesManagementApi apiInstance = new RetentionPoliciesManagementApi(defaultClient);
        String policyId = "policyId_example"; // String | The Identifier of the Retention policy to process.
        try {
            apiInstance.deleteRetentionPolicy(policyId);
        } catch (ApiException e) {
            System.err.println("Exception when calling RetentionPoliciesManagementApi#deleteRetentionPolicy");
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
| **policyId** | **String**| The Identifier of the Retention policy to process. | |

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
| **204** | Retention Policy was successfully deleted. |  -  |
| **404** | Object not found |  -  |

## deleteRetentionPolicyWithHttpInfo

> ApiResponse<Void> deleteRetentionPolicy deleteRetentionPolicyWithHttpInfo(policyId)



Deletes a retention policy.

### Example

```java
// Import classes:
import com.example.content.services.invoker.ApiClient;
import com.example.content.services.invoker.ApiException;
import com.example.content.services.invoker.ApiResponse;
import com.example.content.services.invoker.Configuration;
import com.example.content.services.invoker.models.*;
import com.example.content.services.api.RetentionPoliciesManagementApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://backbase.com/contentservices-public");

        RetentionPoliciesManagementApi apiInstance = new RetentionPoliciesManagementApi(defaultClient);
        String policyId = "policyId_example"; // String | The Identifier of the Retention policy to process.
        try {
            ApiResponse<Void> response = apiInstance.deleteRetentionPolicyWithHttpInfo(policyId);
            System.out.println("Status code: " + response.getStatusCode());
            System.out.println("Response headers: " + response.getHeaders());
        } catch (ApiException e) {
            System.err.println("Exception when calling RetentionPoliciesManagementApi#deleteRetentionPolicy");
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
| **policyId** | **String**| The Identifier of the Retention policy to process. | |

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
| **204** | Retention Policy was successfully deleted. |  -  |
| **404** | Object not found |  -  |


## detachRetentionPolicies

> List<RetentionPolicy> detachRetentionPolicies(repositoryId, requestBody)



detach all Retention Policies of a given repositoryId.

### Example

```java
// Import classes:
import com.example.content.services.invoker.ApiClient;
import com.example.content.services.invoker.ApiException;
import com.example.content.services.invoker.Configuration;
import com.example.content.services.invoker.models.*;
import com.example.content.services.api.RetentionPoliciesManagementApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://backbase.com/contentservices-public");

        RetentionPoliciesManagementApi apiInstance = new RetentionPoliciesManagementApi(defaultClient);
        String repositoryId = "repositoryId_example"; // String | The Identifier of the Repository to process.
        Set<String> requestBody = Arrays.asList(); // Set<String> | 
        try {
            List<RetentionPolicy> result = apiInstance.detachRetentionPolicies(repositoryId, requestBody);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling RetentionPoliciesManagementApi#detachRetentionPolicies");
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
| **requestBody** | [**Set&lt;String&gt;**](String.md)|  | [optional] |

### Return type

[**List&lt;RetentionPolicy&gt;**](RetentionPolicy.md)


### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Retention Policies were successfully detached. |  -  |
| **404** | Object not found |  -  |

## detachRetentionPoliciesWithHttpInfo

> ApiResponse<List<RetentionPolicy>> detachRetentionPolicies detachRetentionPoliciesWithHttpInfo(repositoryId, requestBody)



detach all Retention Policies of a given repositoryId.

### Example

```java
// Import classes:
import com.example.content.services.invoker.ApiClient;
import com.example.content.services.invoker.ApiException;
import com.example.content.services.invoker.ApiResponse;
import com.example.content.services.invoker.Configuration;
import com.example.content.services.invoker.models.*;
import com.example.content.services.api.RetentionPoliciesManagementApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://backbase.com/contentservices-public");

        RetentionPoliciesManagementApi apiInstance = new RetentionPoliciesManagementApi(defaultClient);
        String repositoryId = "repositoryId_example"; // String | The Identifier of the Repository to process.
        Set<String> requestBody = Arrays.asList(); // Set<String> | 
        try {
            ApiResponse<List<RetentionPolicy>> response = apiInstance.detachRetentionPoliciesWithHttpInfo(repositoryId, requestBody);
            System.out.println("Status code: " + response.getStatusCode());
            System.out.println("Response headers: " + response.getHeaders());
            System.out.println("Response body: " + response.getData());
        } catch (ApiException e) {
            System.err.println("Exception when calling RetentionPoliciesManagementApi#detachRetentionPolicies");
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
| **requestBody** | [**Set&lt;String&gt;**](String.md)|  | [optional] |

### Return type

ApiResponse<[**List&lt;RetentionPolicy&gt;**](RetentionPolicy.md)>


### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Retention Policies were successfully detached. |  -  |
| **404** | Object not found |  -  |


## getAllRetentionPolicies

> List<RetentionPolicy> getAllRetentionPolicies()



Returns all the existent retention policies

### Example

```java
// Import classes:
import com.example.content.services.invoker.ApiClient;
import com.example.content.services.invoker.ApiException;
import com.example.content.services.invoker.Configuration;
import com.example.content.services.invoker.models.*;
import com.example.content.services.api.RetentionPoliciesManagementApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://backbase.com/contentservices-public");

        RetentionPoliciesManagementApi apiInstance = new RetentionPoliciesManagementApi(defaultClient);
        try {
            List<RetentionPolicy> result = apiInstance.getAllRetentionPolicies();
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling RetentionPoliciesManagementApi#getAllRetentionPolicies");
            System.err.println("Status code: " + e.getCode());
            System.err.println("Reason: " + e.getResponseBody());
            System.err.println("Response headers: " + e.getResponseHeaders());
            e.printStackTrace();
        }
    }
}
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**List&lt;RetentionPolicy&gt;**](RetentionPolicy.md)


### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Returns all the retention policies found. |  -  |

## getAllRetentionPoliciesWithHttpInfo

> ApiResponse<List<RetentionPolicy>> getAllRetentionPolicies getAllRetentionPoliciesWithHttpInfo()



Returns all the existent retention policies

### Example

```java
// Import classes:
import com.example.content.services.invoker.ApiClient;
import com.example.content.services.invoker.ApiException;
import com.example.content.services.invoker.ApiResponse;
import com.example.content.services.invoker.Configuration;
import com.example.content.services.invoker.models.*;
import com.example.content.services.api.RetentionPoliciesManagementApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://backbase.com/contentservices-public");

        RetentionPoliciesManagementApi apiInstance = new RetentionPoliciesManagementApi(defaultClient);
        try {
            ApiResponse<List<RetentionPolicy>> response = apiInstance.getAllRetentionPoliciesWithHttpInfo();
            System.out.println("Status code: " + response.getStatusCode());
            System.out.println("Response headers: " + response.getHeaders());
            System.out.println("Response body: " + response.getData());
        } catch (ApiException e) {
            System.err.println("Exception when calling RetentionPoliciesManagementApi#getAllRetentionPolicies");
            System.err.println("Status code: " + e.getCode());
            System.err.println("Response headers: " + e.getResponseHeaders());
            System.err.println("Reason: " + e.getResponseBody());
            e.printStackTrace();
        }
    }
}
```

### Parameters

This endpoint does not need any parameter.

### Return type

ApiResponse<[**List&lt;RetentionPolicy&gt;**](RetentionPolicy.md)>


### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Returns all the retention policies found. |  -  |


## getRetentionPoliciesForRepository

> List<RetentionPolicy> getRetentionPoliciesForRepository(repositoryId)



Returns a list of retention policies for a reposity.

### Example

```java
// Import classes:
import com.example.content.services.invoker.ApiClient;
import com.example.content.services.invoker.ApiException;
import com.example.content.services.invoker.Configuration;
import com.example.content.services.invoker.models.*;
import com.example.content.services.api.RetentionPoliciesManagementApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://backbase.com/contentservices-public");

        RetentionPoliciesManagementApi apiInstance = new RetentionPoliciesManagementApi(defaultClient);
        String repositoryId = "repositoryId_example"; // String | The Identifier of the Repository to process.
        try {
            List<RetentionPolicy> result = apiInstance.getRetentionPoliciesForRepository(repositoryId);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling RetentionPoliciesManagementApi#getRetentionPoliciesForRepository");
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

[**List&lt;RetentionPolicy&gt;**](RetentionPolicy.md)


### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Retention Policies successfully returned. |  -  |
| **404** | Object not found |  -  |

## getRetentionPoliciesForRepositoryWithHttpInfo

> ApiResponse<List<RetentionPolicy>> getRetentionPoliciesForRepository getRetentionPoliciesForRepositoryWithHttpInfo(repositoryId)



Returns a list of retention policies for a reposity.

### Example

```java
// Import classes:
import com.example.content.services.invoker.ApiClient;
import com.example.content.services.invoker.ApiException;
import com.example.content.services.invoker.ApiResponse;
import com.example.content.services.invoker.Configuration;
import com.example.content.services.invoker.models.*;
import com.example.content.services.api.RetentionPoliciesManagementApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://backbase.com/contentservices-public");

        RetentionPoliciesManagementApi apiInstance = new RetentionPoliciesManagementApi(defaultClient);
        String repositoryId = "repositoryId_example"; // String | The Identifier of the Repository to process.
        try {
            ApiResponse<List<RetentionPolicy>> response = apiInstance.getRetentionPoliciesForRepositoryWithHttpInfo(repositoryId);
            System.out.println("Status code: " + response.getStatusCode());
            System.out.println("Response headers: " + response.getHeaders());
            System.out.println("Response body: " + response.getData());
        } catch (ApiException e) {
            System.err.println("Exception when calling RetentionPoliciesManagementApi#getRetentionPoliciesForRepository");
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

ApiResponse<[**List&lt;RetentionPolicy&gt;**](RetentionPolicy.md)>


### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Retention Policies successfully returned. |  -  |
| **404** | Object not found |  -  |


## getRetentionPolicy

> RetentionPolicy getRetentionPolicy(policyId)



Returns the requested retention policy.

### Example

```java
// Import classes:
import com.example.content.services.invoker.ApiClient;
import com.example.content.services.invoker.ApiException;
import com.example.content.services.invoker.Configuration;
import com.example.content.services.invoker.models.*;
import com.example.content.services.api.RetentionPoliciesManagementApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://backbase.com/contentservices-public");

        RetentionPoliciesManagementApi apiInstance = new RetentionPoliciesManagementApi(defaultClient);
        String policyId = "policyId_example"; // String | The Identifier of the Retention policy to process.
        try {
            RetentionPolicy result = apiInstance.getRetentionPolicy(policyId);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling RetentionPoliciesManagementApi#getRetentionPolicy");
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
| **policyId** | **String**| The Identifier of the Retention policy to process. | |

### Return type

[**RetentionPolicy**](RetentionPolicy.md)


### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Retention Policy successfully returned. |  -  |
| **404** | Object not found |  -  |

## getRetentionPolicyWithHttpInfo

> ApiResponse<RetentionPolicy> getRetentionPolicy getRetentionPolicyWithHttpInfo(policyId)



Returns the requested retention policy.

### Example

```java
// Import classes:
import com.example.content.services.invoker.ApiClient;
import com.example.content.services.invoker.ApiException;
import com.example.content.services.invoker.ApiResponse;
import com.example.content.services.invoker.Configuration;
import com.example.content.services.invoker.models.*;
import com.example.content.services.api.RetentionPoliciesManagementApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://backbase.com/contentservices-public");

        RetentionPoliciesManagementApi apiInstance = new RetentionPoliciesManagementApi(defaultClient);
        String policyId = "policyId_example"; // String | The Identifier of the Retention policy to process.
        try {
            ApiResponse<RetentionPolicy> response = apiInstance.getRetentionPolicyWithHttpInfo(policyId);
            System.out.println("Status code: " + response.getStatusCode());
            System.out.println("Response headers: " + response.getHeaders());
            System.out.println("Response body: " + response.getData());
        } catch (ApiException e) {
            System.err.println("Exception when calling RetentionPoliciesManagementApi#getRetentionPolicy");
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
| **policyId** | **String**| The Identifier of the Retention policy to process. | |

### Return type

ApiResponse<[**RetentionPolicy**](RetentionPolicy.md)>


### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Retention Policy successfully returned. |  -  |
| **404** | Object not found |  -  |


## runRetentionPolicy

> String runRetentionPolicy(repositoryId, requestBody)



Runs the given retention policies to the specified repositoryId.

### Example

```java
// Import classes:
import com.example.content.services.invoker.ApiClient;
import com.example.content.services.invoker.ApiException;
import com.example.content.services.invoker.Configuration;
import com.example.content.services.invoker.models.*;
import com.example.content.services.api.RetentionPoliciesManagementApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://backbase.com/contentservices-public");

        RetentionPoliciesManagementApi apiInstance = new RetentionPoliciesManagementApi(defaultClient);
        String repositoryId = "repositoryId_example"; // String | The Identifier of the repository to use for the retention policies check.
        Set<String> requestBody = Arrays.asList(); // Set<String> | Retention policies to run on this repository.
        try {
            String result = apiInstance.runRetentionPolicy(repositoryId, requestBody);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling RetentionPoliciesManagementApi#runRetentionPolicy");
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
| **repositoryId** | **String**| The Identifier of the repository to use for the retention policies check. | |
| **requestBody** | [**Set&lt;String&gt;**](String.md)| Retention policies to run on this repository. | [optional] |

### Return type

**String**


### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/plain, application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **202** | Retention Policies check successfully triggered. |  -  |
| **400** | Invalid request |  -  |
| **404** | Object not found |  -  |

## runRetentionPolicyWithHttpInfo

> ApiResponse<String> runRetentionPolicy runRetentionPolicyWithHttpInfo(repositoryId, requestBody)



Runs the given retention policies to the specified repositoryId.

### Example

```java
// Import classes:
import com.example.content.services.invoker.ApiClient;
import com.example.content.services.invoker.ApiException;
import com.example.content.services.invoker.ApiResponse;
import com.example.content.services.invoker.Configuration;
import com.example.content.services.invoker.models.*;
import com.example.content.services.api.RetentionPoliciesManagementApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://backbase.com/contentservices-public");

        RetentionPoliciesManagementApi apiInstance = new RetentionPoliciesManagementApi(defaultClient);
        String repositoryId = "repositoryId_example"; // String | The Identifier of the repository to use for the retention policies check.
        Set<String> requestBody = Arrays.asList(); // Set<String> | Retention policies to run on this repository.
        try {
            ApiResponse<String> response = apiInstance.runRetentionPolicyWithHttpInfo(repositoryId, requestBody);
            System.out.println("Status code: " + response.getStatusCode());
            System.out.println("Response headers: " + response.getHeaders());
            System.out.println("Response body: " + response.getData());
        } catch (ApiException e) {
            System.err.println("Exception when calling RetentionPoliciesManagementApi#runRetentionPolicy");
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
| **repositoryId** | **String**| The Identifier of the repository to use for the retention policies check. | |
| **requestBody** | [**Set&lt;String&gt;**](String.md)| Retention policies to run on this repository. | [optional] |

### Return type

ApiResponse<**String**>


### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: text/plain, application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **202** | Retention Policies check successfully triggered. |  -  |
| **400** | Invalid request |  -  |
| **404** | Object not found |  -  |


## updateRetentionPolicyforRepository

> RetentionPolicy updateRetentionPolicyforRepository(policyId, retentionPolicy)



Updates a retention policy.

### Example

```java
// Import classes:
import com.example.content.services.invoker.ApiClient;
import com.example.content.services.invoker.ApiException;
import com.example.content.services.invoker.Configuration;
import com.example.content.services.invoker.models.*;
import com.example.content.services.api.RetentionPoliciesManagementApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://backbase.com/contentservices-public");

        RetentionPoliciesManagementApi apiInstance = new RetentionPoliciesManagementApi(defaultClient);
        String policyId = "policyId_example"; // String | The Identifier of the Retention policy to process.
        RetentionPolicy retentionPolicy = new RetentionPolicy(); // RetentionPolicy | Request Policy to update.
        try {
            RetentionPolicy result = apiInstance.updateRetentionPolicyforRepository(policyId, retentionPolicy);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling RetentionPoliciesManagementApi#updateRetentionPolicyforRepository");
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
| **policyId** | **String**| The Identifier of the Retention policy to process. | |
| **retentionPolicy** | [**RetentionPolicy**](RetentionPolicy.md)| Request Policy to update. | |

### Return type

[**RetentionPolicy**](RetentionPolicy.md)


### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Retention poolicy successfully updated. |  -  |
| **400** | Invalid request |  -  |
| **409** | Conflict |  -  |

## updateRetentionPolicyforRepositoryWithHttpInfo

> ApiResponse<RetentionPolicy> updateRetentionPolicyforRepository updateRetentionPolicyforRepositoryWithHttpInfo(policyId, retentionPolicy)



Updates a retention policy.

### Example

```java
// Import classes:
import com.example.content.services.invoker.ApiClient;
import com.example.content.services.invoker.ApiException;
import com.example.content.services.invoker.ApiResponse;
import com.example.content.services.invoker.Configuration;
import com.example.content.services.invoker.models.*;
import com.example.content.services.api.RetentionPoliciesManagementApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://backbase.com/contentservices-public");

        RetentionPoliciesManagementApi apiInstance = new RetentionPoliciesManagementApi(defaultClient);
        String policyId = "policyId_example"; // String | The Identifier of the Retention policy to process.
        RetentionPolicy retentionPolicy = new RetentionPolicy(); // RetentionPolicy | Request Policy to update.
        try {
            ApiResponse<RetentionPolicy> response = apiInstance.updateRetentionPolicyforRepositoryWithHttpInfo(policyId, retentionPolicy);
            System.out.println("Status code: " + response.getStatusCode());
            System.out.println("Response headers: " + response.getHeaders());
            System.out.println("Response body: " + response.getData());
        } catch (ApiException e) {
            System.err.println("Exception when calling RetentionPoliciesManagementApi#updateRetentionPolicyforRepository");
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
| **policyId** | **String**| The Identifier of the Retention policy to process. | |
| **retentionPolicy** | [**RetentionPolicy**](RetentionPolicy.md)| Request Policy to update. | |

### Return type

ApiResponse<[**RetentionPolicy**](RetentionPolicy.md)>


### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Retention poolicy successfully updated. |  -  |
| **400** | Invalid request |  -  |
| **409** | Conflict |  -  |

