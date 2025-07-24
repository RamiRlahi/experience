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
import com.example.my.service.models.DocumentSignedUrlResponse;
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
* Duplicated document response.
*/

    @Schema(name = "duplicated-item", description = "Duplicated document response.")
      @JsonTypeName("duplicated-item")
@Generated(value = "com.backbase.oss.codegen.java.BoatSpringCodeGen")
public class DuplicatedItem {

    @NotNull
    @Valid
    @NotNull
    
    private String sourceContentId;

    @NotNull
    @Valid
    @NotNull
    
    private String duplicatedContentId;

    @NotNull
    @Valid
    @NotNull
    
    private String targetPath;

    @NotNull
    @Valid
    @NotNull
    
    private Boolean duplicatedStatus;

    @Valid
    
    private DocumentSignedUrlResponse signedUrl;

    /**
    * Default constructor
    * @deprecated Use {@link DuplicatedItem#DuplicatedItem(String, String, String, Boolean)}
    */
    @Deprecated
    public DuplicatedItem() {
    super();
    }

    /**
    * Constructor with only required parameters
    */
    public DuplicatedItem(String sourceContentId, String duplicatedContentId, String targetPath, Boolean duplicatedStatus) {
          this.sourceContentId = sourceContentId;
          this.duplicatedContentId = duplicatedContentId;
          this.targetPath = targetPath;
          this.duplicatedStatus = duplicatedStatus;
    }

  public DuplicatedItem sourceContentId(String sourceContentId) {
    this.sourceContentId = sourceContentId;
  return this;
  }

  /**
    * The id of the original document which was duplicated.
  * @return sourceContentId
  */
    @NotNull 
    @Schema(name = "sourceContentId", description = "The id of the original document which was duplicated.", requiredMode = Schema.RequiredMode.REQUIRED)
    @JsonProperty("sourceContentId")
  public String getSourceContentId() {
  return sourceContentId;
  }

  public void setSourceContentId(String sourceContentId) {
  this.sourceContentId = sourceContentId;
  }

  public DuplicatedItem duplicatedContentId(String duplicatedContentId) {
    this.duplicatedContentId = duplicatedContentId;
  return this;
  }

  /**
    * The id of the duplicated document. If duplicatedStatus is false, it equals to sourceContentId
  * @return duplicatedContentId
  */
    @NotNull 
    @Schema(name = "duplicatedContentId", description = "The id of the duplicated document. If duplicatedStatus is false, it equals to sourceContentId", requiredMode = Schema.RequiredMode.REQUIRED)
    @JsonProperty("duplicatedContentId")
  public String getDuplicatedContentId() {
  return duplicatedContentId;
  }

  public void setDuplicatedContentId(String duplicatedContentId) {
  this.duplicatedContentId = duplicatedContentId;
  }

  public DuplicatedItem targetPath(String targetPath) {
    this.targetPath = targetPath;
  return this;
  }

  /**
    * The path of the duplicated document. If duplicatedStatus is false, it is empty.
  * @return targetPath
  */
    @NotNull 
    @Schema(name = "targetPath", description = "The path of the duplicated document. If duplicatedStatus is false, it is empty.", requiredMode = Schema.RequiredMode.REQUIRED)
    @JsonProperty("targetPath")
  public String getTargetPath() {
  return targetPath;
  }

  public void setTargetPath(String targetPath) {
  this.targetPath = targetPath;
  }

  public DuplicatedItem duplicatedStatus(Boolean duplicatedStatus) {
    this.duplicatedStatus = duplicatedStatus;
  return this;
  }

  /**
    * Whether the document was duplicated or not. False only if source document is not in rootFolder
  * @return duplicatedStatus
  */
    @NotNull 
    @Schema(name = "duplicatedStatus", description = "Whether the document was duplicated or not. False only if source document is not in rootFolder", requiredMode = Schema.RequiredMode.REQUIRED)
    @JsonProperty("duplicatedStatus")
  public Boolean getDuplicatedStatus() {
  return duplicatedStatus;
  }

  public void setDuplicatedStatus(Boolean duplicatedStatus) {
  this.duplicatedStatus = duplicatedStatus;
  }

  public DuplicatedItem signedUrl(DocumentSignedUrlResponse signedUrl) {
    this.signedUrl = signedUrl;
  return this;
  }

  /**
    * Get signedUrl
  * @return signedUrl
  */
    @Valid 
    @Schema(name = "signedUrl", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("signedUrl")
  public DocumentSignedUrlResponse getSignedUrl() {
  return signedUrl;
  }

  public void setSignedUrl(DocumentSignedUrlResponse signedUrl) {
  this.signedUrl = signedUrl;
  }

  @Override
  public boolean equals(Object o) {
  if (this == o) {
  return true;
  }
  if (o == null || getClass() != o.getClass()) {
  return false;
  }
    DuplicatedItem duplicatedItem = (DuplicatedItem) o;
    return Objects.equals(this.sourceContentId, duplicatedItem.sourceContentId) &&
    Objects.equals(this.duplicatedContentId, duplicatedItem.duplicatedContentId) &&
    Objects.equals(this.targetPath, duplicatedItem.targetPath) &&
    Objects.equals(this.duplicatedStatus, duplicatedItem.duplicatedStatus) &&
    Objects.equals(this.signedUrl, duplicatedItem.signedUrl);
  }

    @Override
    public int hashCode() {
    return Objects.hash(sourceContentId, duplicatedContentId, targetPath, duplicatedStatus, signedUrl);
    }

    @Override
    public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class DuplicatedItem {\n");
  sb.append("    sourceContentId: ").append(toIndentedString(sourceContentId)).append("\n");
  sb.append("    duplicatedContentId: ").append(toIndentedString(duplicatedContentId)).append("\n");
  sb.append("    targetPath: ").append(toIndentedString(targetPath)).append("\n");
  sb.append("    duplicatedStatus: ").append(toIndentedString(duplicatedStatus)).append("\n");
  sb.append("    signedUrl: ").append(toIndentedString(signedUrl)).append("\n");
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
