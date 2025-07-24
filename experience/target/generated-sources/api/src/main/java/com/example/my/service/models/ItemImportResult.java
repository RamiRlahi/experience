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
import com.example.my.service.models.ImportedContentItem;
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
* ItemImportResult
*/

      @JsonTypeName("item-import-result")
@Generated(value = "com.backbase.oss.codegen.java.BoatSpringCodeGen")
public class ItemImportResult {

    @Valid
    
    private ImportedContentItem contentItem;

    @Valid
    
    private String exception;

    @Valid
    
    private String message;

  public ItemImportResult contentItem(ImportedContentItem contentItem) {
    this.contentItem = contentItem;
  return this;
  }

  /**
    * Get contentItem
  * @return contentItem
  */
    @Valid 
    @Schema(name = "contentItem", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("contentItem")
  public ImportedContentItem getContentItem() {
  return contentItem;
  }

  public void setContentItem(ImportedContentItem contentItem) {
  this.contentItem = contentItem;
  }

  public ItemImportResult exception(String exception) {
    this.exception = exception;
  return this;
  }

  /**
    * String reperesentation of the error happened during item import.
  * @return exception
  */
    
    @Schema(name = "exception", description = "String reperesentation of the error happened during item import.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("exception")
  public String getException() {
  return exception;
  }

  public void setException(String exception) {
  this.exception = exception;
  }

  public ItemImportResult message(String message) {
    this.message = message;
  return this;
  }

  /**
    * Failure message.
  * @return message
  */
    
    @Schema(name = "message", description = "Failure message.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("message")
  public String getMessage() {
  return message;
  }

  public void setMessage(String message) {
  this.message = message;
  }

  @Override
  public boolean equals(Object o) {
  if (this == o) {
  return true;
  }
  if (o == null || getClass() != o.getClass()) {
  return false;
  }
    ItemImportResult itemImportResult = (ItemImportResult) o;
    return Objects.equals(this.contentItem, itemImportResult.contentItem) &&
    Objects.equals(this.exception, itemImportResult.exception) &&
    Objects.equals(this.message, itemImportResult.message);
  }

    @Override
    public int hashCode() {
    return Objects.hash(contentItem, exception, message);
    }

    @Override
    public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ItemImportResult {\n");
  sb.append("    contentItem: ").append(toIndentedString(contentItem)).append("\n");
  sb.append("    exception: ").append(toIndentedString(exception)).append("\n");
  sb.append("    message: ").append(toIndentedString(message)).append("\n");
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
