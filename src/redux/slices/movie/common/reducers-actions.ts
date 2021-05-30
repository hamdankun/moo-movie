import { PayloadAction } from '@reduxjs/toolkit';
import { MovieData } from '../../../../api/movie';
import { GenericStateMovie } from './interface';

export const reducerActionsContact = {
    setDataList: (
        state: GenericStateMovie,
        action: PayloadAction<Array<MovieData>>
    ) => {
        state.data.list = action.payload;
    },
    setDataDetail: (
        state: GenericStateMovie,
        action: PayloadAction<MovieData>
    ) => {
        state.data.detail = action.payload;
    },
    setFilterPeriod: (
        state: GenericStateMovie,
        action: PayloadAction<{ start_date: string; end_date: string }>
    ) => {
        state.filter.period = action.payload;
    },
};
