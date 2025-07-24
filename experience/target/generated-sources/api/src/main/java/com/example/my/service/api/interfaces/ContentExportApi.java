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
@io.swagger.v3.oas.annotations.tags.Tag(name = "ContentExport", description = "Handles export of content bundles")
public interface ContentExportApi {

    /**
     * POST /client-api/repositories/{repositoryId}/export
     * Returns a zip containing a full repository export or export of individual content items by specified ids.
     *
     * @param repositoryId Repository ID from which to take export from (required)
     * @param optionalMeta optional metadata to include in the export of individual items. If empty, export no metadata; if null, export all. (optional)
     * @param requestBody List of content ids to export. If empty list is provided, only bare repository.xml is exported with no content. If body is null, full repository export is performed. (optional)
     * @return Export has been done successfully. (status code 200)
     *         or Object not found (status code 404)
     *         or Internal server error (status code 500)
     */
    @Operation(
        operationId = "writeExportContentBundleOnClientCall",
        description = "Returns a zip containing a full repository export or export of individual content items by specified ids.",
        tags = { "ContentExport" },
        responses = {
            @ApiResponse(responseCode = "200", description = "Export has been done successfully.", content = {
                @Content(mediaType = "application/zip", schema = @Schema(implementation = org.springframework.core.io.Resource.class)),
                @Content(mediaType = "application/json", schema = @Schema(implementation = org.springframework.core.io.Resource.class))
            }),
            @ApiResponse(responseCode = "404", description = "Object not found", content = {
                @Content(mediaType = "application/zip", schema = @Schema(implementation = StatusMessage.class)),
                @Content(mediaType = "application/json", schema = @Schema(implementation = StatusMessage.class))
            }),
            @ApiResponse(responseCode = "500", description = "Internal server error", content = {
                @Content(mediaType = "application/zip", schema = @Schema(implementation = StatusMessage.class)),
                @Content(mediaType = "application/json", schema = @Schema(implementation = StatusMessage.class))
            })
        }
    )
    @RequestMapping(
        method = RequestMethod.POST,
        value = "/client-api/repositories/{repositoryId}/export",
        produces = { "application/zip", "application/json" },
        consumes = { "application/json" }
    )
    ResponseEntity<org.springframework.core.io.Resource> writeExportContentBundleOnClientCall(
        @Parameter(name = "repositoryId", description = "Repository ID from which to take export from", required = true) @PathVariable("repositoryId") String repositoryId,
        @Parameter(name = "optionalMeta", description = "optional metadata to include in the export of individual items. If empty, export no metadata; if null, export all.") @Valid @RequestParam(value = "optionalMeta", required = false) java.util.List<String> optionalMeta,
        @Parameter(name = "request_body", description = "List of content ids to export. If empty list is provided, only bare repository.xml is exported with no content. If body is null, full repository export is performed.") @Valid @RequestBody(required = false) List<String> requestBody
    );

}
