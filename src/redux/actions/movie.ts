import { RootState } from '../store';
import { movieActions } from '../slices/movie/movie';
import { getMovieService, MovieData } from '../../api/movie';
import { catchHttpError } from '../../helpers/http';
import { createAsyncThunk } from '@reduxjs/toolkit';

export type MovieGetActionParams = {
    movieId?: number;
};

export const movieGetDataAction = createAsyncThunk(
    'actions/movie/get-data',
    async (payload: MovieGetActionParams, thunkAPI) => {
        try {
            let dynamicResponse: Array<MovieData> | MovieData;
            let getType: 'list' | 'detail' = payload.movieId
                ? 'detail'
                : 'list';

            if (getType === 'list') {
                dynamicResponse = await getMovieService<Array<MovieData>>();
            } else {
                dynamicResponse = await getMovieService<MovieData>(
                    payload.movieId
                );
            }

            if (getType === 'list') {
                thunkAPI.dispatch(
                    movieActions.setDataList(
                        dynamicResponse as Array<MovieData>
                    )
                );
            } else {
                thunkAPI.dispatch(
                    movieActions.setDataDetail(dynamicResponse as MovieData)
                );
            }
        } catch (e) {
            return thunkAPI.rejectWithValue(catchHttpError(e));
        }
    }
);
