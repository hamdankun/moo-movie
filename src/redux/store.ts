import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import movie from './slices/movie/movie';

export const store = configureStore({
    reducer: {
        movie,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
