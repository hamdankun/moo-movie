import http from '../libraries/http';

const httpClient = http(process.env.REACT_APP_API_URL);

export type MovieData = {
    id: string;
    showTime: string;
    title: string;
    image: string;
    like: number;
};

export const getMovieService = <T>(movieId?: number): Promise<T> =>
    httpClient.getHttpRequest<T>(`movies${movieId ? '/' + movieId : ''}`);
