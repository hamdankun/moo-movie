import { memo, useCallback } from 'react';
import Icon from '@material/react-material-icon';
import { useHistory } from 'react-router-dom';

import styles from './styles.module.sass';
import { formatDate } from '../../../../helpers/date';

import { MovieData } from '../../../../api/movie';
import LazyImage from './../../../../components/lazy-image';

type CardProps = {
    item: MovieData;
    keyIndex: number;
};

const Card = memo(({ item }: CardProps): JSX.Element | null => {
    const history = useHistory();

    const { id, title, showTime, image, like } = item;

    const handleNavigate = useCallback(() => {
        history.push(`/movies/${id}`);
    }, []);

    return (
        <div className={styles.container} onClick={handleNavigate}>
            <LazyImage
                source={image}
                alt={item.title}
                style={styles.cardImage}
            />
            <div className={styles.informationWrapper}>
                <span className={styles.titleLabel}>{title}</span>
                <span>{formatDate(showTime)}</span>
            </div>
            <div className={styles.likeIndicator}>
                <Icon icon="favorite_border" />
                {like}
            </div>
        </div>
    );
});

export default Card;
