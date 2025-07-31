

# DuplicateRequest

Payload schema to duplicate documents in a specific repository.

## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**repositoryId** | **String** | Repository ID to duplicate documents in. |  |
|**rootFolder** | **String** | Root folder in which original documents should be searched for. Default is / |  [optional] |
|**contents** | [**Set&lt;ItemToDuplicate&gt;**](ItemToDuplicate.md) | All documents to duplicate in this request. |  |



