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
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.Map;
import java.util.Set;
import org.openapitools.jackson.nullable.JsonNullable;
import java.time.OffsetDateTime;
import javax.validation.Valid;
import javax.validation.constraints.*;
import io.swagger.v3.oas.annotations.media.Schema;


import java.util.*;
import javax.annotation.Generated;

/**
* Content Api provides search functionality as a replacement for CMIS
*/

    @Schema(name = "search-request", description = "Content Api provides search functionality as a replacement for CMIS")
      @JsonTypeName("search-request")
@Generated(value = "com.backbase.oss.codegen.java.BoatSpringCodeGen")
public class SearchRequest {

    @Valid
    @Size(min = 1, max = 765)
    private String searchTerm;

    @Valid
    
    private Set<String> paths = new LinkedHashSet<>();

    @Valid
    
    private Set<String> repositories = new LinkedHashSet<>();

    @Valid
    
    private Map<String, String> properties = new HashMap<>();

  public SearchRequest searchTerm(String searchTerm) {
    this.searchTerm = searchTerm;
  return this;
  }

  /**
    * Free text string to be searched
  * @return searchTerm
  */
    @Size(min = 1, max = 765) 
    @Schema(name = "searchTerm", description = "Free text string to be searched", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("searchTerm")
  public String getSearchTerm() {
  return searchTerm;
  }

  public void setSearchTerm(String searchTerm) {
  this.searchTerm = searchTerm;
  }

  public SearchRequest paths(Set<String> paths) {
    this.paths = paths;
  return this;
  }

    public SearchRequest addPathsItem(String pathsItem) {
      if (this.paths == null) {
      this.paths = new LinkedHashSet<>();
      }
      this.paths.add(pathsItem);
    return this;
    }

  /**
    * List of paths of content to be searched. Folders can be omitted by adding '!' as prefix. For Ex: paths: ['/', '!/Generated content'] will search on '/ ' except '!/Generated content'
  * @return paths
  */
    
    @Schema(name = "paths", description = "List of paths of content to be searched. Folders can be omitted by adding '!' as prefix. For Ex: paths: ['/', '!/Generated content'] will search on '/ ' except '!/Generated content'", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("paths")
  public Set<String> getPaths() {
  return paths;
  }

    @JsonDeserialize(as = LinkedHashSet.class)
  public void setPaths(Set<String> paths) {
  this.paths = paths;
  }

  public SearchRequest repositories(Set<String> repositories) {
    this.repositories = repositories;
  return this;
  }

    public SearchRequest addRepositoriesItem(String repositoriesItem) {
      if (this.repositories == null) {
      this.repositories = new LinkedHashSet<>();
      }
      this.repositories.add(repositoriesItem);
    return this;
    }

  /**
    * List of content repositories to limit the search to
  * @return repositories
  */
    
    @Schema(name = "repositories", description = "List of content repositories to limit the search to", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("repositories")
  public Set<String> getRepositories() {
  return repositories;
  }

    @JsonDeserialize(as = LinkedHashSet.class)
  public void setRepositories(Set<String> repositories) {
  this.repositories = repositories;
  }

  public SearchRequest properties(Map<String, String> properties) {
    this.properties = properties;
  return this;
  }

        public SearchRequest putPropertiesItem(String key, String propertiesItem) {

          if (this.properties == null) {
          this.properties = new HashMap<>();
          }
        this.properties.put(key, propertiesItem);
        return this;
        }

  /**
    * Map of key/value pairs of property names and the values on which the results should be filtered.
  * @return properties
  */
    
    @Schema(name = "properties", description = "Map of key/value pairs of property names and the values on which the results should be filtered.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("properties")
  public Map<String, String> getProperties() {
  return properties;
  }

  public void setProperties(Map<String, String> properties) {
  this.properties = properties;
  }

  @Override
  public boolean equals(Object o) {
  if (this == o) {
  return true;
  }
  if (o == null || getClass() != o.getClass()) {
  return false;
  }
    SearchRequest searchRequest = (SearchRequest) o;
    return Objects.equals(this.searchTerm, searchRequest.searchTerm) &&
    Objects.equals(this.paths, searchRequest.paths) &&
    Objects.equals(this.repositories, searchRequest.repositories) &&
    Objects.equals(this.properties, searchRequest.properties);
  }

    @Override
    public int hashCode() {
    return Objects.hash(searchTerm, paths, repositories, properties);
    }

    @Override
    public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class SearchRequest {\n");
  sb.append("    searchTerm: ").append(toIndentedString(searchTerm)).append("\n");
  sb.append("    paths: ").append(toIndentedString(paths)).append("\n");
  sb.append("    repositories: ").append(toIndentedString(repositories)).append("\n");
  sb.append("    properties: ").append(toIndentedString(properties)).append("\n");
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
