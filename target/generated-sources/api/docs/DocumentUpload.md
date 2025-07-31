

# DocumentUpload


## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**targetPath** | **String** | Path where the item should be added. |  |
|**_file** | **File** | File to upload. |  |
|**name** | **String** | File name. |  |
|**cmisColonObjectTypeId** | [**CmisColonObjectTypeIdEnum**](#CmisColonObjectTypeIdEnum) | Document Object Type ID property. |  [optional] |
|**cmisColonCreatedBy** | **String** | Document created by property. |  [optional] |
|**cmisColonLastModifiedBy** | **String** | Document last modified by property. |  [optional] |
|**bbColonTitle** | **String** | Document title property. |  [optional] |
|**bbColonLocale** | **String** | Document locale property. |  [optional] |
|**changeToken** | **String** | Document change token property. |  [optional] |
|**createSignedUrl** | **Boolean** | If storage type supports generation of signed url for given content, setting this to true will generate a signed url for a limited time. |  [optional] |



## Enum: CmisColonObjectTypeIdEnum

| Name | Value |
|---- | -----|
| CMIS_DOCUMENT | &quot;cmis:document&quot; |



