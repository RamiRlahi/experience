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
import org.openapitools.jackson.nullable.JsonNullable;
import java.time.OffsetDateTime;
import javax.validation.Valid;
import javax.validation.constraints.*;
import io.swagger.v3.oas.annotations.media.Schema;


import java.util.*;
import javax.annotation.Generated;

/**
* Document to duplicate
*/

    @Schema(name = "item-to-duplicate", description = "Document to duplicate")
      @JsonTypeName("item-to-duplicate")
@Generated(value = "com.backbase.oss.codegen.java.BoatSpringCodeGen")
public class ItemToDuplicate {

    @NotNull
    @Valid
    @NotNull
    
    private String sourceContentId;

    @Valid
    
    private String targetPath;

    @Valid
    
    private Boolean createSignedUrl = false;

    /**
    * Default constructor
    * @deprecated Use {@link ItemToDuplicate#ItemToDuplicate(String)}
    */
    @Deprecated
    public ItemToDuplicate() {
    super();
    }

    /**
    * Constructor with only required parameters
    */
    public ItemToDuplicate(String sourceContentId) {
          this.sourceContentId = sourceContentId;
    }

  public ItemToDuplicate sourceContentId(String sourceContentId) {
    this.sourceContentId = sourceContentId;
  return this;
  }

  /**
    * The id of the document to be duplicated.
  * @return sourceContentId
  */
    @NotNull 
    @Schema(name = "sourceContentId", description = "The id of the document to be duplicated.", requiredMode = Schema.RequiredMode.REQUIRED)
    @JsonProperty("sourceContentId")
  public String getSourceContentId() {
  return sourceContentId;
  }

  public void setSourceContentId(String sourceContentId) {
  this.sourceContentId = sourceContentId;
  }

  public ItemToDuplicate targetPath(String targetPath) {
    this.targetPath = targetPath;
  return this;
  }

  /**
    * The path which the duplicated item should have. If ends with /, original document's name is appended. If not provided, duplicate will be stored in the original folder with name appended with _copy_timestamp
  * @return targetPath
  */
    
    @Schema(name = "targetPath", description = "The path which the duplicated item should have. If ends with /, original document's name is appended. If not provided, duplicate will be stored in the original folder with name appended with _copy_timestamp", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("targetPath")
  public String getTargetPath() {
  return targetPath;
  }

  public void setTargetPath(String targetPath) {
  this.targetPath = targetPath;
  }

  public ItemToDuplicate createSignedUrl(Boolean createSignedUrl) {
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
    ItemToDuplicate itemToDuplicate = (ItemToDuplicate) o;
    return Objects.equals(this.sourceContentId, itemToDuplicate.sourceContentId) &&
    Objects.equals(this.targetPath, itemToDuplicate.targetPath) &&
    Objects.equals(this.createSignedUrl, itemToDuplicate.createSignedUrl);
  }

    @Override
    public int hashCode() {
    return Objects.hash(sourceContentId, targetPath, createSignedUrl);
    }

    @Override
    public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ItemToDuplicate {\n");
  sb.append("    sourceContentId: ").append(toIndentedString(sourceContentId)).append("\n");
  sb.append("    targetPath: ").append(toIndentedString(targetPath)).append("\n");
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
