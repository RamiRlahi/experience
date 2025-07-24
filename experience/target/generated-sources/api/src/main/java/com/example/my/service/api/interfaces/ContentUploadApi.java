/*
Boat Generator configuration:
    useBeanValidation: true
    useOptional: false
    addServletRequest: false
    addBindingResult: false
    useLombokAnnotations: false
    openApiNullable: true
    useSetForUniqueItems: 
    useWithModifiers: false
*/
package com.example.my.service.api.interfaces;

import com.example.my.service.models.Document;
import com.example.my.service.models.StatusMessage;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.*;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import javax.annotation.Generated;

@Generated(value = "com.backbase.oss.codegen.java.BoatSpringCodeGen")
@io.swagger.v3.oas.annotations.tags.Tag(name = "ContentUpload", description = "the ContentUpload API")
public interface ContentUploadApi {

    /**
     * POST /client-api/repositories/{repositoryId}/upload
     * Performs uploading of content
     *
     * @param repositoryId ID of the repository to save and/or update uploaded content items. (required)
     * @param targetPath Path where the item should be added. (required)
     * @param file File to upload. (required)
     * @param name File name. (required)
     * @param cmisColonObjectTypeId Document Object Type ID property. (optional)
     * @param cmisColonCreatedBy Document created by property. (optional)
     * @param cmisColonLastModifiedBy Document last modified by property. (optional)
     * @param bbColonTitle Document title property. (optional)
     * @param bbColonLocale Document locale property. (optional)
     * @param changeToken Document change token property. (optional)
     * @param createSignedUrl If storage type supports generation of signed url for given content, setting this to true will generate a signed url for a limited time. (optional, default to false)
     * @return Document successfully created and/or updated. (status code 200)
     *         or Invalid request (status code 400)
     *         or File threat detected (status code 403)
     *         or Object not found (status code 404)
     */
    @Operation(
        operationId = "handleContentUpload",
        description = "Performs uploading of content",
        tags = { "ContentUpload" },
        responses = {
            @ApiResponse(responseCode = "200", description = "Document successfully created and/or updated.", content = {
                @Content(mediaType = "application/json", schema = @Schema(implementation = Document.class))
            }),
            @ApiResponse(responseCode = "400", description = "Invalid request", content = {
                @Content(mediaType = "application/json", schema = @Schema(implementation = StatusMessage.class))
            }),
            @ApiResponse(responseCode = "403", description = "File threat detected", content = {
                @Content(mediaType = "application/json", schema = @Schema(implementation = StatusMessage.class))
            }),
            @ApiResponse(responseCode = "404", description = "Object not found", content = {
                @Content(mediaType = "application/json", schema = @Schema(implementation = StatusMessage.class))
            })
        }
    )
    @RequestMapping(
        method = RequestMethod.POST,
        value = "/client-api/repositories/{repositoryId}/upload",
        produces = { "application/json" },
        consumes = { "multipart/form-data" }
    )
    ResponseEntity<Document> handleContentUpload(
        @Parameter(name = "repositoryId", description = "ID of the repository to save and/or update uploaded content items.", required = true) @PathVariable("repositoryId") String repositoryId,
        @Parameter(name = "targetPath", description = "Path where the item should be added.", required = true) @RequestPart(value = "targetPath", required = true)  String targetPath,
        @Parameter(name = "file", description = "File to upload.", required = true) @RequestPart(value = "file", required = true) MultipartFile file,
        @Parameter(name = "name", description = "File name.", required = true) @RequestPart(value = "name", required = true)  String name,
        @Parameter(name = "cmis:objectTypeId", description = "Document Object Type ID property.") @RequestPart(value = "cmis:objectTypeId", required = false)  String cmisColonObjectTypeId,
        @Parameter(name = "cmis:createdBy", description = "Document created by property.") @RequestPart(value = "cmis:createdBy", required = false)  String cmisColonCreatedBy,
        @Parameter(name = "cmis:lastModifiedBy", description = "Document last modified by property.") @RequestPart(value = "cmis:lastModifiedBy", required = false)  String cmisColonLastModifiedBy,
        @Parameter(name = "bb:title", description = "Document title property.") @RequestPart(value = "bb:title", required = false)  String bbColonTitle,
        @Parameter(name = "bb:locale", description = "Document locale property.") @RequestPart(value = "bb:locale", required = false)  String bbColonLocale,
        @Parameter(name = "changeToken", description = "Document change token property.") @RequestPart(value = "changeToken", required = false)  String changeToken,
        @Parameter(name = "createSignedUrl", description = "If storage type supports generation of signed url for given content, setting this to true will generate a signed url for a limited time.") @RequestPart(value = "createSignedUrl", required = false)  Boolean createSignedUrl
    );

}
