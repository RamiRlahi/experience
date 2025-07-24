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
import com.example.my.service.models.SearchRequest;
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
@io.swagger.v3.oas.annotations.tags.Tag(name = "ContentSearch", description = "Handles search operations on content metadata")
public interface ContentSearchApi {

    /**
     * POST /client-api/content/search
     * Performs search in content metadata.
     *
     * @param searchRequest  (optional)
     * @return Search result. (status code 200)
     *         or Invalid request (status code 400)
     */
    @Operation(
        operationId = "searchContent",
        description = "Performs search in content metadata.",
        tags = { "ContentSearch" },
        responses = {
            @ApiResponse(responseCode = "200", description = "Search result.", content = {
                @Content(mediaType = "application/json", schema = @Schema(implementation = Document.class))
            }),
            @ApiResponse(responseCode = "400", description = "Invalid request", content = {
                @Content(mediaType = "application/json", schema = @Schema(implementation = StatusMessage.class))
            })
        }
    )
    @RequestMapping(
        method = RequestMethod.POST,
        value = "/client-api/content/search",
        produces = { "application/json" },
        consumes = { "application/json" }
    )
    ResponseEntity<Set<@Valid Document>> searchContent(
        @Parameter(name = "SearchRequest", description = "") @Valid @RequestBody(required = false) SearchRequest searchRequest
    );

}
