import { memo } from 'react';
import dsParseISO from 'date-fns/parseISO';
import dsParse from 'date-fns/parse';
import dsIsBefore from 'date-fns/isBefore';
import dsIsAfter from 'date-fns/isAfter';

import styles from './styles.module.sass';

import ActivityIndicator from '../../../../components/activity-indicator';

import Card from '../card';
import { MovieData } from '../../../../api/movie';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';

type ListViewProps = {
    loading: boolean;
    data: Array<MovieData>;
};

const ListView = memo(
    ({ loading = false, data }: ListViewProps): JSX.Element => {
        const filter = useSelector((state: RootState) => state.movie.filter);

        const filteredList = useCallback((): Array<MovieData> => {
            if (
                filter.period &&
                filter.period.start_date &&
                filter.period.end_date
            ) {
                const startDateParse = dsParse(
                    filter.period.start_date,
                    'yyyy-MM-dd',
                    new Date()
                );
                const endDateParse = dsParse(
                    filter.period.end_date,
                    'yyyy-MM-dd',
                    new Date()
                );
                return data.filter(
                    (item: MovieData) =>
                        dsIsAfter(dsParseISO(item.showTime), startDateParse) &&
                        dsIsBefore(dsParseISO(item.showTime), endDateParse)
                );
            }

            return data;
        }, [filter, data]);

        const renderData = () => {
            return filteredList().length > 0 ? (
                filteredList().map((item, key) => (
                    <Card key={key} keyIndex={key} item={item} />
                ))
            ) : (
                <span>Tidak Ada Data</span>
            );
        };

        return !loading ? (
            <div className={styles.wrapper}>
                <div className={styles.container}>{renderData()}</div>
            </div>
        ) : (
            <ActivityIndicator />
        );
    }
);

export default ListView;
