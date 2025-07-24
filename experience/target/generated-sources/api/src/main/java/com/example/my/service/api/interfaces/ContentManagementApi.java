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
import com.example.my.service.models.DocumentToMove;
import com.example.my.service.models.DocumentToSave;
import com.example.my.service.models.ItemToRevert;
import com.example.my.service.models.QueryRequest;
import com.example.my.service.models.RemoveRequest;
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
@io.swagger.v3.oas.annotations.tags.Tag(name = "ContentManagement", description = "Handles operations on content object metadata")
public interface ContentManagementApi {

    /**
     * POST /client-api/content/move
     * Performs moving of documents.
     *
     * @param documentToMove  (optional)
     * @return Documents successfully moved. (status code 200)
     *         or Invalid request (status code 400)
     *         or Object not found (status code 404)
     */
    @Operation(
        operationId = "moveContent",
        description = "Performs moving of documents.",
        tags = { "ContentManagement" },
        responses = {
            @ApiResponse(responseCode = "200", description = "Documents successfully moved.", content = {
                @Content(mediaType = "application/json", schema = @Schema(implementation = Document.class))
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
        value = "/client-api/content/move",
        produces = { "application/json" },
        consumes = { "application/json" }
    )
    ResponseEntity<Set<@Valid Document>> moveContent(
        @Parameter(name = "DocumentToMove", description = "") @Valid @RequestBody(required = false) List<@Valid DocumentToMove> documentToMove
    );


    /**
     * POST /client-api/content/query
     * Performs a content query.
     *
     * @param queryRequest Performs a content query. (optional)
     * @return Query result. (status code 200)
     *         or Invalid request (status code 400)
     *         or Object not found (status code 404)
     */
    @Operation(
        operationId = "queryContent",
        description = "Performs a content query.",
        tags = { "ContentManagement" },
        responses = {
            @ApiResponse(responseCode = "200", description = "Query result.", content = {
                @Content(mediaType = "application/json", schema = @Schema(implementation = Document.class))
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
        value = "/client-api/content/query",
        produces = { "application/json" },
        consumes = { "application/json" }
    )
    ResponseEntity<Set<@Valid Document>> queryContent(
        @Parameter(name = "QueryRequest", description = "Performs a content query.") @Valid @RequestBody(required = false) QueryRequest queryRequest
    );


    /**
     * POST /client-api/content/remove
     * Performs deletion of documents by their ids.
     *
     * @param removeRequest Performs deletion of documents by their ids. (optional)
     * @return Documents successfully deleted. (status code 204)
     *         or Invalid request (status code 400)
     *         or Object not found (status code 404)
     *         or Conflict (status code 409)
     */
    @Operation(
        operationId = "removeContent",
        description = "Performs deletion of documents by their ids.",
        tags = { "ContentManagement" },
        responses = {
            @ApiResponse(responseCode = "204", description = "Documents successfully deleted."),
            @ApiResponse(responseCode = "400", description = "Invalid request", content = {
                @Content(mediaType = "application/json", schema = @Schema(implementation = StatusMessage.class))
            }),
            @ApiResponse(responseCode = "404", description = "Object not found", content = {
                @Content(mediaType = "application/json", schema = @Schema(implementation = StatusMessage.class))
            }),
            @ApiResponse(responseCode = "409", description = "Conflict", content = {
                @Content(mediaType = "application/json", schema = @Schema(implementation = StatusMessage.class))
            })
        }
    )
    @RequestMapping(
        method = RequestMethod.POST,
        value = "/client-api/content/remove",
        produces = { "application/json" },
        consumes = { "application/json" }
    )
    ResponseEntity<Void> removeContent(
        @Parameter(name = "RemoveRequest", description = "Performs deletion of documents by their ids.") @Valid @RequestBody(required = false) RemoveRequest removeRequest
    );


    /**
     * POST /client-api/content/revert
     * Performs documents reverting to specific versions.
     *
     * @param itemToRevert Performs documents reverting to specific versions. (optional)
     * @return Documents successfully reverted to the specified versions. (status code 200)
     *         or Invalid request (status code 400)
     *         or Object not found (status code 404)
     */
    @Operation(
        operationId = "revertContent",
        description = "Performs documents reverting to specific versions.",
        tags = { "ContentManagement" },
        responses = {
            @ApiResponse(responseCode = "200", description = "Documents successfully reverted to the specified versions.", content = {
                @Content(mediaType = "application/json", schema = @Schema(implementation = Document.class))
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
        value = "/client-api/content/revert",
        produces = { "application/json" },
        consumes = { "application/json" }
    )
    ResponseEntity<Set<@Valid Document>> revertContent(
        @Parameter(name = "ItemToRevert", description = "Performs documents reverting to specific versions.") @Valid @RequestBody(required = false) List<@Valid ItemToRevert> itemToRevert
    );


    /**
     * POST /client-api/content/save
     * Performs creation or update of documents.
     *
     * @param updateProperties Determines whether during content update properties from save request should be also updated (if true). Default value is false. (optional, default to false)
     * @param documentToSave Performs creation or update of documents. (optional)
     * @return Documents successfully created and/or updated. (status code 200)
     *         or Invalid request (status code 400)
     *         or File threat detected (status code 403)
     *         or Object not found (status code 404)
     */
    @Operation(
        operationId = "saveContent",
        description = "Performs creation or update of documents.",
        tags = { "ContentManagement" },
        responses = {
            @ApiResponse(responseCode = "200", description = "Documents successfully created and/or updated.", content = {
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
        value = "/client-api/content/save",
        produces = { "application/json" },
        consumes = { "application/json" }
    )
    ResponseEntity<Set<@Valid Document>> saveContent(
        @Parameter(name = "updateProperties", description = "Determines whether during content update properties from save request should be also updated (if true). Default value is false.") @Valid @RequestParam(value = "updateProperties", required = false, defaultValue = "false") Boolean updateProperties,
        @Parameter(name = "DocumentToSave", description = "Performs creation or update of documents.") @Valid @RequestBody(required = false) List<@Valid DocumentToSave> documentToSave
    );

}
