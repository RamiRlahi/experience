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

import java.util.Set;
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
@io.swagger.v3.oas.annotations.tags.Tag(name = "ResourceImport", description = "Handles import of resource bundles")
public interface ResourceImportApi {

    /**
     * POST /client-api/resources/import
     * Import resource provided as a zipped bundle to resourceRepository.
     *
     * @param file File to upload. (required)
     * @param rootPath Set the rootPath to import the bundle. Allowed regex is [a-zA-Z0-9-_]+. Bundle will be imported to contextRoot if rootPath is not specified. (optional, default to contextRoot)
     * @return Import has been done successfully. Return array of imported items ids. (status code 201)
     *         or Invalid request (status code 400)
     */
    @Operation(
        operationId = "importResourceBundle",
        description = "Import resource provided as a zipped bundle to resourceRepository.",
        tags = { "ResourceImport" },
        responses = {
            @ApiResponse(responseCode = "201", description = "Import has been done successfully. Return array of imported items ids.", content = {
                @Content(mediaType = "application/json", schema = @Schema(implementation = String.class))
            }),
            @ApiResponse(responseCode = "400", description = "Invalid request", content = {
                @Content(mediaType = "application/json", schema = @Schema(implementation = StatusMessage.class))
            })
        }
    )
    @RequestMapping(
        method = RequestMethod.POST,
        value = "/client-api/resources/import",
        produces = { "application/json" },
        consumes = { "multipart/form-data" }
    )
    ResponseEntity<Set<String>> importResourceBundle(
        @Parameter(name = "file", description = "File to upload.", required = true) @RequestPart(value = "file", required = true) MultipartFile file,
        @Parameter(name = "rootPath", description = "Set the rootPath to import the bundle. Allowed regex is [a-zA-Z0-9-_]+. Bundle will be imported to contextRoot if rootPath is not specified.") @Valid @RequestParam(value = "rootPath", required = false, defaultValue = "contextRoot") String rootPath
    );

}
