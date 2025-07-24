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
import org.openapitools.jackson.nullable.JsonNullable;
import java.time.OffsetDateTime;
import javax.validation.Valid;
import javax.validation.constraints.*;
import io.swagger.v3.oas.annotations.media.Schema;


import java.util.*;
import javax.annotation.Generated;

/**
* StatusMessage
*/

@Generated(value = "com.backbase.oss.codegen.java.BoatSpringCodeGen")
public class StatusMessage {

    @NotNull
    @Valid
    @NotNull
    
    private String message;

    /**
    * Default constructor
    * @deprecated Use {@link StatusMessage#StatusMessage(String)}
    */
    @Deprecated
    public StatusMessage() {
    super();
    }

    /**
    * Constructor with only required parameters
    */
    public StatusMessage(String message) {
          this.message = message;
    }

  public StatusMessage message(String message) {
    this.message = message;
  return this;
  }

  /**
    * Get message
  * @return message
  */
    @NotNull 
    @Schema(name = "message", example = "Can not process request", requiredMode = Schema.RequiredMode.REQUIRED)
    @JsonProperty("message")
  public String getMessage() {
  return message;
  }

  public void setMessage(String message) {
  this.message = message;
  }

  @Override
  public boolean equals(Object o) {
  if (this == o) {
  return true;
  }
  if (o == null || getClass() != o.getClass()) {
  return false;
  }
    StatusMessage statusMessage = (StatusMessage) o;
    return Objects.equals(this.message, statusMessage.message);
  }

    @Override
    public int hashCode() {
    return Objects.hash(message);
    }

    @Override
    public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class StatusMessage {\n");
  sb.append("    message: ").append(toIndentedString(message)).append("\n");
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
