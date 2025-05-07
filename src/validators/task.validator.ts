import { checkSchema } from 'express-validator';

export const createTaskValidator = checkSchema({
    projectId: {
        in: ['body'],
        errorMessage: 'Project ID is required',
        isUUID: {
            errorMessage: 'Project ID must be a valid UUID',
        },
    },

    title: {
        in: ['body'],
        errorMessage: 'Title is required',
        isLength: {
            options: { min: 3 },
            errorMessage: 'Title must be at least 3 characters',
        },
        trim: true,
    },

    priority: {
        in: ['body'],
        errorMessage: 'Priority is required',
        isIn: {
            options: [['LOW', 'MEDIUM', 'HIGH']],
            errorMessage: 'Priority must be LOW, MEDIUM, or HIGH',
        },
    },

    assignedUserId: {
        in: ['body'],
        errorMessage: 'Assigned user ID is required',
        isUUID: {
            errorMessage: 'Assigned user ID must be a valid UUID',
        },
    },

    dueDate: {
        in: ['body'],
        errorMessage: 'Due date is required',
        isISO8601: {
            errorMessage: 'Due date must be a valid ISO 8601 date',
        },
        toDate: true,
    },

    status: {
        in: ['body'],
        errorMessage: 'Status is required',
        isIn: {
            options: [['TODO', 'IN_PROGRESS', 'DONE']],
            errorMessage: 'Status must be TODO, IN_PROGRESS, or DONE',
        },
    },

    description: {
        in: ['body'],
        optional: true,
        isString: {
            errorMessage: 'Description must be a string',
        },
    },

    notes: {
        in: ['body'],
        optional: true,
        isString: {
            errorMessage: 'Notes must be a string',
        },
    },
});
