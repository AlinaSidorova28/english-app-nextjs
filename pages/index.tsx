import type { NextPage } from 'next';
import React from 'react';
import { Provider } from 'react-redux';

import { GlobalErrorCatchHandler } from '../components/GlobalErrorCatchHandler/GlobalErrorCatchHandler';
import PromoPage from '../components/PromoPage/PromoPage';
import { LanguageType } from '../types/general';
import { store } from '../utils/store';

export interface IMainProps {
    lang: LanguageType;
    userName?: string;
    settings: Record<string, any>;
}

const Home: NextPage = ({ ...props }) => {
    const { lang, userName } = props as IMainProps;

    return (
        <Provider store={store}>
            <GlobalErrorCatchHandler>
                <PromoPage lang={lang} userName={userName}/>
            </GlobalErrorCatchHandler>
        </Provider>
    );
};

export default Home;
