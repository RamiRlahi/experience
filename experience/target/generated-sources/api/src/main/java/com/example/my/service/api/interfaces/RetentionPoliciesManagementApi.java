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

import com.example.my.service.models.RetentionPolicy;
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
@io.swagger.v3.oas.annotations.tags.Tag(name = "RetentionPoliciesManagement", description = "Handles operation on Retention policies")
public interface RetentionPoliciesManagementApi {

    /**
     * POST /client-api/repositories/{repositoryId}/retention-policies
     * Returns a list of retention policies added to the given repository.
     *
     * @param repositoryId The Identifier of the Repository to process. (required)
     * @param requestBody  (optional)
     * @return Retention Policies successfully addded to the reposity. (status code 200)
     *         or Object not found (status code 404)
     */
    @Operation(
        operationId = "addRetentionPoliciesForRepository",
        description = "Returns a list of retention policies added to the given repository.",
        tags = { "RetentionPoliciesManagement" },
        responses = {
            @ApiResponse(responseCode = "200", description = "Retention Policies successfully addded to the reposity.", content = {
                @Content(mediaType = "application/json", schema = @Schema(implementation = RetentionPolicy.class))
            }),
            @ApiResponse(responseCode = "404", description = "Object not found", content = {
                @Content(mediaType = "application/json", schema = @Schema(implementation = StatusMessage.class))
            })
        }
    )
    @RequestMapping(
        method = RequestMethod.POST,
        value = "/client-api/repositories/{repositoryId}/retention-policies",
        produces = { "application/json" },
        consumes = { "application/json" }
    )
    ResponseEntity<List<@Valid RetentionPolicy>> addRetentionPoliciesForRepository(
        @Parameter(name = "repositoryId", description = "The Identifier of the Repository to process.", required = true) @PathVariable("repositoryId") String repositoryId,
        @Parameter(name = "request_body", description = "") @Valid @RequestBody(required = false) Set<String> requestBody
    );


    /**
     * POST /client-api/retention-policies
     * Creates a retention policy.
     *
     * @param retentionPolicy Retention Policy to create. (required)
     * @return Retention poolicy successfully created. (status code 201)
     *         or Invalid request (status code 400)
     *         or Conflict (status code 409)
     */
    @Operation(
        operationId = "createRetentionPolicy",
        description = "Creates a retention policy.",
        tags = { "RetentionPoliciesManagement" },
        responses = {
            @ApiResponse(responseCode = "201", description = "Retention poolicy successfully created.", content = {
                @Content(mediaType = "application/json", schema = @Schema(implementation = RetentionPolicy.class))
            }),
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
        value = "/client-api/retention-policies",
        produces = { "application/json" },
        consumes = { "application/json" }
    )
    ResponseEntity<RetentionPolicy> createRetentionPolicy(
        @Parameter(name = "RetentionPolicy", description = "Retention Policy to create.", required = true) @Valid @RequestBody RetentionPolicy retentionPolicy
    );


    /**
     * DELETE /client-api/retention-policies/{policyId}
     * Deletes a retention policy.
     *
     * @param policyId The Identifier of the Retention policy to process. (required)
     * @return Retention Policy was successfully deleted. (status code 204)
     *         or Object not found (status code 404)
     */
    @Operation(
        operationId = "deleteRetentionPolicy",
        description = "Deletes a retention policy.",
        tags = { "RetentionPoliciesManagement" },
        responses = {
            @ApiResponse(responseCode = "204", description = "Retention Policy was successfully deleted."),
            @ApiResponse(responseCode = "404", description = "Object not found", content = {
                @Content(mediaType = "application/json", schema = @Schema(implementation = StatusMessage.class))
            })
        }
    )
    @RequestMapping(
        method = RequestMethod.DELETE,
        value = "/client-api/retention-policies/{policyId}",
        produces = { "application/json" }
    )
    ResponseEntity<Void> deleteRetentionPolicy(
        @Parameter(name = "policyId", description = "The Identifier of the Retention policy to process.", required = true) @PathVariable("policyId") String policyId
    );


    /**
     * DELETE /client-api/repositories/{repositoryId}/retention-policies
     * detach all Retention Policies of a given repositoryId.
     *
     * @param repositoryId The Identifier of the Repository to process. (required)
     * @param requestBody  (optional)
     * @return Retention Policies were successfully detached. (status code 200)
     *         or Object not found (status code 404)
     */
    @Operation(
        operationId = "detachRetentionPolicies",
        description = "detach all Retention Policies of a given repositoryId.",
        tags = { "RetentionPoliciesManagement" },
        responses = {
            @ApiResponse(responseCode = "200", description = "Retention Policies were successfully detached.", content = {
                @Content(mediaType = "application/json", schema = @Schema(implementation = RetentionPolicy.class))
            }),
            @ApiResponse(responseCode = "404", description = "Object not found", content = {
                @Content(mediaType = "application/json", schema = @Schema(implementation = StatusMessage.class))
            })
        }
    )
    @RequestMapping(
        method = RequestMethod.DELETE,
        value = "/client-api/repositories/{repositoryId}/retention-policies",
        produces = { "application/json" },
        consumes = { "application/json" }
    )
    ResponseEntity<List<@Valid RetentionPolicy>> detachRetentionPolicies(
        @Parameter(name = "repositoryId", description = "The Identifier of the Repository to process.", required = true) @PathVariable("repositoryId") String repositoryId,
        @Parameter(name = "request_body", description = "") @Valid @RequestBody(required = false) Set<String> requestBody
    );


    /**
     * GET /client-api/retention-policies
     * Returns all the existent retention policies
     *
     * @return Returns all the retention policies found. (status code 200)
     */
    @Operation(
        operationId = "getAllRetentionPolicies",
        description = "Returns all the existent retention policies",
        tags = { "RetentionPoliciesManagement" },
        responses = {
            @ApiResponse(responseCode = "200", description = "Returns all the retention policies found.", content = {
                @Content(mediaType = "application/json", schema = @Schema(implementation = RetentionPolicy.class))
            })
        }
    )
    @RequestMapping(
        method = RequestMethod.GET,
        value = "/client-api/retention-policies",
        produces = { "application/json" }
    )
    ResponseEntity<List<@Valid RetentionPolicy>> getAllRetentionPolicies(
        
    );


    /**
     * GET /client-api/repositories/{repositoryId}/retention-policies
     * Returns a list of retention policies for a reposity.
     *
     * @param repositoryId The Identifier of the Repository to process. (required)
     * @return Retention Policies successfully returned. (status code 200)
     *         or Object not found (status code 404)
     */
    @Operation(
        operationId = "getRetentionPoliciesForRepository",
        description = "Returns a list of retention policies for a reposity.",
        tags = { "RetentionPoliciesManagement" },
        responses = {
            @ApiResponse(responseCode = "200", description = "Retention Policies successfully returned.", content = {
                @Content(mediaType = "application/json", schema = @Schema(implementation = RetentionPolicy.class))
            }),
            @ApiResponse(responseCode = "404", description = "Object not found", content = {
                @Content(mediaType = "application/json", schema = @Schema(implementation = StatusMessage.class))
            })
        }
    )
    @RequestMapping(
        method = RequestMethod.GET,
        value = "/client-api/repositories/{repositoryId}/retention-policies",
        produces = { "application/json" }
    )
    ResponseEntity<List<@Valid RetentionPolicy>> getRetentionPoliciesForRepository(
        @Parameter(name = "repositoryId", description = "The Identifier of the Repository to process.", required = true) @PathVariable("repositoryId") String repositoryId
    );


    /**
     * GET /client-api/retention-policies/{policyId}
     * Returns the requested retention policy.
     *
     * @param policyId The Identifier of the Retention policy to process. (required)
     * @return Retention Policy successfully returned. (status code 200)
     *         or Object not found (status code 404)
     */
    @Operation(
        operationId = "getRetentionPolicy",
        description = "Returns the requested retention policy.",
        tags = { "RetentionPoliciesManagement" },
        responses = {
            @ApiResponse(responseCode = "200", description = "Retention Policy successfully returned.", content = {
                @Content(mediaType = "application/json", schema = @Schema(implementation = RetentionPolicy.class))
            }),
            @ApiResponse(responseCode = "404", description = "Object not found", content = {
                @Content(mediaType = "application/json", schema = @Schema(implementation = StatusMessage.class))
            })
        }
    )
    @RequestMapping(
        method = RequestMethod.GET,
        value = "/client-api/retention-policies/{policyId}",
        produces = { "application/json" }
    )
    ResponseEntity<RetentionPolicy> getRetentionPolicy(
        @Parameter(name = "policyId", description = "The Identifier of the Retention policy to process.", required = true) @PathVariable("policyId") String policyId
    );


    /**
     * POST /client-api/retention-policies/run/{repositoryId}
     * Runs the given retention policies to the specified repositoryId.
     *
     * @param repositoryId The Identifier of the repository to use for the retention policies check. (required)
     * @param requestBody Retention policies to run on this repository. (optional)
     * @return Retention Policies check successfully triggered. (status code 202)
     *         or Invalid request (status code 400)
     *         or Object not found (status code 404)
     */
    @Operation(
        operationId = "runRetentionPolicy",
        description = "Runs the given retention policies to the specified repositoryId.",
        tags = { "RetentionPoliciesManagement" },
        responses = {
            @ApiResponse(responseCode = "202", description = "Retention Policies check successfully triggered.", content = {
                @Content(mediaType = "text/plain", schema = @Schema(implementation = String.class)),
                @Content(mediaType = "application/json", schema = @Schema(implementation = String.class))
            }),
            @ApiResponse(responseCode = "400", description = "Invalid request", content = {
                @Content(mediaType = "text/plain", schema = @Schema(implementation = StatusMessage.class)),
                @Content(mediaType = "application/json", schema = @Schema(implementation = StatusMessage.class))
            }),
            @ApiResponse(responseCode = "404", description = "Object not found", content = {
                @Content(mediaType = "text/plain", schema = @Schema(implementation = StatusMessage.class)),
                @Content(mediaType = "application/json", schema = @Schema(implementation = StatusMessage.class))
            })
        }
    )
    @RequestMapping(
        method = RequestMethod.POST,
        value = "/client-api/retention-policies/run/{repositoryId}",
        produces = { "text/plain", "application/json" },
        consumes = { "application/json" }
    )
    ResponseEntity<String> runRetentionPolicy(
        @Parameter(name = "repositoryId", description = "The Identifier of the repository to use for the retention policies check.", required = true) @PathVariable("repositoryId") String repositoryId,
        @Parameter(name = "request_body", description = "Retention policies to run on this repository.") @Valid @RequestBody(required = false) Set<String> requestBody
    );


    /**
     * PUT /client-api/retention-policies/{policyId}
     * Updates a retention policy.
     *
     * @param policyId The Identifier of the Retention policy to process. (required)
     * @param retentionPolicy Request Policy to update. (required)
     * @return Retention poolicy successfully updated. (status code 200)
     *         or Invalid request (status code 400)
     *         or Conflict (status code 409)
     */
    @Operation(
        operationId = "updateRetentionPolicyforRepository",
        description = "Updates a retention policy.",
        tags = { "RetentionPoliciesManagement" },
        responses = {
            @ApiResponse(responseCode = "200", description = "Retention poolicy successfully updated.", content = {
                @Content(mediaType = "application/json", schema = @Schema(implementation = RetentionPolicy.class))
            }),
            @ApiResponse(responseCode = "400", description = "Invalid request", content = {
                @Content(mediaType = "application/json", schema = @Schema(implementation = StatusMessage.class))
            }),
            @ApiResponse(responseCode = "409", description = "Conflict", content = {
                @Content(mediaType = "application/json", schema = @Schema(implementation = StatusMessage.class))
            })
        }
    )
    @RequestMapping(
        method = RequestMethod.PUT,
        value = "/client-api/retention-policies/{policyId}",
        produces = { "application/json" },
        consumes = { "application/json" }
    )
    ResponseEntity<RetentionPolicy> updateRetentionPolicyforRepository(
        @Parameter(name = "policyId", description = "The Identifier of the Retention policy to process.", required = true) @PathVariable("policyId") String policyId,
        @Parameter(name = "RetentionPolicy", description = "Request Policy to update.", required = true) @Valid @RequestBody RetentionPolicy retentionPolicy
    );

}
