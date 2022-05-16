import React, { PureComponent } from 'react';

import PromoPage from '../components/PromoPage/PromoPage';
import { LanguageType } from '../types/general';

interface IPromoProps {
    lang: LanguageType;
    userName?: string;
}

export default class Promo extends PureComponent<IPromoProps> {
    render() {
        const { lang, userName } = this.props;

        return <PromoPage lang={lang} userName={userName}/>;
    }
}
