import { memo, Suspense } from 'react';
import { Img } from 'react-image';

import styles from './styles.module.sass';

import ActivityIndicator from './../activity-indicator';

type LazyImageProps = {
    source: string;
    alt: string;
    style?: string;
};

export default memo(({ source, alt, style }: LazyImageProps): JSX.Element => {
    return (
        <Img src={source} loader={<ActivityIndicator />} className={style} />
    );
});
