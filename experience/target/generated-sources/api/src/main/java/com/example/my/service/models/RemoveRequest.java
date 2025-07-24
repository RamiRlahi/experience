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
* Payload schema to delete documents from a specific repository.
*/

    @Schema(name = "remove-request", description = "Payload schema to delete documents from a specific repository.")
      @JsonTypeName("remove-request")
@Generated(value = "com.backbase.oss.codegen.java.BoatSpringCodeGen")
public class RemoveRequest {

    @NotNull
    @Valid
    @NotNull
    
    private String repositoryId;

    @Valid
    @NotNull
    @Size(min = 1)
    private Set<String> ids = new LinkedHashSet<>();

    /**
    * Default constructor
    * @deprecated Use {@link RemoveRequest#RemoveRequest(String, Set<String>)}
    */
    @Deprecated
    public RemoveRequest() {
    super();
    }

    /**
    * Constructor with only required parameters
    */
    public RemoveRequest(String repositoryId, Set<String> ids) {
          this.repositoryId = repositoryId;
          this.ids = ids;
    }

  public RemoveRequest repositoryId(String repositoryId) {
    this.repositoryId = repositoryId;
  return this;
  }

  /**
    * Repository ID to delete documents from.
  * @return repositoryId
  */
    @NotNull 
    @Schema(name = "repositoryId", description = "Repository ID to delete documents from.", requiredMode = Schema.RequiredMode.REQUIRED)
    @JsonProperty("repositoryId")
  public String getRepositoryId() {
  return repositoryId;
  }

  public void setRepositoryId(String repositoryId) {
  this.repositoryId = repositoryId;
  }

  public RemoveRequest ids(Set<String> ids) {
    this.ids = ids;
  return this;
  }

    public RemoveRequest addIdsItem(String idsItem) {
      if (this.ids == null) {
      this.ids = new LinkedHashSet<>();
      }
      this.ids.add(idsItem);
    return this;
    }

  /**
    * Get ids
  * @return ids
  */
    @NotNull @Size(min = 1) 
    @Schema(name = "ids", requiredMode = Schema.RequiredMode.REQUIRED)
    @JsonProperty("ids")
  public Set<String> getIds() {
  return ids;
  }

    @JsonDeserialize(as = LinkedHashSet.class)
  public void setIds(Set<String> ids) {
  this.ids = ids;
  }

  @Override
  public boolean equals(Object o) {
  if (this == o) {
  return true;
  }
  if (o == null || getClass() != o.getClass()) {
  return false;
  }
    RemoveRequest removeRequest = (RemoveRequest) o;
    return Objects.equals(this.repositoryId, removeRequest.repositoryId) &&
    Objects.equals(this.ids, removeRequest.ids);
  }

    @Override
    public int hashCode() {
    return Objects.hash(repositoryId, ids);
    }

    @Override
    public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class RemoveRequest {\n");
  sb.append("    repositoryId: ").append(toIndentedString(repositoryId)).append("\n");
  sb.append("    ids: ").append(toIndentedString(ids)).append("\n");
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
