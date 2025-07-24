/*
Boat Generator configuration:
    useBeanValidation: true
    useOptional: false
    addServletRequest: false
    useLombokAnnotations: false
    openApiNullable: true
    useSetForUniqueItems: 
    useWithModifiers: false
    useJakartaEe: false
    useSpringBoot3: false
*/
package com.example.my.service.models;

import java.net.URI;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonTypeName;
import java.util.HashMap;
import java.util.Map;
import org.openapitools.jackson.nullable.JsonNullable;
import java.time.OffsetDateTime;
import javax.validation.Valid;
import javax.validation.constraints.*;
import io.swagger.v3.oas.annotations.media.Schema;


import java.util.*;
import javax.annotation.Generated;

/**
* CMIS Document to create or update
*/

    @Schema(name = "document-to-save", description = "CMIS Document to create or update")
      @JsonTypeName("document-to-save")
@Generated(value = "com.backbase.oss.codegen.java.BoatSpringCodeGen")
public class DocumentToSave {

    @Valid
    
    private String id;

    @Valid
    
    private String path;

    @NotNull
    @Valid
    @NotNull
    
    private String repositoryId;

    @Valid
    
    private String type = "bb:structuredcontent";

    @Valid
    
    private String content;

    @Valid
    
    private String mimeType = "application/json; charset=utf-8";

    @Valid
    
    private Long length;

    @Valid
    
    private Map<String, Object> properties = new HashMap<>();

    @Valid
    
    private Boolean createSignedUrl = false;

    /**
    * Default constructor
    * @deprecated Use {@link DocumentToSave#DocumentToSave(String)}
    */
    @Deprecated
    public DocumentToSave() {
    super();
    }

    /**
    * Constructor with only required parameters
    */
    public DocumentToSave(String repositoryId) {
          this.repositoryId = repositoryId;
    }

  public DocumentToSave id(String id) {
    this.id = id;
  return this;
  }

  /**
    * ID of the existing document to update.
  * @return id
  */
    
    @Schema(name = "id", description = "ID of the existing document to update.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("id")
  public String getId() {
  return id;
  }

  public void setId(String id) {
  this.id = id;
  }

  public DocumentToSave path(String path) {
    this.path = path;
  return this;
  }

  /**
    * Path of the document to create or update. Folders in the path will be created automatically if needed.
  * @return path
  */
    
    @Schema(name = "path", description = "Path of the document to create or update. Folders in the path will be created automatically if needed.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("path")
  public String getPath() {
  return path;
  }

  public void setPath(String path) {
  this.path = path;
  }

  public DocumentToSave repositoryId(String repositoryId) {
    this.repositoryId = repositoryId;
  return this;
  }

  /**
    * Repository ID to which updating or creating document belongs.
  * @return repositoryId
  */
    @NotNull 
    @Schema(name = "repositoryId", description = "Repository ID to which updating or creating document belongs.", requiredMode = Schema.RequiredMode.REQUIRED)
    @JsonProperty("repositoryId")
  public String getRepositoryId() {
  return repositoryId;
  }

  public void setRepositoryId(String repositoryId) {
  this.repositoryId = repositoryId;
  }

  public DocumentToSave type(String type) {
    this.type = type;
  return this;
  }

  /**
    * The cmis type of the document
  * @return type
  */
    
    @Schema(name = "type", description = "The cmis type of the document", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("type")
  public String getType() {
  return type;
  }

  public void setType(String type) {
  this.type = type;
  }

  public DocumentToSave content(String content) {
    this.content = content;
  return this;
  }

  /**
    * Content of the document to create or update
  * @return content
  */
    
    @Schema(name = "content", description = "Content of the document to create or update", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("content")
  public String getContent() {
  return content;
  }

  public void setContent(String content) {
  this.content = content;
  }

  public DocumentToSave mimeType(String mimeType) {
    this.mimeType = mimeType;
  return this;
  }

  /**
    * Content mime type
  * @return mimeType
  */
    
    @Schema(name = "mimeType", description = "Content mime type", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("mimeType")
  public String getMimeType() {
  return mimeType;
  }

  public void setMimeType(String mimeType) {
  this.mimeType = mimeType;
  }

  public DocumentToSave length(Long length) {
    this.length = length;
  return this;
  }

  /**
    * Content length
  * @return length
  */
    
    @Schema(name = "length", description = "Content length", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("length")
  public Long getLength() {
  return length;
  }

  public void setLength(Long length) {
  this.length = length;
  }

  public DocumentToSave properties(Map<String, Object> properties) {
    this.properties = properties;
  return this;
  }

        public DocumentToSave putPropertiesItem(String key, Object propertiesItem) {

          if (this.properties == null) {
          this.properties = new HashMap<>();
          }
        this.properties.put(key, propertiesItem);
        return this;
        }

  /**
    * Optional content item properties
  * @return properties
  */
    
    @Schema(name = "properties", description = "Optional content item properties", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("properties")
  public Map<String, Object> getProperties() {
  return properties;
  }

  public void setProperties(Map<String, Object> properties) {
  this.properties = properties;
  }

  public DocumentToSave createSignedUrl(Boolean createSignedUrl) {
    this.createSignedUrl = createSignedUrl;
  return this;
  }

  /**
    * If storage type supports generation of signed url for given content, setting this to true will generate a signed url for a limited time.
  * @return createSignedUrl
  */
    
    @Schema(name = "createSignedUrl", description = "If storage type supports generation of signed url for given content, setting this to true will generate a signed url for a limited time.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("createSignedUrl")
  public Boolean getCreateSignedUrl() {
  return createSignedUrl;
  }

  public void setCreateSignedUrl(Boolean createSignedUrl) {
  this.createSignedUrl = createSignedUrl;
  }

  @Override
  public boolean equals(Object o) {
  if (this == o) {
  return true;
  }
  if (o == null || getClass() != o.getClass()) {
  return false;
  }
    DocumentToSave documentToSave = (DocumentToSave) o;
    return Objects.equals(this.id, documentToSave.id) &&
    Objects.equals(this.path, documentToSave.path) &&
    Objects.equals(this.repositoryId, documentToSave.repositoryId) &&
    Objects.equals(this.type, documentToSave.type) &&
    Objects.equals(this.content, documentToSave.content) &&
    Objects.equals(this.mimeType, documentToSave.mimeType) &&
    Objects.equals(this.length, documentToSave.length) &&
    Objects.equals(this.properties, documentToSave.properties) &&
    Objects.equals(this.createSignedUrl, documentToSave.createSignedUrl);
  }

    @Override
    public int hashCode() {
    return Objects.hash(id, path, repositoryId, type, content, mimeType, length, properties, createSignedUrl);
    }

    @Override
    public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class DocumentToSave {\n");
  sb.append("    id: ").append(toIndentedString(id)).append("\n");
  sb.append("    path: ").append(toIndentedString(path)).append("\n");
  sb.append("    repositoryId: ").append(toIndentedString(repositoryId)).append("\n");
  sb.append("    type: ").append(toIndentedString(type)).append("\n");
  sb.append("    content: ").append(toIndentedString(content)).append("\n");
  sb.append("    mimeType: ").append(toIndentedString(mimeType)).append("\n");
  sb.append("    length: ").append(toIndentedString(length)).append("\n");
  sb.append("    properties: ").append(toIndentedString(properties)).append("\n");
  sb.append("    createSignedUrl: ").append(toIndentedString(createSignedUrl)).append("\n");
  sb.append("}");
    return sb.toString();
    }

    /**
    * Convert the given object to string with each line indented by 4 spaces
    * (except the first line).
    */
    private String toIndentedString(Object o) {
    if (o == null) {
    return "null";
    }
    return o.toString().replace("\n", "\n    ");
    }
}
