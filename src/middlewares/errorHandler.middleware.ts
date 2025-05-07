import { Prisma } from '@prisma/client';
import { extractForeignKeyColumn } from '../utils/extractForeignKeyColumn';
import { HttpResponse } from '../utils/httpResponseCode';

const errorHandler = (err, req, res, next) => {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        const foreignKeyErrorColumn = extractForeignKeyColumn(err.meta);
        const prismaErrorMap = {
            P2002: HttpResponse.CONFLICT,
            P2003: HttpResponse.BAD_REQUEST(`Foreign key constraint failed on the field: ${foreignKeyErrorColumn}`),
            P2025: HttpResponse.NOT_FOUND,
        };

        const errorResponse = prismaErrorMap[err.code] || HttpResponse.DATABASE_ERROR;

        return res.status(errorResponse.status).json({
            success: false,
            error: errorResponse,
        });
    }

    if (err instanceof Prisma.PrismaClientValidationError) {
        const errorResponse = HttpResponse.BAD_REQUEST('Invalid input data format');
        return res.status(errorResponse.status).json({
            success: false,
            error: errorResponse,
        });
    }

    if (err instanceof Prisma.PrismaClientRustPanicError) {
        const errorResponse = HttpResponse.UNEXPECTED_DATABASE_FAILURE;
        return res.status(errorResponse.status).json({
            success: false,
            error: errorResponse,
        });
    }

    return res.status(500).json({
        success: false,
        error: {
            message: err.message || 'An unexpected error occurred',
            status: 500,
        },
    });
};

export default errorHandler;
