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

    @Schema(name = "SignedUrlRequest", description = "Object containing signed url information for document.")
@Generated(value = "com.backbase.oss.codegen.java.BoatSpringCodeGen")
public class SignedUrlRequest {

    @Valid
    
    private String id;

    @Valid
    
    private String path;

    @NotNull
    @Valid
    @NotNull
    
    private String repositoryId;

    /**
    * Default constructor
    * @deprecated Use {@link SignedUrlRequest#SignedUrlRequest(String)}
    */
    @Deprecated
    public SignedUrlRequest() {
    super();
    }

    /**
    * Constructor with only required parameters
    */
    public SignedUrlRequest(String repositoryId) {
          this.repositoryId = repositoryId;
    }

  public SignedUrlRequest id(String id) {
    this.id = id;
  return this;
  }

  /**
    * ID of the existing document to create signed url.
  * @return id
  */
    
    @Schema(name = "id", description = "ID of the existing document to create signed url.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("id")
  public String getId() {
  return id;
  }

  public void setId(String id) {
  this.id = id;
  }

  public SignedUrlRequest path(String path) {
    this.path = path;
  return this;
  }

  /**
    * Path of the document to create signed url.
  * @return path
  */
    
    @Schema(name = "path", description = "Path of the document to create signed url.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("path")
  public String getPath() {
  return path;
  }

  public void setPath(String path) {
  this.path = path;
  }

  public SignedUrlRequest repositoryId(String repositoryId) {
    this.repositoryId = repositoryId;
  return this;
  }

  /**
    * Repository ID to which requested signed url document belongs.
  * @return repositoryId
  */
    @NotNull 
    @Schema(name = "repositoryId", description = "Repository ID to which requested signed url document belongs.", requiredMode = Schema.RequiredMode.REQUIRED)
    @JsonProperty("repositoryId")
  public String getRepositoryId() {
  return repositoryId;
  }

  public void setRepositoryId(String repositoryId) {
  this.repositoryId = repositoryId;
  }

  @Override
  public boolean equals(Object o) {
  if (this == o) {
  return true;
  }
  if (o == null || getClass() != o.getClass()) {
  return false;
  }
    SignedUrlRequest signedUrlRequest = (SignedUrlRequest) o;
    return Objects.equals(this.id, signedUrlRequest.id) &&
    Objects.equals(this.path, signedUrlRequest.path) &&
    Objects.equals(this.repositoryId, signedUrlRequest.repositoryId);
  }

    @Override
    public int hashCode() {
    return Objects.hash(id, path, repositoryId);
    }

    @Override
    public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class SignedUrlRequest {\n");
  sb.append("    id: ").append(toIndentedString(id)).append("\n");
  sb.append("    path: ").append(toIndentedString(path)).append("\n");
  sb.append("    repositoryId: ").append(toIndentedString(repositoryId)).append("\n");
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
