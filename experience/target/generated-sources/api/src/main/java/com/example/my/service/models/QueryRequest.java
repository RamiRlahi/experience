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
* Content Api provides querying and relationship resolving features as a replacement for CMIS
*/

    @Schema(name = "query-request", description = "Content Api provides querying and relationship resolving features as a replacement for CMIS")
      @JsonTypeName("query-request")
@Generated(value = "com.backbase.oss.codegen.java.BoatSpringCodeGen")
public class QueryRequest {

    @Valid
    
    private Set<String> ids = new LinkedHashSet<>();

    @Valid
    
    private Set<String> paths = new LinkedHashSet<>();

    @Valid
    
    private Set<String> repositories = new LinkedHashSet<>();

    @Valid
    
    private Set<String> loadContentForTypes = new LinkedHashSet<>();

    @Valid
    
    private Set<String> loadContentForMimeTypes = new LinkedHashSet<>();

    @Valid
    
    private Boolean loadTargetRelationships = false;

    @Valid
    
    private Boolean loadSourceRelationships = true;

    @Valid
    
    private Boolean loadRecursiveRelationships = true;

    @Valid
    
    private Boolean loadProperties = false;

    @Valid
    
    private Boolean inlineRelationshipsContent = true;

    @Valid
    
    private Boolean loadRenditions = false;

    @Valid
    
    private Boolean loadChildren = false;

    @Valid
    
    private Boolean loadVersions = false;

  public QueryRequest ids(Set<String> ids) {
    this.ids = ids;
  return this;
  }

    public QueryRequest addIdsItem(String idsItem) {
      if (this.ids == null) {
      this.ids = new LinkedHashSet<>();
      }
      this.ids.add(idsItem);
    return this;
    }

  /**
    * Content ids to be resolved
  * @return ids
  */
    
    @Schema(name = "ids", description = "Content ids to be resolved", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("ids")
  public Set<String> getIds() {
  return ids;
  }

    @JsonDeserialize(as = LinkedHashSet.class)
  public void setIds(Set<String> ids) {
  this.ids = ids;
  }

  public QueryRequest paths(Set<String> paths) {
    this.paths = paths;
  return this;
  }

    public QueryRequest addPathsItem(String pathsItem) {
      if (this.paths == null) {
      this.paths = new LinkedHashSet<>();
      }
      this.paths.add(pathsItem);
    return this;
    }

  /**
    * List of paths of content to be searched. Child folders can be omitted by adding '!' as prefix. For Ex: paths: ['/', '!/Generated content'] will fetch all children of '/ ' except '!/Generated content'
  * @return paths
  */
    
    @Schema(name = "paths", description = "List of paths of content to be searched. Child folders can be omitted by adding '!' as prefix. For Ex: paths: ['/', '!/Generated content'] will fetch all children of '/ ' except '!/Generated content'", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("paths")
  public Set<String> getPaths() {
  return paths;
  }

    @JsonDeserialize(as = LinkedHashSet.class)
  public void setPaths(Set<String> paths) {
  this.paths = paths;
  }

  public QueryRequest repositories(Set<String> repositories) {
    this.repositories = repositories;
  return this;
  }

    public QueryRequest addRepositoriesItem(String repositoriesItem) {
      if (this.repositories == null) {
      this.repositories = new LinkedHashSet<>();
      }
      this.repositories.add(repositoriesItem);
    return this;
    }

  /**
    * List of content repositories to limit the search to. Skipping this property or specifying multiple repositories is not recommended for performance reasons. Not specified repository is deprecated.
  * @return repositories
  */
    
    @Schema(name = "repositories", description = "List of content repositories to limit the search to. Skipping this property or specifying multiple repositories is not recommended for performance reasons. Not specified repository is deprecated.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("repositories")
  public Set<String> getRepositories() {
  return repositories;
  }

    @JsonDeserialize(as = LinkedHashSet.class)
  public void setRepositories(Set<String> repositories) {
  this.repositories = repositories;
  }

  public QueryRequest loadContentForTypes(Set<String> loadContentForTypes) {
    this.loadContentForTypes = loadContentForTypes;
  return this;
  }

    public QueryRequest addLoadContentForTypesItem(String loadContentForTypesItem) {
      if (this.loadContentForTypes == null) {
      this.loadContentForTypes = new LinkedHashSet<>();
      }
      this.loadContentForTypes.add(loadContentForTypesItem);
    return this;
    }

  /**
    * List of Cmis Types for which content should be loaded
  * @return loadContentForTypes
  */
    
    @Schema(name = "loadContentForTypes", description = "List of Cmis Types for which content should be loaded", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("loadContentForTypes")
  public Set<String> getLoadContentForTypes() {
  return loadContentForTypes;
  }

    @JsonDeserialize(as = LinkedHashSet.class)
  public void setLoadContentForTypes(Set<String> loadContentForTypes) {
  this.loadContentForTypes = loadContentForTypes;
  }

  public QueryRequest loadContentForMimeTypes(Set<String> loadContentForMimeTypes) {
    this.loadContentForMimeTypes = loadContentForMimeTypes;
  return this;
  }

    public QueryRequest addLoadContentForMimeTypesItem(String loadContentForMimeTypesItem) {
      if (this.loadContentForMimeTypes == null) {
      this.loadContentForMimeTypes = new LinkedHashSet<>();
      }
      this.loadContentForMimeTypes.add(loadContentForMimeTypesItem);
    return this;
    }

  /**
    * List of mimeTypes for which content should be loaded
  * @return loadContentForMimeTypes
  */
    
    @Schema(name = "loadContentForMimeTypes", description = "List of mimeTypes for which content should be loaded", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("loadContentForMimeTypes")
  public Set<String> getLoadContentForMimeTypes() {
  return loadContentForMimeTypes;
  }

    @JsonDeserialize(as = LinkedHashSet.class)
  public void setLoadContentForMimeTypes(Set<String> loadContentForMimeTypes) {
  this.loadContentForMimeTypes = loadContentForMimeTypes;
  }

  public QueryRequest loadTargetRelationships(Boolean loadTargetRelationships) {
    this.loadTargetRelationships = loadTargetRelationships;
  return this;
  }

  /**
    * Load the target relationships of fetched items
  * @return loadTargetRelationships
  */
    
    @Schema(name = "loadTargetRelationships", description = "Load the target relationships of fetched items", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("loadTargetRelationships")
  public Boolean getLoadTargetRelationships() {
  return loadTargetRelationships;
  }

  public void setLoadTargetRelationships(Boolean loadTargetRelationships) {
  this.loadTargetRelationships = loadTargetRelationships;
  }

  public QueryRequest loadSourceRelationships(Boolean loadSourceRelationships) {
    this.loadSourceRelationships = loadSourceRelationships;
  return this;
  }

  /**
    * Load the source relationships of fetched items
  * @return loadSourceRelationships
  */
    
    @Schema(name = "loadSourceRelationships", description = "Load the source relationships of fetched items", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("loadSourceRelationships")
  public Boolean getLoadSourceRelationships() {
  return loadSourceRelationships;
  }

  public void setLoadSourceRelationships(Boolean loadSourceRelationships) {
  this.loadSourceRelationships = loadSourceRelationships;
  }

  public QueryRequest loadRecursiveRelationships(Boolean loadRecursiveRelationships) {
    this.loadRecursiveRelationships = loadRecursiveRelationships;
  return this;
  }

  /**
    * Load all relationships of fetched items recursively
  * @return loadRecursiveRelationships
  */
    
    @Schema(name = "loadRecursiveRelationships", description = "Load all relationships of fetched items recursively", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("loadRecursiveRelationships")
  public Boolean getLoadRecursiveRelationships() {
  return loadRecursiveRelationships;
  }

  public void setLoadRecursiveRelationships(Boolean loadRecursiveRelationships) {
  this.loadRecursiveRelationships = loadRecursiveRelationships;
  }

  public QueryRequest loadProperties(Boolean loadProperties) {
    this.loadProperties = loadProperties;
  return this;
  }

  /**
    * Should load all properties of the fetched items
  * @return loadProperties
  */
    
    @Schema(name = "loadProperties", description = "Should load all properties of the fetched items", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("loadProperties")
  public Boolean getLoadProperties() {
  return loadProperties;
  }

  public void setLoadProperties(Boolean loadProperties) {
  this.loadProperties = loadProperties;
  }

  public QueryRequest inlineRelationshipsContent(Boolean inlineRelationshipsContent) {
    this.inlineRelationshipsContent = inlineRelationshipsContent;
  return this;
  }

  /**
    * If relationships content should be resolved and inlined in the related json content
  * @return inlineRelationshipsContent
  */
    
    @Schema(name = "inlineRelationshipsContent", description = "If relationships content should be resolved and inlined in the related json content", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("inlineRelationshipsContent")
  public Boolean getInlineRelationshipsContent() {
  return inlineRelationshipsContent;
  }

  public void setInlineRelationshipsContent(Boolean inlineRelationshipsContent) {
  this.inlineRelationshipsContent = inlineRelationshipsContent;
  }

  public QueryRequest loadRenditions(Boolean loadRenditions) {
    this.loadRenditions = loadRenditions;
  return this;
  }

  /**
    * Load all renditions of fetched items 
  * @return loadRenditions
  */
    
    @Schema(name = "loadRenditions", description = "Load all renditions of fetched items ", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("loadRenditions")
  public Boolean getLoadRenditions() {
  return loadRenditions;
  }

  public void setLoadRenditions(Boolean loadRenditions) {
  this.loadRenditions = loadRenditions;
  }

  public QueryRequest loadChildren(Boolean loadChildren) {
    this.loadChildren = loadChildren;
  return this;
  }

  /**
    * Should load the children of fetched content
  * @return loadChildren
  */
    
    @Schema(name = "loadChildren", description = "Should load the children of fetched content", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("loadChildren")
  public Boolean getLoadChildren() {
  return loadChildren;
  }

  public void setLoadChildren(Boolean loadChildren) {
  this.loadChildren = loadChildren;
  }

  public QueryRequest loadVersions(Boolean loadVersions) {
    this.loadVersions = loadVersions;
  return this;
  }

  /**
    * List of all version belonging to specific document.
  * @return loadVersions
  */
    
    @Schema(name = "loadVersions", description = "List of all version belonging to specific document.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("loadVersions")
  public Boolean getLoadVersions() {
  return loadVersions;
  }

  public void setLoadVersions(Boolean loadVersions) {
  this.loadVersions = loadVersions;
  }

  @Override
  public boolean equals(Object o) {
  if (this == o) {
  return true;
  }
  if (o == null || getClass() != o.getClass()) {
  return false;
  }
    QueryRequest queryRequest = (QueryRequest) o;
    return Objects.equals(this.ids, queryRequest.ids) &&
    Objects.equals(this.paths, queryRequest.paths) &&
    Objects.equals(this.repositories, queryRequest.repositories) &&
    Objects.equals(this.loadContentForTypes, queryRequest.loadContentForTypes) &&
    Objects.equals(this.loadContentForMimeTypes, queryRequest.loadContentForMimeTypes) &&
    Objects.equals(this.loadTargetRelationships, queryRequest.loadTargetRelationships) &&
    Objects.equals(this.loadSourceRelationships, queryRequest.loadSourceRelationships) &&
    Objects.equals(this.loadRecursiveRelationships, queryRequest.loadRecursiveRelationships) &&
    Objects.equals(this.loadProperties, queryRequest.loadProperties) &&
    Objects.equals(this.inlineRelationshipsContent, queryRequest.inlineRelationshipsContent) &&
    Objects.equals(this.loadRenditions, queryRequest.loadRenditions) &&
    Objects.equals(this.loadChildren, queryRequest.loadChildren) &&
    Objects.equals(this.loadVersions, queryRequest.loadVersions);
  }

    @Override
    public int hashCode() {
    return Objects.hash(ids, paths, repositories, loadContentForTypes, loadContentForMimeTypes, loadTargetRelationships, loadSourceRelationships, loadRecursiveRelationships, loadProperties, inlineRelationshipsContent, loadRenditions, loadChildren, loadVersions);
    }

    @Override
    public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class QueryRequest {\n");
  sb.append("    ids: ").append(toIndentedString(ids)).append("\n");
  sb.append("    paths: ").append(toIndentedString(paths)).append("\n");
  sb.append("    repositories: ").append(toIndentedString(repositories)).append("\n");
  sb.append("    loadContentForTypes: ").append(toIndentedString(loadContentForTypes)).append("\n");
  sb.append("    loadContentForMimeTypes: ").append(toIndentedString(loadContentForMimeTypes)).append("\n");
  sb.append("    loadTargetRelationships: ").append(toIndentedString(loadTargetRelationships)).append("\n");
  sb.append("    loadSourceRelationships: ").append(toIndentedString(loadSourceRelationships)).append("\n");
  sb.append("    loadRecursiveRelationships: ").append(toIndentedString(loadRecursiveRelationships)).append("\n");
  sb.append("    loadProperties: ").append(toIndentedString(loadProperties)).append("\n");
  sb.append("    inlineRelationshipsContent: ").append(toIndentedString(inlineRelationshipsContent)).append("\n");
  sb.append("    loadRenditions: ").append(toIndentedString(loadRenditions)).append("\n");
  sb.append("    loadChildren: ").append(toIndentedString(loadChildren)).append("\n");
  sb.append("    loadVersions: ").append(toIndentedString(loadVersions)).append("\n");
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
