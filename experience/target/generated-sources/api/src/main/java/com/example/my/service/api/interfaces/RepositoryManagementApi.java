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

import com.example.my.service.models.Repository;
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
@io.swagger.v3.oas.annotations.tags.Tag(name = "RepositoryManagement", description = "Handles operations on repositories")
public interface RepositoryManagementApi {

    /**
     * POST /client-api/repositories/{srcRepositoryId}/copy/{dstRepositoryId}
     * Copies the content of the source repository to the destination repository.
     *
     * @param srcRepositoryId Repository Id to copy from (required)
     * @param dstRepositoryId Repository Id to copy to (required)
     * @return Content successfully copied. (status code 200)
     *         or Object not found (status code 404)
     */
    @Operation(
        operationId = "copyRepository",
        description = "Copies the content of the source repository to the destination repository.",
        tags = { "RepositoryManagement" },
        responses = {
            @ApiResponse(responseCode = "200", description = "Content successfully copied."),
            @ApiResponse(responseCode = "404", description = "Object not found", content = {
                @Content(mediaType = "application/json", schema = @Schema(implementation = StatusMessage.class))
            })
        }
    )
    @RequestMapping(
        method = RequestMethod.POST,
        value = "/client-api/repositories/{srcRepositoryId}/copy/{dstRepositoryId}",
        produces = { "application/json" }
    )
    ResponseEntity<Void> copyRepository(
        @Parameter(name = "srcRepositoryId", description = "Repository Id to copy from", required = true) @PathVariable("srcRepositoryId") String srcRepositoryId,
        @Parameter(name = "dstRepositoryId", description = "Repository Id to copy to", required = true) @PathVariable("dstRepositoryId") String dstRepositoryId
    );


    /**
     * POST /client-api/repositories
     * Creates repositories.
     *
     * @param repository A list of repositories to be created. (optional)
     * @return Repository are successfully created. (status code 201)
     *         or Invalid request (status code 400)
     *         or Conflict (status code 409)
     */
    @Operation(
        operationId = "createRepositories",
        description = "Creates repositories.",
        tags = { "RepositoryManagement" },
        responses = {
            @ApiResponse(responseCode = "201", description = "Repository are successfully created."),
            @ApiResponse(responseCode = "400", description = "Invalid request", content = {
                @Content(mediaType = "application/json", schema = @Schema(implementation = StatusMessage.class))
            }),
            @ApiResponse(responseCode = "409", description = "Conflict", content = {
                @Content(mediaType = "application/json", schema = @Schema(implementation = StatusMessage.class))
            })
        }
    )
    @RequestMapping(
        method = RequestMethod.POST,
        value = "/client-api/repositories",
        produces = { "application/json" },
        consumes = { "application/json" }
    )
    ResponseEntity<Void> createRepositories(
        @Parameter(name = "Repository", description = "A list of repositories to be created.") @Valid @RequestBody(required = false) List<@Valid Repository> repository
    );


    /**
     * DELETE /client-api/repositories/{repositoryId}
     * Deletes a repository. If an external storage is configured for the repository, then behavior differs based on exact implementation of external storage connector. By default (in Backbase C3 implementations), contents remain in the external storage and just the database reference will be removed.
     *
     * @param repositoryId The Identifier of the Repository to process. (required)
     * @return Repository was successfully deleted. (status code 204)
     *         or Object not found (status code 404)
     */
    @Operation(
        operationId = "deleteRepository",
        description = "Deletes a repository. If an external storage is configured for the repository, then behavior differs based on exact implementation of external storage connector. By default (in Backbase C3 implementations), contents remain in the external storage and just the database reference will be removed.",
        tags = { "RepositoryManagement" },
        responses = {
            @ApiResponse(responseCode = "204", description = "Repository was successfully deleted."),
            @ApiResponse(responseCode = "404", description = "Object not found", content = {
                @Content(mediaType = "application/json", schema = @Schema(implementation = StatusMessage.class))
            })
        }
    )
    @RequestMapping(
        method = RequestMethod.DELETE,
        value = "/client-api/repositories/{repositoryId}",
        produces = { "application/json" }
    )
    ResponseEntity<Void> deleteRepository(
        @Parameter(name = "repositoryId", description = "The Identifier of the Repository to process.", required = true) @PathVariable("repositoryId") String repositoryId
    );


    /**
     * GET /client-api/repositories/{repositoryId}
     * Returns a repository definition.
     *
     * @param repositoryId The Identifier of the Repository to process. (required)
     * @return Repository successfully returned. (status code 200)
     *         or Object not found (status code 404)
     */
    @Operation(
        operationId = "getRepository",
        description = "Returns a repository definition.",
        tags = { "RepositoryManagement" },
        responses = {
            @ApiResponse(responseCode = "200", description = "Repository successfully returned.", content = {
                @Content(mediaType = "application/json", schema = @Schema(implementation = Repository.class))
            }),
            @ApiResponse(responseCode = "404", description = "Object not found", content = {
                @Content(mediaType = "application/json", schema = @Schema(implementation = StatusMessage.class))
            })
        }
    )
    @RequestMapping(
        method = RequestMethod.GET,
        value = "/client-api/repositories/{repositoryId}",
        produces = { "application/json" }
    )
    ResponseEntity<Repository> getRepository(
        @Parameter(name = "repositoryId", description = "The Identifier of the Repository to process.", required = true) @PathVariable("repositoryId") String repositoryId
    );

}
