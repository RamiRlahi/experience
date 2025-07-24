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
import java.util.HashMap;
import java.util.Map;
import org.openapitools.jackson.nullable.JsonNullable;
import java.time.OffsetDateTime;
import javax.validation.Valid;
import javax.validation.constraints.*;
import io.swagger.v3.oas.annotations.media.Schema;


import java.util.*;
import javax.annotation.Generated;

/**
* Rendition definition.
*/

    @Schema(name = "rendition", description = "Rendition definition.")
      @JsonTypeName("rendition")
@Generated(value = "com.backbase.oss.codegen.java.BoatSpringCodeGen")
public class Rendition {

    @Valid
    
    private String streamId;

    @Valid
    
    private String mimeType;

    @Valid
    
    private Integer length;

    @Valid
    
    private String title;

    @Valid
    
    private String kind;

    @Valid
    
    private Integer height;

    @Valid
    
    private Integer width;

    @Valid
    
    private String renditionDocumentId;

    @Valid
    
    private String originalDocumentId;

    @Valid
    
    private Map<String, Map<String, Object>> links = new HashMap<>();

  public Rendition streamId(String streamId) {
    this.streamId = streamId;
  return this;
  }

  /**
    * The rendition's stream id.
  * @return streamId
  */
    
    @Schema(name = "streamId", description = "The rendition's stream id.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("streamId")
  public String getStreamId() {
  return streamId;
  }

  public void setStreamId(String streamId) {
  this.streamId = streamId;
  }

  public Rendition mimeType(String mimeType) {
    this.mimeType = mimeType;
  return this;
  }

  /**
    * The rendition's mimeType.
  * @return mimeType
  */
    
    @Schema(name = "mimeType", description = "The rendition's mimeType.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("mimeType")
  public String getMimeType() {
  return mimeType;
  }

  public void setMimeType(String mimeType) {
  this.mimeType = mimeType;
  }

  public Rendition length(Integer length) {
    this.length = length;
  return this;
  }

  /**
    * The Renditions length.
  * @return length
  */
    
    @Schema(name = "length", description = "The Renditions length.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("length")
  public Integer getLength() {
  return length;
  }

  public void setLength(Integer length) {
  this.length = length;
  }

  public Rendition title(String title) {
    this.title = title;
  return this;
  }

  /**
    * Rendition's title.
  * @return title
  */
    
    @Schema(name = "title", description = "Rendition's title.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("title")
  public String getTitle() {
  return title;
  }

  public void setTitle(String title) {
  this.title = title;
  }

  public Rendition kind(String kind) {
    this.kind = kind;
  return this;
  }

  /**
    * The cmis kind of the rendition.
  * @return kind
  */
    
    @Schema(name = "kind", description = "The cmis kind of the rendition.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("kind")
  public String getKind() {
  return kind;
  }

  public void setKind(String kind) {
  this.kind = kind;
  }

  public Rendition height(Integer height) {
    this.height = height;
  return this;
  }

  /**
    * Height of the Rendition (Applicable only for images).
  * @return height
  */
    
    @Schema(name = "height", description = "Height of the Rendition (Applicable only for images).", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("height")
  public Integer getHeight() {
  return height;
  }

  public void setHeight(Integer height) {
  this.height = height;
  }

  public Rendition width(Integer width) {
    this.width = width;
  return this;
  }

  /**
    * Width of the Rendition (Applicable only for images).
  * @return width
  */
    
    @Schema(name = "width", description = "Width of the Rendition (Applicable only for images).", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("width")
  public Integer getWidth() {
  return width;
  }

  public void setWidth(Integer width) {
  this.width = width;
  }

  public Rendition renditionDocumentId(String renditionDocumentId) {
    this.renditionDocumentId = renditionDocumentId;
  return this;
  }

  /**
    * The rendition Document id.
  * @return renditionDocumentId
  */
    
    @Schema(name = "renditionDocumentId", description = "The rendition Document id.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("renditionDocumentId")
  public String getRenditionDocumentId() {
  return renditionDocumentId;
  }

  public void setRenditionDocumentId(String renditionDocumentId) {
  this.renditionDocumentId = renditionDocumentId;
  }

  public Rendition originalDocumentId(String originalDocumentId) {
    this.originalDocumentId = originalDocumentId;
  return this;
  }

  /**
    * The rendition original Document id.
  * @return originalDocumentId
  */
    
    @Schema(name = "originalDocumentId", description = "The rendition original Document id.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("originalDocumentId")
  public String getOriginalDocumentId() {
  return originalDocumentId;
  }

  public void setOriginalDocumentId(String originalDocumentId) {
  this.originalDocumentId = originalDocumentId;
  }

  public Rendition links(Map<String, Map<String, Object>> links) {
    this.links = links;
  return this;
  }

        public Rendition putLinksItem(String key, Map<String, Object> linksItem) {

          if (this.links == null) {
          this.links = new HashMap<>();
          }
        this.links.put(key, linksItem);
        return this;
        }

  /**
    * All the links to this Rendition.
  * @return links
  */
    @Valid 
    @Schema(name = "links", description = "All the links to this Rendition.", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty("links")
  public Map<String, Map<String, Object>> getLinks() {
  return links;
  }

  public void setLinks(Map<String, Map<String, Object>> links) {
  this.links = links;
  }

  @Override
  public boolean equals(Object o) {
  if (this == o) {
  return true;
  }
  if (o == null || getClass() != o.getClass()) {
  return false;
  }
    Rendition rendition = (Rendition) o;
    return Objects.equals(this.streamId, rendition.streamId) &&
    Objects.equals(this.mimeType, rendition.mimeType) &&
    Objects.equals(this.length, rendition.length) &&
    Objects.equals(this.title, rendition.title) &&
    Objects.equals(this.kind, rendition.kind) &&
    Objects.equals(this.height, rendition.height) &&
    Objects.equals(this.width, rendition.width) &&
    Objects.equals(this.renditionDocumentId, rendition.renditionDocumentId) &&
    Objects.equals(this.originalDocumentId, rendition.originalDocumentId) &&
    Objects.equals(this.links, rendition.links);
  }

    @Override
    public int hashCode() {
    return Objects.hash(streamId, mimeType, length, title, kind, height, width, renditionDocumentId, originalDocumentId, links);
    }

    @Override
    public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Rendition {\n");
  sb.append("    streamId: ").append(toIndentedString(streamId)).append("\n");
  sb.append("    mimeType: ").append(toIndentedString(mimeType)).append("\n");
  sb.append("    length: ").append(toIndentedString(length)).append("\n");
  sb.append("    title: ").append(toIndentedString(title)).append("\n");
  sb.append("    kind: ").append(toIndentedString(kind)).append("\n");
  sb.append("    height: ").append(toIndentedString(height)).append("\n");
  sb.append("    width: ").append(toIndentedString(width)).append("\n");
  sb.append("    renditionDocumentId: ").append(toIndentedString(renditionDocumentId)).append("\n");
  sb.append("    originalDocumentId: ").append(toIndentedString(originalDocumentId)).append("\n");
  sb.append("    links: ").append(toIndentedString(links)).append("\n");
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
