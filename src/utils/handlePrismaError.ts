import { Prisma } from '@prisma/client';
import AppError from './appError';

export function handlePrismaError(error: any): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
            case 'P2003':
                const foreignKeyErrorColumn = extractForeignKeyColumn(error.meta);
                throw new AppError(
                    `Invalid reference: ${foreignKeyErrorColumn} not found`,
                    400
                );

            case 'P2025':
                throw new AppError('Record not found or already deleted', 404);

            case 'P2002':
                throw new AppError('Duplicate record violates unique constraint', 409);

            default:
                throw new AppError('Database error occurred', 500);
        }
    }

    if (error instanceof Prisma.PrismaClientValidationError) {
        throw new AppError('Invalid input data format', 400);
    }

    if (error instanceof Prisma.PrismaClientRustPanicError) {
        throw new AppError('Unexpected database failure', 500, false);
    }

    throw new AppError('Unexpected database error', 500);
}

function extractForeignKeyColumn(meta: any): string {
    console.log('Meta:', meta);
    if (meta && meta.constraint) {
        const match = meta.constraint.match(/_(.+?)_fkey/);
        if (match && match[1]) {
            return match[1];
        }
    }

    return 'Unknown field';
}
