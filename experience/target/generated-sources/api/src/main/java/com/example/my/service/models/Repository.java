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
import com.example.my.service.models.AntivirusScanTrigger;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonTypeName;
import com.fasterxml.jackson.annotation.JsonValue;
import org.openapitools.jackson.nullable.JsonNullable;
import java.time.OffsetDateTime;
import javax.validation.Valid;
import javax.validation.constraints.*;
import io.swagger.v3.oas.annotations.media.Schema;


import java.util.*;
import javax.annotation.Generated;

/**
* CMIS Repository type
*/

    @Schema(name = "repository", description = "CMIS Repository type")
      @JsonTypeName("repository")
@Generated(value = "com.backbase.oss.codegen.java.BoatSpringCodeGen")
public class Repository {

    @NotNull
    @Valid
    @NotNull
    
    private String repositoryId;

    @NotNull
    @Valid
    @NotNull
    
    private String name;

    @NotNull
    @Valid
    @NotNull
    
    private String description;

    @Valid
    
    private Boolean isPrivate = false;

    @Valid
    
    private Boolean isProtected = false;

    @Valid
    
    private String implementation;

    @Valid
    
    private Boolean versioningEnabled = true;

    @Valid
    
    private String configData;

    @Valid
    
    private AntivirusScanTrigger antivirusScanTrigger = AntivirusScanTrigger.NONE;

    /**
    * Default constructor
    * @deprecated Use {@link Repository#Repository(String, String, String)}
    */
    @Deprecated
    public Repository() {
    super();
    }

    /**
    * Constructor with only required parameters
    */
    public Repository(String repositoryId, String name, String description) {
          this.repositoryId = repositoryId;
          this.name = name;
          this.description = description;
    }

  public Repository repositoryId(String repositoryId) {
    this.repositoryId = repositoryId;
  return this;
  }

  /**
    * Repository id.
  * @return repositoryId
  */
    @NotNull 
    @Schema(name = "repositoryId", description = "Repository id.", requiredMode = Schema.RequiredMode.REQUIRED)
    @JsonProperty("repositoryId")
  public String getRepositoryId() {
  return repositoryId;
  }

  public void setRepositoryId(String repositoryId) {
  this.repositoryId = repositoryId;
  }

  public Repository name(String name) {
    this.name = name;
  return this;
  }

  /**
    * Repository name.
  * @return name
  */
    @NotNull 
    @Schema(name = "name", description = "Repository name.", requiredMode = Schema.RequiredMode.REQUIRED)
    @JsonProperty("name")
  public String getName() {
  return name;
  }

  public void setName(String name) {
  this.name = name;
  }

  public Repository description(String description) {
    this.description = description;
  return this;
  }

  /**
    * Repository description.
  * @return description
  */
    @NotNull 
    @Schema(name = "description", description = "Repository description.", requiredMode = Schema.RequiredMode.REQUIRED)
    @JsonProperty("description")
  public String getDescription() {
  return description;
  }

  public void setDescription(String description) {
  this.description = description;
  }

  public Repository isPrivate(Boolean isPrivate) {
    this.isPrivate = isPrivate;
  return this;
  }

  /**
    * Whether or not the repository is marked as private within Content Services
  * @return isPrivate
  */
    
    @Schema(name = "isPrivate", description = "Whether or not the repository is marked as private within Content Services", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("isPrivate")
  public Boolean getIsPrivate() {
  return isPrivate;
  }

  public void setIsPrivate(Boolean isPrivate) {
  this.isPrivate = isPrivate;
  }

  public Repository isProtected(Boolean isProtected) {
    this.isProtected = isProtected;
  return this;
  }

  /**
    * Whether or not the repository is marked as protected with Access Control
  * @return isProtected
  */
    
    @Schema(name = "isProtected", description = "Whether or not the repository is marked as protected with Access Control", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("isProtected")
  public Boolean getIsProtected() {
  return isProtected;
  }

  public void setIsProtected(Boolean isProtected) {
  this.isProtected = isProtected;
  }

  public Repository implementation(String implementation) {
    this.implementation = implementation;
  return this;
  }

  /**
    * Storage implementation name
  * @return implementation
  */
    
    @Schema(name = "implementation", description = "Storage implementation name", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("implementation")
  public String getImplementation() {
  return implementation;
  }

  public void setImplementation(String implementation) {
  this.implementation = implementation;
  }

  public Repository versioningEnabled(Boolean versioningEnabled) {
    this.versioningEnabled = versioningEnabled;
  return this;
  }

  /**
    * Flag that indicates whether repository versioned
  * @return versioningEnabled
  */
    
    @Schema(name = "versioningEnabled", description = "Flag that indicates whether repository versioned", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("versioningEnabled")
  public Boolean getVersioningEnabled() {
  return versioningEnabled;
  }

  public void setVersioningEnabled(Boolean versioningEnabled) {
  this.versioningEnabled = versioningEnabled;
  }

  public Repository configData(String configData) {
    this.configData = configData;
  return this;
  }

  /**
    * configuration data
  * @return configData
  */
    
    @Schema(name = "configData", description = "configuration data", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("configData")
  public String getConfigData() {
  return configData;
  }

  public void setConfigData(String configData) {
  this.configData = configData;
  }

  public Repository antivirusScanTrigger(AntivirusScanTrigger antivirusScanTrigger) {
    this.antivirusScanTrigger = antivirusScanTrigger;
  return this;
  }

  /**
    * Get antivirusScanTrigger
  * @return antivirusScanTrigger
  */
    @Valid 
    @Schema(name = "antivirusScanTrigger", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("antivirusScanTrigger")
  public AntivirusScanTrigger getAntivirusScanTrigger() {
  return antivirusScanTrigger;
  }

  public void setAntivirusScanTrigger(AntivirusScanTrigger antivirusScanTrigger) {
  this.antivirusScanTrigger = antivirusScanTrigger;
  }

  @Override
  public boolean equals(Object o) {
  if (this == o) {
  return true;
  }
  if (o == null || getClass() != o.getClass()) {
  return false;
  }
    Repository repository = (Repository) o;
    return Objects.equals(this.repositoryId, repository.repositoryId) &&
    Objects.equals(this.name, repository.name) &&
    Objects.equals(this.description, repository.description) &&
    Objects.equals(this.isPrivate, repository.isPrivate) &&
    Objects.equals(this.isProtected, repository.isProtected) &&
    Objects.equals(this.implementation, repository.implementation) &&
    Objects.equals(this.versioningEnabled, repository.versioningEnabled) &&
    Objects.equals(this.configData, repository.configData) &&
    Objects.equals(this.antivirusScanTrigger, repository.antivirusScanTrigger);
  }

    @Override
    public int hashCode() {
    return Objects.hash(repositoryId, name, description, isPrivate, isProtected, implementation, versioningEnabled, configData, antivirusScanTrigger);
    }

    @Override
    public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Repository {\n");
  sb.append("    repositoryId: ").append(toIndentedString(repositoryId)).append("\n");
  sb.append("    name: ").append(toIndentedString(name)).append("\n");
  sb.append("    description: ").append(toIndentedString(description)).append("\n");
  sb.append("    isPrivate: ").append(toIndentedString(isPrivate)).append("\n");
  sb.append("    isProtected: ").append(toIndentedString(isProtected)).append("\n");
  sb.append("    implementation: ").append(toIndentedString(implementation)).append("\n");
  sb.append("    versioningEnabled: ").append(toIndentedString(versioningEnabled)).append("\n");
  sb.append("    configData: ").append(toIndentedString(configData)).append("\n");
  sb.append("    antivirusScanTrigger: ").append(toIndentedString(antivirusScanTrigger)).append("\n");
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
