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
* Retention Policy type.
*/

    @Schema(name = "retention-policy", description = "Retention Policy type.")
      @JsonTypeName("retention-policy")
@Generated(value = "com.backbase.oss.codegen.java.BoatSpringCodeGen")
public class RetentionPolicy {

    @Valid
    
    private String id;

    @NotNull
    @Valid
    @NotNull
    
    private String name;

    @NotNull
    @Valid
    @NotNull
    
    private String pattern;

    @NotNull
    @Valid
    @NotNull
    
    private String description;

    @NotNull
    @Valid
    @NotNull
    
    private String timeToLive;

    /**
    * Default constructor
    * @deprecated Use {@link RetentionPolicy#RetentionPolicy(String, String, String, String)}
    */
    @Deprecated
    public RetentionPolicy() {
    super();
    }

    /**
    * Constructor with only required parameters
    */
    public RetentionPolicy(String name, String pattern, String description, String timeToLive) {
          this.name = name;
          this.pattern = pattern;
          this.description = description;
          this.timeToLive = timeToLive;
    }

  public RetentionPolicy id(String id) {
    this.id = id;
  return this;
  }

  /**
    * Retention policy unique Identifier
  * @return id
  */
    
    @Schema(name = "id", description = "Retention policy unique Identifier", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("id")
  public String getId() {
  return id;
  }

  public void setId(String id) {
  this.id = id;
  }

  public RetentionPolicy name(String name) {
    this.name = name;
  return this;
  }

  /**
    * Retention policy unique name
  * @return name
  */
    @NotNull 
    @Schema(name = "name", description = "Retention policy unique name", requiredMode = Schema.RequiredMode.REQUIRED)
    @JsonProperty("name")
  public String getName() {
  return name;
  }

  public void setName(String name) {
  this.name = name;
  }

  public RetentionPolicy pattern(String pattern) {
    this.pattern = pattern;
  return this;
  }

  /**
    * Ant Pattern of files to match
  * @return pattern
  */
    @NotNull 
    @Schema(name = "pattern", description = "Ant Pattern of files to match", requiredMode = Schema.RequiredMode.REQUIRED)
    @JsonProperty("pattern")
  public String getPattern() {
  return pattern;
  }

  public void setPattern(String pattern) {
  this.pattern = pattern;
  }

  public RetentionPolicy description(String description) {
    this.description = description;
  return this;
  }

  /**
    * Retention policy description.
  * @return description
  */
    @NotNull 
    @Schema(name = "description", description = "Retention policy description.", requiredMode = Schema.RequiredMode.REQUIRED)
    @JsonProperty("description")
  public String getDescription() {
  return description;
  }

  public void setDescription(String description) {
  this.description = description;
  }

  public RetentionPolicy timeToLive(String timeToLive) {
    this.timeToLive = timeToLive;
  return this;
  }

  /**
    * Specifies the time to live of the files that match the specified pattern in the repository expressed in the following format: 2y 7m 15d/14m/1y 50d/etc. The duration value cannot be less than 1 day
  * @return timeToLive
  */
    @NotNull 
    @Schema(name = "timeToLive", description = "Specifies the time to live of the files that match the specified pattern in the repository expressed in the following format: 2y 7m 15d/14m/1y 50d/etc. The duration value cannot be less than 1 day", requiredMode = Schema.RequiredMode.REQUIRED)
    @JsonProperty("timeToLive")
  public String getTimeToLive() {
  return timeToLive;
  }

  public void setTimeToLive(String timeToLive) {
  this.timeToLive = timeToLive;
  }

  @Override
  public boolean equals(Object o) {
  if (this == o) {
  return true;
  }
  if (o == null || getClass() != o.getClass()) {
  return false;
  }
    RetentionPolicy retentionPolicy = (RetentionPolicy) o;
    return Objects.equals(this.id, retentionPolicy.id) &&
    Objects.equals(this.name, retentionPolicy.name) &&
    Objects.equals(this.pattern, retentionPolicy.pattern) &&
    Objects.equals(this.description, retentionPolicy.description) &&
    Objects.equals(this.timeToLive, retentionPolicy.timeToLive);
  }

    @Override
    public int hashCode() {
    return Objects.hash(id, name, pattern, description, timeToLive);
    }

    @Override
    public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class RetentionPolicy {\n");
  sb.append("    id: ").append(toIndentedString(id)).append("\n");
  sb.append("    name: ").append(toIndentedString(name)).append("\n");
  sb.append("    pattern: ").append(toIndentedString(pattern)).append("\n");
  sb.append("    description: ").append(toIndentedString(description)).append("\n");
  sb.append("    timeToLive: ").append(toIndentedString(timeToLive)).append("\n");
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
