import React, { useLayoutEffect, useCallback, memo } from 'react';
import { useRouteMatch } from 'react-router';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import Icon from '@material/react-material-icon';

import styles from './styles.module.sass';

import ActivityIndicator from '../../../components/activity-indicator';
import LazyImage from '../../../components/lazy-image';

import { movieGetDataAction } from '../../../redux/actions/movie';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { GeneralErrorResponse } from '../../../helpers/http';
import { MovieData } from '../../../api/movie';
import { formatDate } from '../../../helpers/date';

export default memo((): JSX.Element => {
    const dispatch = useDispatch();

    const { image, title, showTime, like } = useSelector(
        (state: RootState) => state.movie.data.detail
    ) as MovieData;
    const isFetching = useSelector(
        (state: RootState) => state.movie.prosessing.isFetchingDetail
    ) as boolean;

    const {
        params: { movieId },
    } = useRouteMatch<{ movieId: string }>();

    const fetchData = useCallback(() => {
        dispatch<any>(movieGetDataAction({ movieId: parseInt(movieId) }))
            .then(unwrapResult)
            .catch((error: GeneralErrorResponse) => alert(error.message));
    }, []);

    const renderContent = () => (
        <ContainerBackground url={image}>
            <div className={styles.row}>
                <Poster url={image} title={title} />
                <Information title={title} like={like} showTime={showTime} />
            </div>
        </ContainerBackground>
    );

    useLayoutEffect(() => {
        fetchData();
    }, []);

    return (
        <div className={styles.container}>
            {isFetching ? <ActivityIndicator /> : renderContent()}
        </div>
    );
});

type ContainerBackgroundProps = {
    url: string;
    children: React.ReactChild;
};

const ContainerBackground = memo(
    ({ url, children }: ContainerBackgroundProps): JSX.Element => (
        <>
            <LazyImage
                source={url}
                alt="movie background"
                style={styles.containerBackground}
            />
            <div className={styles.content}>{children}</div>
        </>
    )
);

type PosterProps = {
    url: string;
    title: string;
};

const Poster = memo(
    ({ url, title }: PosterProps): JSX.Element => (
        <LazyImage source={url} alt={title} style={styles.poster} />
    )
);

type InformationProps = {
    title: string;
    like: number;
    showTime: string;
};

const Information = memo(
    ({ title, like, showTime }: InformationProps): JSX.Element => (
        <div className={styles.informationWrapper}>
            <h1>
                {title} {showTime ? `(${formatDate(showTime, 'yyyy')})` : ''}
            </h1>
            <div className={styles.likeIndicator}>
                <Icon icon="favorite_border" />
                {like}
            </div>
            <div className={styles.overview}>
                <span>Overview</span>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Ipsum in exercitationem repudiandae labore enim? Autem quis
                    aspernatur, assumenda, nisi numquam debitis voluptatem
                    ipsam, illo ratione voluptatibus neque expedita ipsum iure.
                </p>
                <p className={styles.creator}>Creator : Hamdan Kun</p>
            </div>
        </div>
    )
);
