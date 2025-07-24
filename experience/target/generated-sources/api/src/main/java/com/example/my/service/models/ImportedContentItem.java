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
import com.example.my.service.models.ContentItemProperty;
import com.example.my.service.models.ContentRelationships;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonTypeName;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.openapitools.jackson.nullable.JsonNullable;
import java.time.OffsetDateTime;
import javax.validation.Valid;
import javax.validation.constraints.*;
import io.swagger.v3.oas.annotations.media.Schema;


import java.util.*;
import javax.annotation.Generated;

/**
* ImportedContentItem
*/

      @JsonTypeName("imported-content-item")
@Generated(value = "com.backbase.oss.codegen.java.BoatSpringCodeGen")
public class ImportedContentItem {

    @Valid
    
    private String contentpath;

    @Valid
    
    private String bundlepath;

    @Valid
    
    private ContentRelationships contentRelationships;

    @Valid
    
    private List<@Valid ContentItemProperty> itemproperties = new ArrayList<>();

  public ImportedContentItem contentpath(String contentpath) {
    this.contentpath = contentpath;
  return this;
  }

  /**
    * Content path that item supposed to be imported to
  * @return contentpath
  */
    
    @Schema(name = "contentpath", description = "Content path that item supposed to be imported to", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("contentpath")
  public String getContentpath() {
  return contentpath;
  }

  public void setContentpath(String contentpath) {
  this.contentpath = contentpath;
  }

  public ImportedContentItem bundlepath(String bundlepath) {
    this.bundlepath = bundlepath;
  return this;
  }

  /**
    * Path in import bundle.
  * @return bundlepath
  */
    
    @Schema(name = "bundlepath", description = "Path in import bundle.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("bundlepath")
  public String getBundlepath() {
  return bundlepath;
  }

  public void setBundlepath(String bundlepath) {
  this.bundlepath = bundlepath;
  }

  public ImportedContentItem contentRelationships(ContentRelationships contentRelationships) {
    this.contentRelationships = contentRelationships;
  return this;
  }

  /**
    * Get contentRelationships
  * @return contentRelationships
  */
    @Valid 
    @Schema(name = "contentRelationships", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("contentRelationships")
  public ContentRelationships getContentRelationships() {
  return contentRelationships;
  }

  public void setContentRelationships(ContentRelationships contentRelationships) {
  this.contentRelationships = contentRelationships;
  }

  public ImportedContentItem itemproperties(List<@Valid ContentItemProperty> itemproperties) {
    this.itemproperties = itemproperties;
  return this;
  }

    public ImportedContentItem addItempropertiesItem(ContentItemProperty itempropertiesItem) {
      if (this.itemproperties == null) {
      this.itemproperties = new ArrayList<>();
      }
      this.itemproperties.add(itempropertiesItem);
    return this;
    }

  /**
    * Content item properties.
  * @return itemproperties
  */
    @Valid 
    @Schema(name = "itemproperties", description = "Content item properties.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("itemproperties")
  public List<@Valid ContentItemProperty> getItemproperties() {
  return itemproperties;
  }

  public void setItemproperties(List<@Valid ContentItemProperty> itemproperties) {
  this.itemproperties = itemproperties;
  }

  @Override
  public boolean equals(Object o) {
  if (this == o) {
  return true;
  }
  if (o == null || getClass() != o.getClass()) {
  return false;
  }
    ImportedContentItem importedContentItem = (ImportedContentItem) o;
    return Objects.equals(this.contentpath, importedContentItem.contentpath) &&
    Objects.equals(this.bundlepath, importedContentItem.bundlepath) &&
    Objects.equals(this.contentRelationships, importedContentItem.contentRelationships) &&
    Objects.equals(this.itemproperties, importedContentItem.itemproperties);
  }

    @Override
    public int hashCode() {
    return Objects.hash(contentpath, bundlepath, contentRelationships, itemproperties);
    }

    @Override
    public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ImportedContentItem {\n");
  sb.append("    contentpath: ").append(toIndentedString(contentpath)).append("\n");
  sb.append("    bundlepath: ").append(toIndentedString(bundlepath)).append("\n");
  sb.append("    contentRelationships: ").append(toIndentedString(contentRelationships)).append("\n");
  sb.append("    itemproperties: ").append(toIndentedString(itemproperties)).append("\n");
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
