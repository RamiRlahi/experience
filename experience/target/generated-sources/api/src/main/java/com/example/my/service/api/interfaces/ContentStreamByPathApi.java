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
@io.swagger.v3.oas.annotations.tags.Tag(name = "ContentStreamByPath", description = "Handles content stream fetch operations using path to content")
public interface ContentStreamByPathApi {

    /**
     * GET /client-api/contentstream/{repositoryId}/{objectPath}
     * Gets content stream of an object by path.
     *
     * @param repositoryId Repository ID of the object to retrieve content stream of. (required)
     * @param objectPath Path to retrieve the content stream of. (required)
     * @param versionLabel Optional version of the content to be retrieved. Returns latest version when is not set. (optional)
     * @param download Determines whether content should be downloaded (if true) or rendered (if false) in browser. Default value is false. (optional)
     * @return Object is found. Content stream is returned. (status code 200)
     *         or Object is found. Content stream shoud be taken from cache. (status code 304)
     *         or Object not found (status code 404)
     */
    @Operation(
        operationId = "renderContentStreamByPathClientApi",
        description = "Gets content stream of an object by path.",
        tags = { "ContentStreamByPath" },
        responses = {
            @ApiResponse(responseCode = "200", description = "Object is found. Content stream is returned.", content = {
                @Content(mediaType = "application/octet-stream", schema = @Schema(implementation = org.springframework.core.io.Resource.class)),
                @Content(mediaType = "application/json", schema = @Schema(implementation = org.springframework.core.io.Resource.class))
            }),
            @ApiResponse(responseCode = "304", description = "Object is found. Content stream shoud be taken from cache."),
            @ApiResponse(responseCode = "404", description = "Object not found", content = {
                @Content(mediaType = "application/octet-stream", schema = @Schema(implementation = StatusMessage.class)),
                @Content(mediaType = "application/json", schema = @Schema(implementation = StatusMessage.class))
            })
        }
    )
    @RequestMapping(
        method = RequestMethod.GET,
        value = "/client-api/contentstream/{repositoryId}/{objectPath}",
        produces = { "application/octet-stream", "application/json" }
    )
    ResponseEntity<org.springframework.core.io.Resource> renderContentStreamByPathClientApi(
        @Parameter(name = "repositoryId", description = "Repository ID of the object to retrieve content stream of.", required = true) @PathVariable("repositoryId") String repositoryId,
        @Parameter(name = "objectPath", description = "Path to retrieve the content stream of.", required = true) @PathVariable("objectPath") String objectPath,
        @Parameter(name = "versionLabel", description = "Optional version of the content to be retrieved. Returns latest version when is not set.") @Valid @RequestParam(value = "versionLabel", required = false) String versionLabel,
        @Parameter(name = "download", description = "Determines whether content should be downloaded (if true) or rendered (if false) in browser. Default value is false.") @Valid @RequestParam(value = "download", required = false) Boolean download
    );

}
