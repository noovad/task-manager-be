export const HttpResponse = {
    /**
     * Success Responses
     */
    OK: {
        status: 200,
        message: "OK",
        code: "OK",
    },
    CREATED: {
        status: 201,
        message: "Created",
        code: "CREATED",
    },

    /**
     * Client Error Responses
     */
    BAD_REQUEST: (customMessage?: string) => ({
        status: 400,
        message: customMessage || "Bad Request",
        code: "BAD_REQUEST",
    }),
    CONFLICT: {
        status: 409,
        message: "Conflict",
        code: "CONFLICT",
    },
    UNAUTHORIZED: {
        status: 401,
        message: "Unauthorized",
        code: "UNAUTHORIZED",
    },
    FORBIDDEN: {
        status: 403,
        message: "Forbidden",
        code: "FORBIDDEN",
    },
    NOT_FOUND: {
        status: 404,
        message: "Not Found",
        code: "NOT_FOUND",
    },

    /**
     * Server Error Responses
     */
    INTERNAL_SERVER_ERROR: {
        status: 500,
        message: "Internal Server Error",
        code: "INTERNAL_SERVER_ERROR",
    },
    SERVICE_UNAVAILABLE: {
        status: 503,
        message: "Service Unavailable",
        code: "SERVICE_UNAVAILABLE",
    },

    /**
     * Database Error Responses
     */
    DATABASE_ERROR: {
        status: 500,
        message: "Database Error",
        code: "DATABASE_ERROR",
    },
    UNEXPECTED_DATABASE_FAILURE: {
        status: 500,
        message: "Unexpected Database Failure",
        code: "UNEXPECTED_DATABASE_FAILURE",
    },
};
