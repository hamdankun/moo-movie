/** @format */

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import apiConfig from './../config/api';

const createBaseHttpRequest = (baseURL: string) =>
    axios.create({
        baseURL,
        ...apiConfig.commonConfig,
    });

type HTTPRequestLogger<T> = {
    path: string;
    method: string;
    body: T;
};

export type HttpMethod = {
    getHttpRequest: <T>(
        path: string,
        additionalConfig?: AxiosRequestConfig
    ) => Promise<T>;
};

const httpRequestLogger: Function = ({
    path,
    method,
    body,
}: HTTPRequestLogger<object>) => {
    if (apiConfig.debug) {
        console.log(`[HTTP REQUEST][${method}]`, path, body);
    }
};

export default (baseURL: string = apiConfig.service.main): HttpMethod => ({
    /**
     * GET HTTP Request
     */
    getHttpRequest: <T>(
        path: string,
        additionalConfig?: AxiosRequestConfig
    ): Promise<T> => {
        httpRequestLogger({ path, additionalConfig, method: 'GET' });
        return createBaseHttpRequest(baseURL)
            .get(path, additionalConfig)
            .then((response) => response.data);
    },
});
