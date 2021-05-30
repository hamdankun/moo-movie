type AppConfig = {
    app: {
        [key: string]: any;
    };
    debug: boolean;
    route: {
        [key: string]: any;
    };
    session: {
        key: string;
    };
};

const appConfig: AppConfig = {
    app: {},
    debug: process.env.NODE_ENV === 'development',
    route: {
        initialRoute: 'home',
    },
    session: {
        key: '@tokodistributor-web-supplier',
    },
};

export default appConfig;
