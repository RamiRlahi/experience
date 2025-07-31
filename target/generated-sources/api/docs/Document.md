

# Document

Content Services Document

## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**path** | **String** | Content Path. |  [optional] |
|**id** | **String** | Content unique id. |  [optional] |
|**repositoryId** | **String** | Repository which the socument belongs to. |  [optional] |
|**type** | **String** | The cmis type of this document. |  [optional] |
|**versionLabel** | **String** | The version label for this document. |  [optional] |
|**creationDate** | **OffsetDateTime** | Date / time of creation, ISO format. |  [optional] |
|**lastModificationDate** | **OffsetDateTime** | Date / time of last modification, ISO format. |  [optional] |
|**properties** | **Map&lt;String, Object&gt;** | List of cmis properties of this document. |  [optional] |
|**content** | **String** | Content of the document |  [optional] |
|**mimeType** | **String** | Content mime type |  [optional] |
|**length** | **Long** | Length of the document. |  [optional] |
|**renditions** | [**Set&lt;Rendition&gt;**](Rendition.md) | All the renditions of this Document. |  [optional] |
|**children** | [**Set&lt;Document&gt;**](Document.md) | This document&#39;s children list. |  [optional] |
|**relationships** | [**Set&lt;DocumentRelationship&gt;**](DocumentRelationship.md) | All the relationship to/from this document |  [optional] |
|**versions** | [**Set&lt;Document&gt;**](Document.md) | All versions of this document |  [optional] |
|**links** | **Map&lt;String, Map&lt;String, Object&gt;&gt;** | All the different links to the document |  [optional] |
|**createSignedUrl** | **Boolean** | If storage type supports generation of signed url for given content, setting this to true will generate a signed url for a limited time. |  [optional] |
|**signedUrl** | [**DocumentSignedUrlResponse**](DocumentSignedUrlResponse.md) |  |  [optional] |



