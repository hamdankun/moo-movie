import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { initialState, ProsessingState } from './common/interface';
import { reducerActionsContact } from './common/reducers-actions';
import { movieGetDataAction } from './../../actions/movie';

type ExtraReducersParams = { meta: { [key: string]: any } };

const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        ...reducerActionsContact,
    },
    extraReducers: {
        [`${movieGetDataAction.pending}`]: (
            state,
            payload: ExtraReducersParams
        ) => {
            state.prosessing[_getKeyProsessingByProsessingStatus(payload)] =
                true;
        },
        [`${movieGetDataAction.fulfilled}`]: (
            state,
            payload: ExtraReducersParams
        ) => {
            state.prosessing[_getKeyProsessingByProsessingStatus(payload)] =
                false;
        },
        [`${movieGetDataAction.rejected}`]: (
            state,
            payload: ExtraReducersParams
        ) => {
            state.prosessing[_getKeyProsessingByProsessingStatus(payload)] =
                false;
        },
    },
});

function _getProssessingStatus(payload: ExtraReducersParams): boolean {
    return payload.meta.arg && payload.meta.arg.movieId;
}

function _getKeyProsessingByProsessingStatus(
    payload: ExtraReducersParams
): 'isFetchingDetail' | 'isFetchingList' {
    const isGetDetailProses = _getProssessingStatus(payload);
    return isGetDetailProses ? `isFetchingDetail` : `isFetchingList`;
}

export const movieActions = movieSlice.actions;

export default movieSlice.reducer;
