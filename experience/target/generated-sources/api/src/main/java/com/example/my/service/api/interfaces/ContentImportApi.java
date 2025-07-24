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

import com.example.my.service.models.ItemImportResult;
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
@io.swagger.v3.oas.annotations.tags.Tag(name = "ContentImport", description = "Handles import of content bundles")
public interface ContentImportApi {

    /**
     * POST /client-api/repositories/{repositoryId}/import
     *
     * @param repositoryId Repository to import to. The repository should already exist if cr parameter is false. (required)
     * @param file File to upload. (required)
     * @param parentPath The path of the parent folder where to import the bundle. (optional, default to /)
     * @param createPath Create Path. Only considered if path is provided, allows the full path to be created if not already there. (optional, default to false)
     * @param overwrite If any file is found at one or more locations specified in the ContentBundle, they will be overwritten. (optional, default to true)
     * @param createRepository Create repository. Indicates if repository should be created. (optional, default to false)
     * @return Import has been done successfully. (status code 201)
     *         or Invalid request (status code 400)
     *         or Object not found (status code 404)
     */
    @Operation(
        operationId = "importContent",
        tags = { "ContentImport" },
        responses = {
            @ApiResponse(responseCode = "201", description = "Import has been done successfully.", content = {
                @Content(mediaType = "application/json", schema = @Schema(implementation = ItemImportResult.class))
            }),
            @ApiResponse(responseCode = "400", description = "Invalid request", content = {
                @Content(mediaType = "application/json", schema = @Schema(implementation = StatusMessage.class))
            }),
            @ApiResponse(responseCode = "404", description = "Object not found", content = {
                @Content(mediaType = "application/json", schema = @Schema(implementation = StatusMessage.class))
            })
        }
    )
    @RequestMapping(
        method = RequestMethod.POST,
        value = "/client-api/repositories/{repositoryId}/import",
        produces = { "application/json" },
        consumes = { "multipart/form-data" }
    )
    ResponseEntity<List<@Valid ItemImportResult>> importContent(
        @Parameter(name = "repositoryId", description = "Repository to import to. The repository should already exist if cr parameter is false.", required = true) @PathVariable("repositoryId") String repositoryId,
        @Parameter(name = "file", description = "File to upload.", required = true) @RequestPart(value = "file", required = true) MultipartFile file,
        @Pattern(regexp = "^/(?:.+/?)*$") @Parameter(name = "parentPath", description = "The path of the parent folder where to import the bundle.") @Valid @RequestParam(value = "parentPath", required = false, defaultValue = "/") String parentPath,
        @Parameter(name = "createPath", description = "Create Path. Only considered if path is provided, allows the full path to be created if not already there.") @Valid @RequestParam(value = "createPath", required = false, defaultValue = "false") Boolean createPath,
        @Parameter(name = "overwrite", description = "If any file is found at one or more locations specified in the ContentBundle, they will be overwritten.") @Valid @RequestParam(value = "overwrite", required = false, defaultValue = "true") Boolean overwrite,
        @Parameter(name = "createRepository", description = "Create repository. Indicates if repository should be created.") @Valid @RequestParam(value = "createRepository", required = false, defaultValue = "false") Boolean createRepository
    );

}
