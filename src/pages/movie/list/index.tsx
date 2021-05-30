import { memo, useCallback, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SearchBar from '../common/search-bar';
import ListView from '../common/list-view';

import { RootState } from '../../../redux/store';
import { movieGetDataAction } from '../../../redux/actions/movie';
import { ResponseDispatchType } from '../../../helpers/http';

export default memo((): JSX.Element => {
    const dispatch = useDispatch();

    const isFetching = useSelector(
        (state: RootState) => state.movie.prosessing.isFetchingList
    ) as boolean;

    const data = useSelector((state: RootState) => state.movie.data.list);

    const fetchData = useCallback(() => {
        dispatch<any>(movieGetDataAction({})).catch(
            (response: ResponseDispatchType) =>
                response.status === 'error'
                    ? alert('Whoops, Someting Went Wrong, Please Reload Again')
                    : null
        );
    }, []);

    useLayoutEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <SearchBar />
            <ListView loading={isFetching} data={data} />
        </>
    );
});
