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
import com.example.my.service.models.DuplicatedItem;
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
* Response payload with duplicated documents information.
*/

    @Schema(name = "duplicate-response", description = "Response payload with duplicated documents information.")
      @JsonTypeName("duplicate-response")
@Generated(value = "com.backbase.oss.codegen.java.BoatSpringCodeGen")
public class DuplicateResponse {

    @Valid
    @NotNull
    
    private Set<@Valid DuplicatedItem> contents = new LinkedHashSet<>();

    /**
    * Default constructor
    * @deprecated Use {@link DuplicateResponse#DuplicateResponse(Set<@Valid DuplicatedItem>)}
    */
    @Deprecated
    public DuplicateResponse() {
    super();
    }

    /**
    * Constructor with only required parameters
    */
    public DuplicateResponse(Set<@Valid DuplicatedItem> contents) {
          this.contents = contents;
    }

  public DuplicateResponse contents(Set<@Valid DuplicatedItem> contents) {
    this.contents = contents;
  return this;
  }

    public DuplicateResponse addContentsItem(DuplicatedItem contentsItem) {
      if (this.contents == null) {
      this.contents = new LinkedHashSet<>();
      }
      this.contents.add(contentsItem);
    return this;
    }

  /**
    * All duplicated documents under request.
  * @return contents
  */
    @NotNull @Valid 
    @Schema(name = "contents", description = "All duplicated documents under request.", requiredMode = Schema.RequiredMode.REQUIRED)
    @JsonProperty("contents")
  public Set<@Valid DuplicatedItem> getContents() {
  return contents;
  }

    @JsonDeserialize(as = LinkedHashSet.class)
  public void setContents(Set<@Valid DuplicatedItem> contents) {
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
    DuplicateResponse duplicateResponse = (DuplicateResponse) o;
    return Objects.equals(this.contents, duplicateResponse.contents);
  }

    @Override
    public int hashCode() {
    return Objects.hash(contents);
    }

    @Override
    public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class DuplicateResponse {\n");
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
