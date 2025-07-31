

# DocumentToSave

CMIS Document to create or update

## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**id** | **String** | ID of the existing document to update. |  [optional] |
|**path** | **String** | Path of the document to create or update. Folders in the path will be created automatically if needed. |  [optional] |
|**repositoryId** | **String** | Repository ID to which updating or creating document belongs. |  |
|**type** | **String** | The cmis type of the document |  [optional] |
|**content** | **String** | Content of the document to create or update |  [optional] |
|**mimeType** | **String** | Content mime type |  [optional] |
|**length** | **Long** | Content length |  [optional] |
|**properties** | **Map&lt;String, Object&gt;** | Optional content item properties |  [optional] |
|**createSignedUrl** | **Boolean** | If storage type supports generation of signed url for given content, setting this to true will generate a signed url for a limited time. |  [optional] |



