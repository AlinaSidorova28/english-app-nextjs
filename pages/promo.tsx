import React, { PureComponent } from 'react';

import PromoPage from '../components/PromoPage/PromoPage';

export default class Promo extends PureComponent {
    render() {
        // @ts-ignore
        return <PromoPage lang={this.props.lang}/>;
    }
}
