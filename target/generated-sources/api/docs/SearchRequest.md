

# SearchRequest

Content Api provides search functionality as a replacement for CMIS

## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**searchTerm** | **String** | Free text string to be searched |  [optional] |
|**paths** | **Set&lt;String&gt;** | List of paths of content to be searched. Folders can be omitted by adding &#39;!&#39; as prefix. For Ex: paths: [&#39;/&#39;, &#39;!/Generated content&#39;] will search on &#39;/ &#39; except &#39;!/Generated content&#39; |  [optional] |
|**repositories** | **Set&lt;String&gt;** | List of content repositories to limit the search to |  [optional] |
|**properties** | **Map&lt;String, String&gt;** | Map of key/value pairs of property names and the values on which the results should be filtered. |  [optional] |



