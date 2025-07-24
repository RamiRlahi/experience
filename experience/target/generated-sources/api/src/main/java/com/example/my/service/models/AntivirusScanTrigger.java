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
import com.fasterxml.jackson.annotation.JsonValue;
import org.openapitools.jackson.nullable.JsonNullable;
import java.time.OffsetDateTime;
import javax.validation.Valid;
import javax.validation.constraints.*;
import io.swagger.v3.oas.annotations.media.Schema;


import java.util.*;
import javax.annotation.Generated;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

/**
 * Trigger type that defines when the antivirus scan is run
 */

@Generated(value = "com.backbase.oss.codegen.java.BoatSpringCodeGen")
public enum AntivirusScanTrigger {
  
  NONE("NONE"),
  
  ON_SAVE("ON_SAVE"),
  
  ON_QUERY("ON_QUERY"),
  
  ON_SAVE_AND_QUERY("ON_SAVE_AND_QUERY");

  private final String value;

  AntivirusScanTrigger(String value) {
    this.value = value;
  }

  @JsonValue
  public String getValue() {
    return value;
  }

  @Override
  public String toString() {
    return String.valueOf(value);
  }

  @JsonCreator
  public static AntivirusScanTrigger fromValue(String value) {
    for (AntivirusScanTrigger b : AntivirusScanTrigger.values()) {
      if (b.value.equals(value)) {
        return b;
      }
    }
    throw new IllegalArgumentException("Unexpected value '" + value + "'");
  }
}
