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
* DocumentToMove
*/

      @JsonTypeName("document-to-move")
@Generated(value = "com.backbase.oss.codegen.java.BoatSpringCodeGen")
public class DocumentToMove {

    @NotNull
    @Valid
    @NotNull
    
    private String id;

    @NotNull
    @Valid
    @NotNull
    
    private String path;

    @NotNull
    @Valid
    @NotNull
    
    private String repositoryId;

    /**
    * Default constructor
    * @deprecated Use {@link DocumentToMove#DocumentToMove(String, String, String)}
    */
    @Deprecated
    public DocumentToMove() {
    super();
    }

    /**
    * Constructor with only required parameters
    */
    public DocumentToMove(String id, String path, String repositoryId) {
          this.id = id;
          this.path = path;
          this.repositoryId = repositoryId;
    }

  public DocumentToMove id(String id) {
    this.id = id;
  return this;
  }

  /**
    * ID of the existing document to move.
  * @return id
  */
    @NotNull 
    @Schema(name = "id", description = "ID of the existing document to move.", requiredMode = Schema.RequiredMode.REQUIRED)
    @JsonProperty("id")
  public String getId() {
  return id;
  }

  public void setId(String id) {
  this.id = id;
  }

  public DocumentToMove path(String path) {
    this.path = path;
  return this;
  }

  /**
    * New path where to move the document.
  * @return path
  */
    @NotNull 
    @Schema(name = "path", description = "New path where to move the document.", requiredMode = Schema.RequiredMode.REQUIRED)
    @JsonProperty("path")
  public String getPath() {
  return path;
  }

  public void setPath(String path) {
  this.path = path;
  }

  public DocumentToMove repositoryId(String repositoryId) {
    this.repositoryId = repositoryId;
  return this;
  }

  /**
    * Repository ID to which the document belongs.
  * @return repositoryId
  */
    @NotNull 
    @Schema(name = "repositoryId", description = "Repository ID to which the document belongs.", requiredMode = Schema.RequiredMode.REQUIRED)
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
    DocumentToMove documentToMove = (DocumentToMove) o;
    return Objects.equals(this.id, documentToMove.id) &&
    Objects.equals(this.path, documentToMove.path) &&
    Objects.equals(this.repositoryId, documentToMove.repositoryId);
  }

    @Override
    public int hashCode() {
    return Objects.hash(id, path, repositoryId);
    }

    @Override
    public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class DocumentToMove {\n");
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
