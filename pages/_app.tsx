import '../styles/globals.scss';
import 'antd/dist/antd.css';

import App from 'next/app';
import nookies from 'nookies';
import * as React from 'react';

import Layout from '../components/Layout/Layout';
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

        if (!nookies.get(ctx).lang) {
            nookies.set(ctx, 'lang', 'ru', { path: '/' });
            ctx.req.headers.cookie = 'lang=ru';
        }

        const { userName } = nookies.get(ctx);
        const data = verifyToken(ctx);

        if (data.authenticated) {
            const { settings } = await getUserData(data.user);
            pageProps = {
                ...pageProps,
                lang: settings.lang,
                settings,
            };
        } else if (userName) {
            const { settings } = await getUserData(userName);
            pageProps = {
                ...pageProps,
                lang: settings.lang,
                settings,
            };
        } else {
            const { lang } = nookies.get(ctx);
            pageProps = {
                ...pageProps,
                lang: nookies.get(ctx).lang as LanguageType,
                settings: { lang },
            };
        }

        return { pageProps };
    }

    render() {
        const { Component, pageProps } = this.props;

        return (
            <Layout>
                <Component {...pageProps} />
            </Layout>
        );
    }
}

export default MyApp;
