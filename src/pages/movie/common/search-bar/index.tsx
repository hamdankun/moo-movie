import React, { memo, useCallback, useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './styles.module.sass';

import LazyImage from '../../../../components/lazy-image';
import { RootState } from '../../../../redux/store';
import { movieActions } from '../../../../redux/slices/movie/movie';
import { MovieData } from '../../../../api/movie';

let controlDelayHideSuggestion: any = null;

const SearchBar = memo((): JSX.Element => {
    const dispatch = useDispatch();
    const inputSearchRef = useRef<null | HTMLInputElement>(null);
    const history = useHistory();

    const movieList = useSelector((state: RootState) => state.movie.data.list);
    const [keyword, setKeyword] = useState<string>('');
    const [filterStartDate, setFilterStartDate] = useState<string>('');
    const [filterEndDate, setFilterEndDate] = useState<string>('');

    const handleSubmit = useCallback(
        (e: HTMLFormElement): void => {
            e.preventDefault();
        },
        [inputSearchRef]
    );

    const handleNavigate = useCallback((movieId: string) => {
        history.push(`/movies/${movieId}`);
    }, []);

    const handleBlurInput = useCallback(() => {
        if (controlDelayHideSuggestion)
            clearTimeout(controlDelayHideSuggestion);
        controlDelayHideSuggestion = setTimeout(() => {
            setKeyword('');
        }, 500);
    }, []);

    const handleFilterInputChange = useCallback(
        (
            key: 'start_date' | 'end_date',
            e: React.ChangeEvent<HTMLInputElement>
        ) => {
            if (key === 'start_date') setFilterStartDate(e.target.value);
            if (key === 'end_date') setFilterEndDate(e.target.value);
        },
        []
    );

    const handleSetFilter = useCallback(() => {
        if (!filterStartDate) {
            alert('Please input start date!');
        } else if (!filterEndDate) {
            alert('Please input end date!');
        } else {
            dispatch(
                movieActions.setFilterPeriod({
                    start_date: filterStartDate,
                    end_date: filterEndDate,
                })
            );
        }
    }, [filterStartDate, filterEndDate]);

    const handleClearFilter = useCallback(() => {
        dispatch(
            movieActions.setFilterPeriod({
                start_date: '',
                end_date: '',
            })
        );
        setFilterStartDate('');
        setFilterEndDate('');
    }, []);

    const renderFilteredList = () => {
        return movieList
            .filter(
                (movie: MovieData) =>
                    movie.title.toLowerCase().indexOf(keyword.toLowerCase()) !==
                    -1
            )
            .map((movie: MovieData, key: number) => {
                const matchedCharacterds = movie.title.replace(
                    new RegExp(keyword, 'gi'),
                    (match) => `<mark>${match}</mark>`
                );
                return (
                    <li
                        key={key}
                        dangerouslySetInnerHTML={{ __html: matchedCharacterds }}
                        onClick={() => handleNavigate(movie.id)}
                    />
                );
            });
    };

    useEffect(() => {
        return () => {
            handleClearFilter();

            if (controlDelayHideSuggestion)
                clearTimeout(controlDelayHideSuggestion);
        };
    }, []);

    return (
        <div className={styles.container}>
            <LazyImage
                source={'http://lorempixel.com/1270/500/nature/'}
                alt="Background Drop"
                style={styles.backgroundDrop}
            />
            <div className={styles.overlay}></div>
            <div className={styles.searchContainerWrapper}>
                <h1>Welcome.</h1>
                <p>
                    Millions of movies, TV shows and people to discover. Explore
                    now.
                </p>
                <div className={styles.inputSearchWrapper}>
                    <form
                        onSubmit={(e: any) =>
                            handleSubmit(e as HTMLFormElement)
                        }
                    >
                        <input
                            autoComplete="off"
                            autoCorrect="off"
                            spellCheck={false}
                            placeholder="Search for any movie you want it!"
                            ref={inputSearchRef}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setKeyword(e.target.value)}
                            onBlur={handleBlurInput}
                        />
                        <div className={styles.filterDateRow}>
                            <input
                                type="date"
                                placeholder="Filter start date"
                                onChange={(e) =>
                                    handleFilterInputChange('start_date', e)
                                }
                                value={filterStartDate}
                            />
                            <input
                                type="date"
                                placeholder="Filter end date"
                                onChange={(e) =>
                                    handleFilterInputChange('end_date', e)
                                }
                                value={filterEndDate}
                            />
                            <button
                                type="button"
                                className={styles.btnFilter}
                                onClick={handleSetFilter}
                            >
                                Filter
                            </button>
                            <button
                                type="button"
                                className={styles.btnClear}
                                onClick={handleClearFilter}
                            >
                                Clear
                            </button>
                        </div>
                    </form>
                    {keyword ? (
                        <ul className={styles.searchSuggestion}>
                            {renderFilteredList()}
                        </ul>
                    ) : null}
                </div>
            </div>
        </div>
    );
});

export default SearchBar;
