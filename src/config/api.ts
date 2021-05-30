export type ApiConfig = {
    debug: boolean;
    service: {
        [key: string]: string;
    };
    commonConfig: {
        [key: string]: any;
    };
    commonResponseMessage: {
        [key: string]: string;
    };
};

const appConfig: ApiConfig = {
    debug: process.env.NODE_ENV === 'development',
    service: {
        main: '',
    },
    commonConfig: {
        timeout: 30000,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    },
    commonResponseMessage: {
        INTERNAL_SERVER_ERROR:
            'Terjadi Kesalahan Silahkan Coba Beberapa Saat Lagi!',
    },
};

export default appConfig;
