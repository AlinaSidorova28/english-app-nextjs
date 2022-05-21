import type { NextPage } from 'next';
import React from 'react';
import { Provider } from 'react-redux';

import { GlobalErrorCatchHandler } from '../components/GlobalErrorCatchHandler/GlobalErrorCatchHandler';
import PromoPage from '../components/PromoPage/PromoPage';
import { LanguageType } from '../types/general';
import { store } from '../utils/store';

interface IPromoProps {
    lang: LanguageType;
    userName?: string;
}

const Home: NextPage<IPromoProps> = ({ ...props }) => {
    const { lang, userName } = props;

    return (
        <Provider store={store}>
            <GlobalErrorCatchHandler>
                <PromoPage lang={lang} userName={userName}/>
            </GlobalErrorCatchHandler>
        </Provider>
    );
};

export default Home;
