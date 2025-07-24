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
* Schema to revert to a specific version of the Document
*/

    @Schema(name = "item-to-revert", description = "Schema to revert to a specific version of the Document")
      @JsonTypeName("item-to-revert")
@Generated(value = "com.backbase.oss.codegen.java.BoatSpringCodeGen")
public class ItemToRevert {

    @NotNull
    @Valid
    @NotNull
    
    private String repositoryId;

    @NotNull
    @Valid
    @NotNull
    
    private String id;

    @NotNull
    @Valid
    @NotNull
    
    private String version;

    /**
    * Default constructor
    * @deprecated Use {@link ItemToRevert#ItemToRevert(String, String, String)}
    */
    @Deprecated
    public ItemToRevert() {
    super();
    }

    /**
    * Constructor with only required parameters
    */
    public ItemToRevert(String repositoryId, String id, String version) {
          this.repositoryId = repositoryId;
          this.id = id;
          this.version = version;
    }

  public ItemToRevert repositoryId(String repositoryId) {
    this.repositoryId = repositoryId;
  return this;
  }

  /**
    * Repository ID to revert version of documents from.
  * @return repositoryId
  */
    @NotNull 
    @Schema(name = "repositoryId", description = "Repository ID to revert version of documents from.", requiredMode = Schema.RequiredMode.REQUIRED)
    @JsonProperty("repositoryId")
  public String getRepositoryId() {
  return repositoryId;
  }

  public void setRepositoryId(String repositoryId) {
  this.repositoryId = repositoryId;
  }

  public ItemToRevert id(String id) {
    this.id = id;
  return this;
  }

  /**
    * Document ID to revert.
  * @return id
  */
    @NotNull 
    @Schema(name = "id", description = "Document ID to revert.", requiredMode = Schema.RequiredMode.REQUIRED)
    @JsonProperty("id")
  public String getId() {
  return id;
  }

  public void setId(String id) {
  this.id = id;
  }

  public ItemToRevert version(String version) {
    this.version = version;
  return this;
  }

  /**
    * Version label to revert to.
  * @return version
  */
    @NotNull 
    @Schema(name = "version", description = "Version label to revert to.", requiredMode = Schema.RequiredMode.REQUIRED)
    @JsonProperty("version")
  public String getVersion() {
  return version;
  }

  public void setVersion(String version) {
  this.version = version;
  }

  @Override
  public boolean equals(Object o) {
  if (this == o) {
  return true;
  }
  if (o == null || getClass() != o.getClass()) {
  return false;
  }
    ItemToRevert itemToRevert = (ItemToRevert) o;
    return Objects.equals(this.repositoryId, itemToRevert.repositoryId) &&
    Objects.equals(this.id, itemToRevert.id) &&
    Objects.equals(this.version, itemToRevert.version);
  }

    @Override
    public int hashCode() {
    return Objects.hash(repositoryId, id, version);
    }

    @Override
    public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ItemToRevert {\n");
  sb.append("    repositoryId: ").append(toIndentedString(repositoryId)).append("\n");
  sb.append("    id: ").append(toIndentedString(id)).append("\n");
  sb.append("    version: ").append(toIndentedString(version)).append("\n");
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
