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
* Object containing signed url information for document.
*/

    @Schema(name = "document-signed-url-response", description = "Object containing signed url information for document.")
      @JsonTypeName("document-signed-url-response")
@Generated(value = "com.backbase.oss.codegen.java.BoatSpringCodeGen")
public class DocumentSignedUrlResponse {

    @Valid
    
    private String url;

    @Valid
    
    private String ttl;

  public DocumentSignedUrlResponse url(String url) {
    this.url = url;
  return this;
  }

  /**
    * Signed URL.
  * @return url
  */
    
    @Schema(name = "url", description = "Signed URL.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("url")
  public String getUrl() {
  return url;
  }

  public void setUrl(String url) {
  this.url = url;
  }

  public DocumentSignedUrlResponse ttl(String ttl) {
    this.ttl = ttl;
  return this;
  }

  /**
    * Time to live for signed URL.
  * @return ttl
  */
    
    @Schema(name = "ttl", description = "Time to live for signed URL.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("ttl")
  public String getTtl() {
  return ttl;
  }

  public void setTtl(String ttl) {
  this.ttl = ttl;
  }

  @Override
  public boolean equals(Object o) {
  if (this == o) {
  return true;
  }
  if (o == null || getClass() != o.getClass()) {
  return false;
  }
    DocumentSignedUrlResponse documentSignedUrlResponse = (DocumentSignedUrlResponse) o;
    return Objects.equals(this.url, documentSignedUrlResponse.url) &&
    Objects.equals(this.ttl, documentSignedUrlResponse.ttl);
  }

    @Override
    public int hashCode() {
    return Objects.hash(url, ttl);
    }

    @Override
    public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class DocumentSignedUrlResponse {\n");
  sb.append("    url: ").append(toIndentedString(url)).append("\n");
  sb.append("    ttl: ").append(toIndentedString(ttl)).append("\n");
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
