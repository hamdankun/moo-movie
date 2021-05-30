import loader from './../../assets/images/loader.svg';

import styles from './styles.module.sass';

const ActivityIndicator = () => {
    return (
        <div className={styles.container}>
            <img src={loader} alt="Actiivty Indicator" />
        </div>
    );
};

export default ActivityIndicator;
