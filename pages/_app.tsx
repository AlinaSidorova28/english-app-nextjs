import '../styles/globals.scss';

import App from 'next/app';
import nookies from 'nookies';

import { initialSettings } from '../constants/constants';
import { SettingsReducerState } from '../reducers/settingsReducer';
import { LanguageType } from '../types/general';
import { getUserData, verifyToken } from '../utils/authControllers';

interface AppProps extends SettingsReducerState {
    settings?: Record<string, any>;
}

class MyApp extends App {
    static async getInitialProps({ Component, router, ctx }) {
        let pageProps: AppProps = initialSettings;

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
            if (!nookies.get(ctx).sound || !nookies.get(ctx).music
                || !nookies.get(ctx).language || !nookies.get(ctx).difficulty) {
                nookies.set(ctx, 'lang', 'ru', { path: '/' });
                ctx.req.headers.cookie = 'lang=ru';
            }

            const { userName } = nookies.get(ctx);
            const data = verifyToken(ctx);

            if (data.authenticated) {
                const { settings } = await getUserData(data.user);
                pageProps.lang = settings.lang;
                pageProps.settings = settings;
            } else if (userName) {
                const { settings } = await getUserData(userName);
                pageProps.lang = settings.lang;
                pageProps.settings = settings;
            } else {
                pageProps.lang = nookies.get(ctx).lang as LanguageType;
                const { lang } = nookies.get(ctx);
                pageProps.settings = { lang };
            }
        }

        return { pageProps };
    }

    render() {
        const { Component, pageProps } = this.props;

        return <Component {...pageProps} />;
    }
}

export default MyApp;
