

# DuplicatedItem

Duplicated document response.

## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**sourceContentId** | **String** | The id of the original document which was duplicated. |  |
|**duplicatedContentId** | **String** | The id of the duplicated document. If duplicatedStatus is false, it equals to sourceContentId |  |
|**targetPath** | **String** | The path of the duplicated document. If duplicatedStatus is false, it is empty. |  |
|**duplicatedStatus** | **Boolean** | Whether the document was duplicated or not. False only if source document is not in rootFolder |  |
|**signedUrl** | [**DocumentSignedUrlResponse**](DocumentSignedUrlResponse.md) |  |  [optional] |



