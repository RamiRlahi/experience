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
import com.example.my.service.models.ItemToDuplicate;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonTypeName;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import java.util.LinkedHashSet;
import java.util.Set;
import org.openapitools.jackson.nullable.JsonNullable;
import java.time.OffsetDateTime;
import javax.validation.Valid;
import javax.validation.constraints.*;
import io.swagger.v3.oas.annotations.media.Schema;


import java.util.*;
import javax.annotation.Generated;

/**
* Payload schema to duplicate documents in a specific repository.
*/

    @Schema(name = "duplicate-request", description = "Payload schema to duplicate documents in a specific repository.")
      @JsonTypeName("duplicate-request")
@Generated(value = "com.backbase.oss.codegen.java.BoatSpringCodeGen")
public class DuplicateRequest {

    @NotNull
    @Valid
    @NotNull
    
    private String repositoryId;

    @Valid
    
    private String rootFolder;

    @Valid
    @NotNull
    
    private Set<@Valid ItemToDuplicate> contents = new LinkedHashSet<>();

    /**
    * Default constructor
    * @deprecated Use {@link DuplicateRequest#DuplicateRequest(String, Set<@Valid ItemToDuplicate>)}
    */
    @Deprecated
    public DuplicateRequest() {
    super();
    }

    /**
    * Constructor with only required parameters
    */
    public DuplicateRequest(String repositoryId, Set<@Valid ItemToDuplicate> contents) {
          this.repositoryId = repositoryId;
          this.contents = contents;
    }

  public DuplicateRequest repositoryId(String repositoryId) {
    this.repositoryId = repositoryId;
  return this;
  }

  /**
    * Repository ID to duplicate documents in.
  * @return repositoryId
  */
    @NotNull 
    @Schema(name = "repositoryId", description = "Repository ID to duplicate documents in.", requiredMode = Schema.RequiredMode.REQUIRED)
    @JsonProperty("repositoryId")
  public String getRepositoryId() {
  return repositoryId;
  }

  public void setRepositoryId(String repositoryId) {
  this.repositoryId = repositoryId;
  }

  public DuplicateRequest rootFolder(String rootFolder) {
    this.rootFolder = rootFolder;
  return this;
  }

  /**
    * Root folder in which original documents should be searched for. Default is /
  * @return rootFolder
  */
    
    @Schema(name = "rootFolder", description = "Root folder in which original documents should be searched for. Default is /", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("rootFolder")
  public String getRootFolder() {
  return rootFolder;
  }

  public void setRootFolder(String rootFolder) {
  this.rootFolder = rootFolder;
  }

  public DuplicateRequest contents(Set<@Valid ItemToDuplicate> contents) {
    this.contents = contents;
  return this;
  }

    public DuplicateRequest addContentsItem(ItemToDuplicate contentsItem) {
      if (this.contents == null) {
      this.contents = new LinkedHashSet<>();
      }
      this.contents.add(contentsItem);
    return this;
    }

  /**
    * All documents to duplicate in this request.
  * @return contents
  */
    @NotNull @Valid 
    @Schema(name = "contents", description = "All documents to duplicate in this request.", requiredMode = Schema.RequiredMode.REQUIRED)
    @JsonProperty("contents")
  public Set<@Valid ItemToDuplicate> getContents() {
  return contents;
  }

    @JsonDeserialize(as = LinkedHashSet.class)
  public void setContents(Set<@Valid ItemToDuplicate> contents) {
  this.contents = contents;
  }

  @Override
  public boolean equals(Object o) {
  if (this == o) {
  return true;
  }
  if (o == null || getClass() != o.getClass()) {
  return false;
  }
    DuplicateRequest duplicateRequest = (DuplicateRequest) o;
    return Objects.equals(this.repositoryId, duplicateRequest.repositoryId) &&
    Objects.equals(this.rootFolder, duplicateRequest.rootFolder) &&
    Objects.equals(this.contents, duplicateRequest.contents);
  }

    @Override
    public int hashCode() {
    return Objects.hash(repositoryId, rootFolder, contents);
    }

    @Override
    public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class DuplicateRequest {\n");
  sb.append("    repositoryId: ").append(toIndentedString(repositoryId)).append("\n");
  sb.append("    rootFolder: ").append(toIndentedString(rootFolder)).append("\n");
  sb.append("    contents: ").append(toIndentedString(contents)).append("\n");
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
