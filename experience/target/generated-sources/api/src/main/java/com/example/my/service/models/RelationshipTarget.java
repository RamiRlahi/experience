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
* Points to the related content item.
*/

    @Schema(name = "relationship-target", description = "Points to the related content item.")
      @JsonTypeName("relationship-target")
@Generated(value = "com.backbase.oss.codegen.java.BoatSpringCodeGen")
public class RelationshipTarget {

    @NotNull
    @Valid
    @NotNull
    
    private String relationshipId;

    @NotNull
    @Valid
    @NotNull
    
    private String repositoryId;

    @NotNull
    @Valid
    @NotNull
    
    private String contentId;

    /**
    * Default constructor
    * @deprecated Use {@link RelationshipTarget#RelationshipTarget(String, String, String)}
    */
    @Deprecated
    public RelationshipTarget() {
    super();
    }

    /**
    * Constructor with only required parameters
    */
    public RelationshipTarget(String relationshipId, String repositoryId, String contentId) {
          this.relationshipId = relationshipId;
          this.repositoryId = repositoryId;
          this.contentId = contentId;
    }

  public RelationshipTarget relationshipId(String relationshipId) {
    this.relationshipId = relationshipId;
  return this;
  }

  /**
    * Relationship id.
  * @return relationshipId
  */
    @NotNull 
    @Schema(name = "relationshipId", description = "Relationship id.", requiredMode = Schema.RequiredMode.REQUIRED)
    @JsonProperty("relationshipId")
  public String getRelationshipId() {
  return relationshipId;
  }

  public void setRelationshipId(String relationshipId) {
  this.relationshipId = relationshipId;
  }

  public RelationshipTarget repositoryId(String repositoryId) {
    this.repositoryId = repositoryId;
  return this;
  }

  /**
    * Target repository id.
  * @return repositoryId
  */
    @NotNull 
    @Schema(name = "repositoryId", description = "Target repository id.", requiredMode = Schema.RequiredMode.REQUIRED)
    @JsonProperty("repositoryId")
  public String getRepositoryId() {
  return repositoryId;
  }

  public void setRepositoryId(String repositoryId) {
  this.repositoryId = repositoryId;
  }

  public RelationshipTarget contentId(String contentId) {
    this.contentId = contentId;
  return this;
  }

  /**
    * Target content item id.
  * @return contentId
  */
    @NotNull 
    @Schema(name = "contentId", description = "Target content item id.", requiredMode = Schema.RequiredMode.REQUIRED)
    @JsonProperty("contentId")
  public String getContentId() {
  return contentId;
  }

  public void setContentId(String contentId) {
  this.contentId = contentId;
  }

  @Override
  public boolean equals(Object o) {
  if (this == o) {
  return true;
  }
  if (o == null || getClass() != o.getClass()) {
  return false;
  }
    RelationshipTarget relationshipTarget = (RelationshipTarget) o;
    return Objects.equals(this.relationshipId, relationshipTarget.relationshipId) &&
    Objects.equals(this.repositoryId, relationshipTarget.repositoryId) &&
    Objects.equals(this.contentId, relationshipTarget.contentId);
  }

    @Override
    public int hashCode() {
    return Objects.hash(relationshipId, repositoryId, contentId);
    }

    @Override
    public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class RelationshipTarget {\n");
  sb.append("    relationshipId: ").append(toIndentedString(relationshipId)).append("\n");
  sb.append("    repositoryId: ").append(toIndentedString(repositoryId)).append("\n");
  sb.append("    contentId: ").append(toIndentedString(contentId)).append("\n");
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
