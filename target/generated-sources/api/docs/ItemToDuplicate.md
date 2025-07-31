

# ItemToDuplicate

Document to duplicate

## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**sourceContentId** | **String** | The id of the document to be duplicated. |  |
|**targetPath** | **String** | The path which the duplicated item should have. If ends with /, original document&#39;s name is appended. If not provided, duplicate will be stored in the original folder with name appended with _copy_timestamp |  [optional] |
|**createSignedUrl** | **Boolean** | If storage type supports generation of signed url for given content, setting this to true will generate a signed url for a limited time. |  [optional] |



