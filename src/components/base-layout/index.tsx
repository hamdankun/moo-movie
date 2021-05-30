import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import styles from './styles.module.sass';

type BaseLayoutProps = {
    children: React.ReactChild;
};

const Header = (): JSX.Element => {
    const history = useHistory();
    const [activePage, setActivePage] = useState<string | null>(null);

    const setActiveMenu = (explicitUrl?: string): void => {
        if (explicitUrl) setActivePage(explicitUrl);
        setActivePage(window.location.pathname);
    };

    const setRouteListener = (): void => {
        history.listen((listener) => {
            setActiveMenu(listener.pathname);
        });
    };

    const setActiveClassesIfPageIs = (targetUrl: string): string => {
        if (targetUrl === activePage) return styles.active as string;
        return '';
    };

    useEffect(() => {
        setActiveMenu();
        setRouteListener();
    }, []);

    return (
        <div className={styles.navbar}>
            <div className={styles.appNameWrapper}>
                <img
                    src="https://news.ycombinator.com/y18.gif"
                    alt="Moo Movie App Logo"
                    className={styles.logo}
                />
                <Link to={'/'}>
                    <span>Moo Movie</span>
                </Link>
            </div>
        </div>
    );
};

const Footer = (): JSX.Element => {
    return <div className={styles.footer}>&copy; Hamdan Hanafi 2021</div>;
};

const BaseLayout = ({ children }: BaseLayoutProps): JSX.Element => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <Header />
                <div className={styles.wrapper}>{children}</div>
            </div>
            <Footer />
        </div>
    );
};

export default BaseLayout;
