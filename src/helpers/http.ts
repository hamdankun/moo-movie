import api from './../config/api';

export type GeneralErrorResponse = {
    message: string;
    response?: {
        data: {
            code: number;
            code_type: string;
            code_message: string;
        };
    };
};

export type ResponseDispatchType = {
    status: 'success' | 'error';
    message?: string;
};

export const catchHttpError = (
    response: GeneralErrorResponse
): Promise<{ status: 'success' | 'error'; message: string }> => {
    if (api.debug) console.log(response.message);

    return Promise.reject({
        status: 'error',
        message:
            response.message || api.commonResponseMessage.INTERNAL_SERVER_ERROR,
    });
};

export const ERROR_MESSAGE: { [key: string]: string } = {
    INTERNAL_SERVER_ERROR: 'Terjadi Kesalahan',
};
