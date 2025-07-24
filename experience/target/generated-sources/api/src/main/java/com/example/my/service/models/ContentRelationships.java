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
import com.example.my.service.models.RelationshipTarget;
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
* Maps relationship source with targets
*/

    @Schema(name = "content-relationships", description = "Maps relationship source with targets")
      @JsonTypeName("content-relationships")
@Generated(value = "com.backbase.oss.codegen.java.BoatSpringCodeGen")
public class ContentRelationships {

    @NotNull
    @Valid
    @NotNull
    
    private String sourceId;

    @Valid
    @NotNull
    
    private Set<@Valid RelationshipTarget> referencedContentIds = new LinkedHashSet<>();

    /**
    * Default constructor
    * @deprecated Use {@link ContentRelationships#ContentRelationships(String, Set<@Valid RelationshipTarget>)}
    */
    @Deprecated
    public ContentRelationships() {
    super();
    }

    /**
    * Constructor with only required parameters
    */
    public ContentRelationships(String sourceId, Set<@Valid RelationshipTarget> referencedContentIds) {
          this.sourceId = sourceId;
          this.referencedContentIds = referencedContentIds;
    }

  public ContentRelationships sourceId(String sourceId) {
    this.sourceId = sourceId;
  return this;
  }

  /**
    * Identifier of the source object
  * @return sourceId
  */
    @NotNull 
    @Schema(name = "sourceId", description = "Identifier of the source object", requiredMode = Schema.RequiredMode.REQUIRED)
    @JsonProperty("sourceId")
  public String getSourceId() {
  return sourceId;
  }

  public void setSourceId(String sourceId) {
  this.sourceId = sourceId;
  }

  public ContentRelationships referencedContentIds(Set<@Valid RelationshipTarget> referencedContentIds) {
    this.referencedContentIds = referencedContentIds;
  return this;
  }

    public ContentRelationships addReferencedContentIdsItem(RelationshipTarget referencedContentIdsItem) {
      if (this.referencedContentIds == null) {
      this.referencedContentIds = new LinkedHashSet<>();
      }
      this.referencedContentIds.add(referencedContentIdsItem);
    return this;
    }

  /**
    * List of content relationships for these object
  * @return referencedContentIds
  */
    @NotNull @Valid 
    @Schema(name = "referencedContentIds", description = "List of content relationships for these object", requiredMode = Schema.RequiredMode.REQUIRED)
    @JsonProperty("referencedContentIds")
  public Set<@Valid RelationshipTarget> getReferencedContentIds() {
  return referencedContentIds;
  }

    @JsonDeserialize(as = LinkedHashSet.class)
  public void setReferencedContentIds(Set<@Valid RelationshipTarget> referencedContentIds) {
  this.referencedContentIds = referencedContentIds;
  }

  @Override
  public boolean equals(Object o) {
  if (this == o) {
  return true;
  }
  if (o == null || getClass() != o.getClass()) {
  return false;
  }
    ContentRelationships contentRelationships = (ContentRelationships) o;
    return Objects.equals(this.sourceId, contentRelationships.sourceId) &&
    Objects.equals(this.referencedContentIds, contentRelationships.referencedContentIds);
  }

    @Override
    public int hashCode() {
    return Objects.hash(sourceId, referencedContentIds);
    }

    @Override
    public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ContentRelationships {\n");
  sb.append("    sourceId: ").append(toIndentedString(sourceId)).append("\n");
  sb.append("    referencedContentIds: ").append(toIndentedString(referencedContentIds)).append("\n");
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
