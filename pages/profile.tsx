import React, { PureComponent } from 'react';

import ProfilePage from '../components/ProfilePage/ProfilePage';
import { IMainProps } from './index';

export default class Profile extends PureComponent {
    render() {
        const { lang, userName, settings } = this.props as IMainProps;

        return <ProfilePage lang={lang} userName={userName} settings={settings}/>;
    }
}
