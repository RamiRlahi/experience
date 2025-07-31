

# QueryRequest

Content Api provides querying and relationship resolving features as a replacement for CMIS

## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**ids** | **Set&lt;String&gt;** | Content ids to be resolved |  [optional] |
|**paths** | **Set&lt;String&gt;** | List of paths of content to be searched. Child folders can be omitted by adding &#39;!&#39; as prefix. For Ex: paths: [&#39;/&#39;, &#39;!/Generated content&#39;] will fetch all children of &#39;/ &#39; except &#39;!/Generated content&#39; |  [optional] |
|**repositories** | **Set&lt;String&gt;** | List of content repositories to limit the search to. Skipping this property or specifying multiple repositories is not recommended for performance reasons. Not specified repository is deprecated. |  [optional] |
|**loadContentForTypes** | **Set&lt;String&gt;** | List of Cmis Types for which content should be loaded |  [optional] |
|**loadContentForMimeTypes** | **Set&lt;String&gt;** | List of mimeTypes for which content should be loaded |  [optional] |
|**loadTargetRelationships** | **Boolean** | Load the target relationships of fetched items |  [optional] |
|**loadSourceRelationships** | **Boolean** | Load the source relationships of fetched items |  [optional] |
|**loadRecursiveRelationships** | **Boolean** | Load all relationships of fetched items recursively |  [optional] |
|**loadProperties** | **Boolean** | Should load all properties of the fetched items |  [optional] |
|**inlineRelationshipsContent** | **Boolean** | If relationships content should be resolved and inlined in the related json content |  [optional] |
|**loadRenditions** | **Boolean** | Load all renditions of fetched items  |  [optional] |
|**loadChildren** | **Boolean** | Should load the children of fetched content |  [optional] |
|**loadVersions** | **Boolean** | List of all version belonging to specific document. |  [optional] |



