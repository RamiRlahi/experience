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
import com.fasterxml.jackson.annotation.JsonValue;
import org.openapitools.jackson.nullable.JsonNullable;
import java.time.OffsetDateTime;
import javax.validation.Valid;
import javax.validation.constraints.*;
import io.swagger.v3.oas.annotations.media.Schema;


import java.util.*;
import javax.annotation.Generated;

/**
* DocumentUpload
*/

      @JsonTypeName("document-upload")
@Generated(value = "com.backbase.oss.codegen.java.BoatSpringCodeGen")
public class DocumentUpload {

    @NotNull
    @Valid
    @NotNull
    
    private String targetPath;

    @NotNull
    @Valid
    @NotNull
    
    private org.springframework.core.io.Resource file;

    @NotNull
    @Valid
    @NotNull
    
    private String name;

        /**
   * Document Object Type ID property.
   */
  public enum CmisColonObjectTypeIdEnum {
    CMIS_DOCUMENT("cmis:document");

    private final String value;

    CmisColonObjectTypeIdEnum(String value) {
      this.value = value;
    }

    @JsonValue
    public String getValue() {
      return value;
    }

    @Override
    public String toString() {
      return String.valueOf(value);
    }

    @JsonCreator
    public static CmisColonObjectTypeIdEnum fromValue(String value) {
      for (CmisColonObjectTypeIdEnum b : CmisColonObjectTypeIdEnum.values()) {
        if (b.value.equals(value)) {
          return b;
        }
      }
      throw new IllegalArgumentException("Unexpected value '" + value + "'");
    }
  }
    @Valid
    
    private CmisColonObjectTypeIdEnum cmisColonObjectTypeId;

    @Valid
    
    private String cmisColonCreatedBy;

    @Valid
    
    private String cmisColonLastModifiedBy;

    @Valid
    
    private String bbColonTitle;

    @Valid
    
    private String bbColonLocale;

    @Valid
    
    private String changeToken;

    @Valid
    
    private Boolean createSignedUrl = false;

    /**
    * Default constructor
    * @deprecated Use {@link DocumentUpload#DocumentUpload(String, org.springframework.core.io.Resource, String)}
    */
    @Deprecated
    public DocumentUpload() {
    super();
    }

    /**
    * Constructor with only required parameters
    */
    public DocumentUpload(String targetPath, org.springframework.core.io.Resource file, String name) {
          this.targetPath = targetPath;
          this.file = file;
          this.name = name;
    }

  public DocumentUpload targetPath(String targetPath) {
    this.targetPath = targetPath;
  return this;
  }

  /**
    * Path where the item should be added.
  * @return targetPath
  */
    @NotNull 
    @Schema(name = "targetPath", description = "Path where the item should be added.", requiredMode = Schema.RequiredMode.REQUIRED)
    @JsonProperty("targetPath")
  public String getTargetPath() {
  return targetPath;
  }

  public void setTargetPath(String targetPath) {
  this.targetPath = targetPath;
  }

  public DocumentUpload file(org.springframework.core.io.Resource file) {
    this.file = file;
  return this;
  }

  /**
    * File to upload.
  * @return file
  */
    @NotNull @Valid 
    @Schema(name = "file", description = "File to upload.", requiredMode = Schema.RequiredMode.REQUIRED)
    @JsonProperty("file")
  public org.springframework.core.io.Resource getFile() {
  return file;
  }

  public void setFile(org.springframework.core.io.Resource file) {
  this.file = file;
  }

  public DocumentUpload name(String name) {
    this.name = name;
  return this;
  }

  /**
    * File name.
  * @return name
  */
    @NotNull 
    @Schema(name = "name", description = "File name.", requiredMode = Schema.RequiredMode.REQUIRED)
    @JsonProperty("name")
  public String getName() {
  return name;
  }

  public void setName(String name) {
  this.name = name;
  }

  public DocumentUpload cmisColonObjectTypeId(CmisColonObjectTypeIdEnum cmisColonObjectTypeId) {
    this.cmisColonObjectTypeId = cmisColonObjectTypeId;
  return this;
  }

  /**
    * Document Object Type ID property.
  * @return cmisColonObjectTypeId
  */
    
    @Schema(name = "cmis:objectTypeId", description = "Document Object Type ID property.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("cmis:objectTypeId")
  public CmisColonObjectTypeIdEnum getCmisColonObjectTypeId() {
  return cmisColonObjectTypeId;
  }

  public void setCmisColonObjectTypeId(CmisColonObjectTypeIdEnum cmisColonObjectTypeId) {
  this.cmisColonObjectTypeId = cmisColonObjectTypeId;
  }

  public DocumentUpload cmisColonCreatedBy(String cmisColonCreatedBy) {
    this.cmisColonCreatedBy = cmisColonCreatedBy;
  return this;
  }

  /**
    * Document created by property.
  * @return cmisColonCreatedBy
  */
    
    @Schema(name = "cmis:createdBy", description = "Document created by property.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("cmis:createdBy")
  public String getCmisColonCreatedBy() {
  return cmisColonCreatedBy;
  }

  public void setCmisColonCreatedBy(String cmisColonCreatedBy) {
  this.cmisColonCreatedBy = cmisColonCreatedBy;
  }

  public DocumentUpload cmisColonLastModifiedBy(String cmisColonLastModifiedBy) {
    this.cmisColonLastModifiedBy = cmisColonLastModifiedBy;
  return this;
  }

  /**
    * Document last modified by property.
  * @return cmisColonLastModifiedBy
  */
    
    @Schema(name = "cmis:lastModifiedBy", description = "Document last modified by property.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("cmis:lastModifiedBy")
  public String getCmisColonLastModifiedBy() {
  return cmisColonLastModifiedBy;
  }

  public void setCmisColonLastModifiedBy(String cmisColonLastModifiedBy) {
  this.cmisColonLastModifiedBy = cmisColonLastModifiedBy;
  }

  public DocumentUpload bbColonTitle(String bbColonTitle) {
    this.bbColonTitle = bbColonTitle;
  return this;
  }

  /**
    * Document title property.
  * @return bbColonTitle
  */
    
    @Schema(name = "bb:title", description = "Document title property.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("bb:title")
  public String getBbColonTitle() {
  return bbColonTitle;
  }

  public void setBbColonTitle(String bbColonTitle) {
  this.bbColonTitle = bbColonTitle;
  }

  public DocumentUpload bbColonLocale(String bbColonLocale) {
    this.bbColonLocale = bbColonLocale;
  return this;
  }

  /**
    * Document locale property.
  * @return bbColonLocale
  */
    
    @Schema(name = "bb:locale", description = "Document locale property.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("bb:locale")
  public String getBbColonLocale() {
  return bbColonLocale;
  }

  public void setBbColonLocale(String bbColonLocale) {
  this.bbColonLocale = bbColonLocale;
  }

  public DocumentUpload changeToken(String changeToken) {
    this.changeToken = changeToken;
  return this;
  }

  /**
    * Document change token property.
  * @return changeToken
  */
    
    @Schema(name = "changeToken", description = "Document change token property.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("changeToken")
  public String getChangeToken() {
  return changeToken;
  }

  public void setChangeToken(String changeToken) {
  this.changeToken = changeToken;
  }

  public DocumentUpload createSignedUrl(Boolean createSignedUrl) {
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
    DocumentUpload documentUpload = (DocumentUpload) o;
    return Objects.equals(this.targetPath, documentUpload.targetPath) &&
    Objects.equals(this.file, documentUpload.file) &&
    Objects.equals(this.name, documentUpload.name) &&
    Objects.equals(this.cmisColonObjectTypeId, documentUpload.cmisColonObjectTypeId) &&
    Objects.equals(this.cmisColonCreatedBy, documentUpload.cmisColonCreatedBy) &&
    Objects.equals(this.cmisColonLastModifiedBy, documentUpload.cmisColonLastModifiedBy) &&
    Objects.equals(this.bbColonTitle, documentUpload.bbColonTitle) &&
    Objects.equals(this.bbColonLocale, documentUpload.bbColonLocale) &&
    Objects.equals(this.changeToken, documentUpload.changeToken) &&
    Objects.equals(this.createSignedUrl, documentUpload.createSignedUrl);
  }

    @Override
    public int hashCode() {
    return Objects.hash(targetPath, file, name, cmisColonObjectTypeId, cmisColonCreatedBy, cmisColonLastModifiedBy, bbColonTitle, bbColonLocale, changeToken, createSignedUrl);
    }

    @Override
    public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class DocumentUpload {\n");
  sb.append("    targetPath: ").append(toIndentedString(targetPath)).append("\n");
  sb.append("    file: ").append(toIndentedString(file)).append("\n");
  sb.append("    name: ").append(toIndentedString(name)).append("\n");
  sb.append("    cmisColonObjectTypeId: ").append(toIndentedString(cmisColonObjectTypeId)).append("\n");
  sb.append("    cmisColonCreatedBy: ").append(toIndentedString(cmisColonCreatedBy)).append("\n");
  sb.append("    cmisColonLastModifiedBy: ").append(toIndentedString(cmisColonLastModifiedBy)).append("\n");
  sb.append("    bbColonTitle: ").append(toIndentedString(bbColonTitle)).append("\n");
  sb.append("    bbColonLocale: ").append(toIndentedString(bbColonLocale)).append("\n");
  sb.append("    changeToken: ").append(toIndentedString(changeToken)).append("\n");
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
