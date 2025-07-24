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

import com.example.my.service.models.SignedUrlRequest;
import com.example.my.service.models.SignedUrlResponse;
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
@io.swagger.v3.oas.annotations.tags.Tag(name = "SignedUrl", description = "Handles generation of signed url")
public interface SignedUrlApi {

    /**
     * POST /client-api/content/signedUrl
     * Create signed url for document.
     *
     * @param signedUrlRequest Create signed url request. (optional)
     * @return Signed URL generated successfully. (status code 201)
     *         or Invalid request (status code 400)
     *         or Object not found (status code 404)
     */
    @Operation(
        operationId = "createSignedUrl",
        description = "Create signed url for document.",
        tags = { "SignedUrl" },
        responses = {
            @ApiResponse(responseCode = "201", description = "Signed URL generated successfully.", content = {
                @Content(mediaType = "application/json", schema = @Schema(implementation = SignedUrlResponse.class))
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
        value = "/client-api/content/signedUrl",
        produces = { "application/json" },
        consumes = { "application/json" }
    )
    ResponseEntity<SignedUrlResponse> createSignedUrl(
        @Parameter(name = "SignedUrlRequest", description = "Create signed url request.") @Valid @RequestBody(required = false) SignedUrlRequest signedUrlRequest
    );

}
