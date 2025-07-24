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
import com.example.my.service.models.DocumentRelationship;
import com.example.my.service.models.DocumentSignedUrlResponse;
import com.example.my.service.models.Rendition;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonTypeName;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import java.time.OffsetDateTime;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.Map;
import java.util.Set;
import org.springframework.format.annotation.DateTimeFormat;
import org.openapitools.jackson.nullable.JsonNullable;
import java.time.OffsetDateTime;
import javax.validation.Valid;
import javax.validation.constraints.*;
import io.swagger.v3.oas.annotations.media.Schema;


import java.util.*;
import javax.annotation.Generated;

/**
* Content Services Document
*/

    @Schema(name = "document", description = "Content Services Document")
      @JsonTypeName("document")
@Generated(value = "com.backbase.oss.codegen.java.BoatSpringCodeGen")
public class Document {

    @Valid
    
    private String path;

    @Valid
    
    private String id;

    @Valid
    
    private String repositoryId;

    @Valid
    
    private String type;

    @Valid
    
    private String versionLabel;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    @Valid
    
    private OffsetDateTime creationDate;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    @Valid
    
    private OffsetDateTime lastModificationDate;

    @Valid
    
    private Map<String, Object> properties = new HashMap<>();

    @Valid
    
    private String content;

    @Valid
    
    private String mimeType = "application/json; charset=utf-8";

    @Valid
    
    private Long length;

    @Valid
    
    private Set<@Valid Rendition> renditions = new LinkedHashSet<>();

    @Valid
    
    private Set<@Valid Document> children = new LinkedHashSet<>();

    @Valid
    
    private Set<@Valid DocumentRelationship> relationships = new LinkedHashSet<>();

    @Valid
    
    private Set<@Valid Document> versions = new LinkedHashSet<>();

    @Valid
    
    private Map<String, Map<String, Object>> links = new HashMap<>();

    @Valid
    
    private Boolean createSignedUrl = false;

    @Valid
    
    private DocumentSignedUrlResponse signedUrl;

  public Document path(String path) {
    this.path = path;
  return this;
  }

  /**
    * Content Path.
  * @return path
  */
    
    @Schema(name = "path", description = "Content Path.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("path")
  public String getPath() {
  return path;
  }

  public void setPath(String path) {
  this.path = path;
  }

  public Document id(String id) {
    this.id = id;
  return this;
  }

  /**
    * Content unique id.
  * @return id
  */
    
    @Schema(name = "id", description = "Content unique id.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("id")
  public String getId() {
  return id;
  }

  public void setId(String id) {
  this.id = id;
  }

  public Document repositoryId(String repositoryId) {
    this.repositoryId = repositoryId;
  return this;
  }

  /**
    * Repository which the socument belongs to.
  * @return repositoryId
  */
    
    @Schema(name = "repositoryId", description = "Repository which the socument belongs to.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("repositoryId")
  public String getRepositoryId() {
  return repositoryId;
  }

  public void setRepositoryId(String repositoryId) {
  this.repositoryId = repositoryId;
  }

  public Document type(String type) {
    this.type = type;
  return this;
  }

  /**
    * The cmis type of this document.
  * @return type
  */
    
    @Schema(name = "type", description = "The cmis type of this document.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("type")
  public String getType() {
  return type;
  }

  public void setType(String type) {
  this.type = type;
  }

  public Document versionLabel(String versionLabel) {
    this.versionLabel = versionLabel;
  return this;
  }

  /**
    * The version label for this document.
  * @return versionLabel
  */
    
    @Schema(name = "versionLabel", description = "The version label for this document.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("versionLabel")
  public String getVersionLabel() {
  return versionLabel;
  }

  public void setVersionLabel(String versionLabel) {
  this.versionLabel = versionLabel;
  }

  public Document creationDate(OffsetDateTime creationDate) {
    this.creationDate = creationDate;
  return this;
  }

  /**
    * Date / time of creation, ISO format.
  * @return creationDate
  */
    @Valid 
    @Schema(name = "creationDate", description = "Date / time of creation, ISO format.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("creationDate")
  public OffsetDateTime getCreationDate() {
  return creationDate;
  }

  public void setCreationDate(OffsetDateTime creationDate) {
  this.creationDate = creationDate;
  }

  public Document lastModificationDate(OffsetDateTime lastModificationDate) {
    this.lastModificationDate = lastModificationDate;
  return this;
  }

  /**
    * Date / time of last modification, ISO format.
  * @return lastModificationDate
  */
    @Valid 
    @Schema(name = "lastModificationDate", description = "Date / time of last modification, ISO format.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("lastModificationDate")
  public OffsetDateTime getLastModificationDate() {
  return lastModificationDate;
  }

  public void setLastModificationDate(OffsetDateTime lastModificationDate) {
  this.lastModificationDate = lastModificationDate;
  }

  public Document properties(Map<String, Object> properties) {
    this.properties = properties;
  return this;
  }

        public Document putPropertiesItem(String key, Object propertiesItem) {

          if (this.properties == null) {
          this.properties = new HashMap<>();
          }
        this.properties.put(key, propertiesItem);
        return this;
        }

  /**
    * List of cmis properties of this document.
  * @return properties
  */
    
    @Schema(name = "properties", description = "List of cmis properties of this document.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("properties")
  public Map<String, Object> getProperties() {
  return properties;
  }

  public void setProperties(Map<String, Object> properties) {
  this.properties = properties;
  }

  public Document content(String content) {
    this.content = content;
  return this;
  }

  /**
    * Content of the document
  * @return content
  */
    
    @Schema(name = "content", description = "Content of the document", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("content")
  public String getContent() {
  return content;
  }

  public void setContent(String content) {
  this.content = content;
  }

  public Document mimeType(String mimeType) {
    this.mimeType = mimeType;
  return this;
  }

  /**
    * Content mime type
  * @return mimeType
  */
    
    @Schema(name = "mimeType", description = "Content mime type", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("mimeType")
  public String getMimeType() {
  return mimeType;
  }

  public void setMimeType(String mimeType) {
  this.mimeType = mimeType;
  }

  public Document length(Long length) {
    this.length = length;
  return this;
  }

  /**
    * Length of the document.
  * @return length
  */
    
    @Schema(name = "length", description = "Length of the document.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("length")
  public Long getLength() {
  return length;
  }

  public void setLength(Long length) {
  this.length = length;
  }

  public Document renditions(Set<@Valid Rendition> renditions) {
    this.renditions = renditions;
  return this;
  }

    public Document addRenditionsItem(Rendition renditionsItem) {
      if (this.renditions == null) {
      this.renditions = new LinkedHashSet<>();
      }
      this.renditions.add(renditionsItem);
    return this;
    }

  /**
    * All the renditions of this Document.
  * @return renditions
  */
    @Valid 
    @Schema(name = "renditions", description = "All the renditions of this Document.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("renditions")
  public Set<@Valid Rendition> getRenditions() {
  return renditions;
  }

    @JsonDeserialize(as = LinkedHashSet.class)
  public void setRenditions(Set<@Valid Rendition> renditions) {
  this.renditions = renditions;
  }

  public Document children(Set<@Valid Document> children) {
    this.children = children;
  return this;
  }

    public Document addChildrenItem(Document childrenItem) {
      if (this.children == null) {
      this.children = new LinkedHashSet<>();
      }
      this.children.add(childrenItem);
    return this;
    }

  /**
    * This document's children list.
  * @return children
  */
    @Valid 
    @Schema(name = "children", description = "This document's children list.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("children")
  public Set<@Valid Document> getChildren() {
  return children;
  }

    @JsonDeserialize(as = LinkedHashSet.class)
  public void setChildren(Set<@Valid Document> children) {
  this.children = children;
  }

  public Document relationships(Set<@Valid DocumentRelationship> relationships) {
    this.relationships = relationships;
  return this;
  }

    public Document addRelationshipsItem(DocumentRelationship relationshipsItem) {
      if (this.relationships == null) {
      this.relationships = new LinkedHashSet<>();
      }
      this.relationships.add(relationshipsItem);
    return this;
    }

  /**
    * All the relationship to/from this document
  * @return relationships
  */
    @Valid 
    @Schema(name = "relationships", description = "All the relationship to/from this document", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("relationships")
  public Set<@Valid DocumentRelationship> getRelationships() {
  return relationships;
  }

    @JsonDeserialize(as = LinkedHashSet.class)
  public void setRelationships(Set<@Valid DocumentRelationship> relationships) {
  this.relationships = relationships;
  }

  public Document versions(Set<@Valid Document> versions) {
    this.versions = versions;
  return this;
  }

    public Document addVersionsItem(Document versionsItem) {
      if (this.versions == null) {
      this.versions = new LinkedHashSet<>();
      }
      this.versions.add(versionsItem);
    return this;
    }

  /**
    * All versions of this document
  * @return versions
  */
    @Valid 
    @Schema(name = "versions", description = "All versions of this document", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("versions")
  public Set<@Valid Document> getVersions() {
  return versions;
  }

    @JsonDeserialize(as = LinkedHashSet.class)
  public void setVersions(Set<@Valid Document> versions) {
  this.versions = versions;
  }

  public Document links(Map<String, Map<String, Object>> links) {
    this.links = links;
  return this;
  }

        public Document putLinksItem(String key, Map<String, Object> linksItem) {

          if (this.links == null) {
          this.links = new HashMap<>();
          }
        this.links.put(key, linksItem);
        return this;
        }

  /**
    * All the different links to the document
  * @return links
  */
    @Valid 
    @Schema(name = "links", description = "All the different links to the document", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("links")
  public Map<String, Map<String, Object>> getLinks() {
  return links;
  }

  public void setLinks(Map<String, Map<String, Object>> links) {
  this.links = links;
  }

  public Document createSignedUrl(Boolean createSignedUrl) {
    this.createSignedUrl = createSignedUrl;
  return this;
  }

  /**
    * If storage type supports generation of signed url for given content, setting this to true will generate a signed url for a limited time.
  * @return createSignedUrl
  */
    
    @Schema(name = "createSignedUrl", description = "If storage type supports generation of signed url for given content, setting this to true will generate a signed url for a limited time.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("createSignedUrl")
  public Boolean getCreateSignedUrl() {
  return createSignedUrl;
  }

  public void setCreateSignedUrl(Boolean createSignedUrl) {
  this.createSignedUrl = createSignedUrl;
  }

  public Document signedUrl(DocumentSignedUrlResponse signedUrl) {
    this.signedUrl = signedUrl;
  return this;
  }

  /**
    * Get signedUrl
  * @return signedUrl
  */
    @Valid 
    @Schema(name = "signedUrl", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("signedUrl")
  public DocumentSignedUrlResponse getSignedUrl() {
  return signedUrl;
  }

  public void setSignedUrl(DocumentSignedUrlResponse signedUrl) {
  this.signedUrl = signedUrl;
  }

  @Override
  public boolean equals(Object o) {
  if (this == o) {
  return true;
  }
  if (o == null || getClass() != o.getClass()) {
  return false;
  }
    Document document = (Document) o;
    return Objects.equals(this.path, document.path) &&
    Objects.equals(this.id, document.id) &&
    Objects.equals(this.repositoryId, document.repositoryId) &&
    Objects.equals(this.type, document.type) &&
    Objects.equals(this.versionLabel, document.versionLabel) &&
    Objects.equals(this.creationDate, document.creationDate) &&
    Objects.equals(this.lastModificationDate, document.lastModificationDate) &&
    Objects.equals(this.properties, document.properties) &&
    Objects.equals(this.content, document.content) &&
    Objects.equals(this.mimeType, document.mimeType) &&
    Objects.equals(this.length, document.length) &&
    Objects.equals(this.renditions, document.renditions) &&
    Objects.equals(this.children, document.children) &&
    Objects.equals(this.relationships, document.relationships) &&
    Objects.equals(this.versions, document.versions) &&
    Objects.equals(this.links, document.links) &&
    Objects.equals(this.createSignedUrl, document.createSignedUrl) &&
    Objects.equals(this.signedUrl, document.signedUrl);
  }

    @Override
    public int hashCode() {
    return Objects.hash(path, id, repositoryId, type, versionLabel, creationDate, lastModificationDate, properties, content, mimeType, length, renditions, children, relationships, versions, links, createSignedUrl, signedUrl);
    }

    @Override
    public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Document {\n");
  sb.append("    path: ").append(toIndentedString(path)).append("\n");
  sb.append("    id: ").append(toIndentedString(id)).append("\n");
  sb.append("    repositoryId: ").append(toIndentedString(repositoryId)).append("\n");
  sb.append("    type: ").append(toIndentedString(type)).append("\n");
  sb.append("    versionLabel: ").append(toIndentedString(versionLabel)).append("\n");
  sb.append("    creationDate: ").append(toIndentedString(creationDate)).append("\n");
  sb.append("    lastModificationDate: ").append(toIndentedString(lastModificationDate)).append("\n");
  sb.append("    properties: ").append(toIndentedString(properties)).append("\n");
  sb.append("    content: ").append(toIndentedString(content)).append("\n");
  sb.append("    mimeType: ").append(toIndentedString(mimeType)).append("\n");
  sb.append("    length: ").append(toIndentedString(length)).append("\n");
  sb.append("    renditions: ").append(toIndentedString(renditions)).append("\n");
  sb.append("    children: ").append(toIndentedString(children)).append("\n");
  sb.append("    relationships: ").append(toIndentedString(relationships)).append("\n");
  sb.append("    versions: ").append(toIndentedString(versions)).append("\n");
  sb.append("    links: ").append(toIndentedString(links)).append("\n");
  sb.append("    createSignedUrl: ").append(toIndentedString(createSignedUrl)).append("\n");
  sb.append("    signedUrl: ").append(toIndentedString(signedUrl)).append("\n");
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
