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
* Two ways direction relationship between Documents
*/

    @Schema(name = "document-relationship", description = "Two ways direction relationship between Documents")
      @JsonTypeName("document-relationship")
@Generated(value = "com.backbase.oss.codegen.java.BoatSpringCodeGen")
public class DocumentRelationship {

    @Valid
    
    private String id;

    @Valid
    
    private String from;

    @Valid
    
    private String to;

    @Valid
    
    private String toRepositoryId;

  public DocumentRelationship id(String id) {
    this.id = id;
  return this;
  }

  /**
    * Relationship id.
  * @return id
  */
    
    @Schema(name = "id", description = "Relationship id.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("id")
  public String getId() {
  return id;
  }

  public void setId(String id) {
  this.id = id;
  }

  public DocumentRelationship from(String from) {
    this.from = from;
  return this;
  }

  /**
    * ID of the source Document.
  * @return from
  */
    
    @Schema(name = "from", description = "ID of the source Document.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("from")
  public String getFrom() {
  return from;
  }

  public void setFrom(String from) {
  this.from = from;
  }

  public DocumentRelationship to(String to) {
    this.to = to;
  return this;
  }

  /**
    * ID of the target Document.
  * @return to
  */
    
    @Schema(name = "to", description = "ID of the target Document.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("to")
  public String getTo() {
  return to;
  }

  public void setTo(String to) {
  this.to = to;
  }

  public DocumentRelationship toRepositoryId(String toRepositoryId) {
    this.toRepositoryId = toRepositoryId;
  return this;
  }

  /**
    * ID of the target Repository.
  * @return toRepositoryId
  */
    
    @Schema(name = "toRepositoryId", description = "ID of the target Repository.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("toRepositoryId")
  public String getToRepositoryId() {
  return toRepositoryId;
  }

  public void setToRepositoryId(String toRepositoryId) {
  this.toRepositoryId = toRepositoryId;
  }

  @Override
  public boolean equals(Object o) {
  if (this == o) {
  return true;
  }
  if (o == null || getClass() != o.getClass()) {
  return false;
  }
    DocumentRelationship documentRelationship = (DocumentRelationship) o;
    return Objects.equals(this.id, documentRelationship.id) &&
    Objects.equals(this.from, documentRelationship.from) &&
    Objects.equals(this.to, documentRelationship.to) &&
    Objects.equals(this.toRepositoryId, documentRelationship.toRepositoryId);
  }

    @Override
    public int hashCode() {
    return Objects.hash(id, from, to, toRepositoryId);
    }

    @Override
    public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class DocumentRelationship {\n");
  sb.append("    id: ").append(toIndentedString(id)).append("\n");
  sb.append("    from: ").append(toIndentedString(from)).append("\n");
  sb.append("    to: ").append(toIndentedString(to)).append("\n");
  sb.append("    toRepositoryId: ").append(toIndentedString(toRepositoryId)).append("\n");
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
