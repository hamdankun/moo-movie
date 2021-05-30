import { MovieData } from '../../../../api/movie';

export type ProsessingState = {
    isFetchingList?: boolean;
    isFetchingDetail?: boolean;
};

export type GenericStateMovie = {
    prosessing: ProsessingState;
    data: {
        list: Array<MovieData>;
        detail: MovieData;
    };
    filter: {
        period?: {
            start_date: string;
            end_date: string;
        };
    };
};

export const initialState: GenericStateMovie = {
    prosessing: {},
    data: {
        list: [],
        detail: {
            id: '0',
            title: '',
            image: '',
            like: 0,
            showTime: '',
        },
    },
    filter: {},
};
