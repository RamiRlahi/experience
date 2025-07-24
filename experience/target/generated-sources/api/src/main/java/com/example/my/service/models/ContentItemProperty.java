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
* ContentItemProperty
*/

      @JsonTypeName("content-item-property")
@Generated(value = "com.backbase.oss.codegen.java.BoatSpringCodeGen")
public class ContentItemProperty {

    @NotNull
    @Valid
    @NotNull
    
    private String propertyId;

    @NotNull
    @Valid
    @NotNull
    
    private String value;

    @NotNull
    @Valid
    @NotNull
    
    private String propertyType;

    /**
    * Default constructor
    * @deprecated Use {@link ContentItemProperty#ContentItemProperty(String, String, String)}
    */
    @Deprecated
    public ContentItemProperty() {
    super();
    }

    /**
    * Constructor with only required parameters
    */
    public ContentItemProperty(String propertyId, String value, String propertyType) {
          this.propertyId = propertyId;
          this.value = value;
          this.propertyType = propertyType;
    }

  public ContentItemProperty propertyId(String propertyId) {
    this.propertyId = propertyId;
  return this;
  }

  /**
    * Property Id.
  * @return propertyId
  */
    @NotNull 
    @Schema(name = "propertyId", description = "Property Id.", requiredMode = Schema.RequiredMode.REQUIRED)
    @JsonProperty("propertyId")
  public String getPropertyId() {
  return propertyId;
  }

  public void setPropertyId(String propertyId) {
  this.propertyId = propertyId;
  }

  public ContentItemProperty value(String value) {
    this.value = value;
  return this;
  }

  /**
    * Property value.
  * @return value
  */
    @NotNull 
    @Schema(name = "value", description = "Property value.", requiredMode = Schema.RequiredMode.REQUIRED)
    @JsonProperty("value")
  public String getValue() {
  return value;
  }

  public void setValue(String value) {
  this.value = value;
  }

  public ContentItemProperty propertyType(String propertyType) {
    this.propertyType = propertyType;
  return this;
  }

  /**
    * Type of property.
  * @return propertyType
  */
    @NotNull 
    @Schema(name = "propertyType", description = "Type of property.", requiredMode = Schema.RequiredMode.REQUIRED)
    @JsonProperty("propertyType")
  public String getPropertyType() {
  return propertyType;
  }

  public void setPropertyType(String propertyType) {
  this.propertyType = propertyType;
  }

  @Override
  public boolean equals(Object o) {
  if (this == o) {
  return true;
  }
  if (o == null || getClass() != o.getClass()) {
  return false;
  }
    ContentItemProperty contentItemProperty = (ContentItemProperty) o;
    return Objects.equals(this.propertyId, contentItemProperty.propertyId) &&
    Objects.equals(this.value, contentItemProperty.value) &&
    Objects.equals(this.propertyType, contentItemProperty.propertyType);
  }

    @Override
    public int hashCode() {
    return Objects.hash(propertyId, value, propertyType);
    }

    @Override
    public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ContentItemProperty {\n");
  sb.append("    propertyId: ").append(toIndentedString(propertyId)).append("\n");
  sb.append("    value: ").append(toIndentedString(value)).append("\n");
  sb.append("    propertyType: ").append(toIndentedString(propertyType)).append("\n");
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
