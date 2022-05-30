import { Select } from 'antd';

import React, { PureComponent } from 'react';

import textForApp from '../../constants/translate';
import { LanguageString, LanguageType } from '../../types/general';
import Spinner from '../Spinner/Spinner';
import style from './ProfilePage.module.scss';

const { Option } = Select;

interface IProfilePageProps {
    lang: LanguageType;
    userName?: string;
    settings: Record<string, any>;
}

interface IProfilePageState {
    isLoading: boolean;
}

export default class ProfilePage extends PureComponent<IProfilePageProps, IProfilePageState> {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
        };
    }

    componentDidMount() {
        this.setState({ isLoading: false });
    }

    onLanguageChange(value) {
        console.log(value);
    }

    render() {
        const { lang, userName, settings } = this.props;
        const { isLoading } = this.state;
        console.log(settings?.progress);

        if (isLoading) {
            return (
                <div className={'tasks'}>
                    <div className={'container'}>
                        <Spinner/>
                    </div>
                </div>
            );
        }

        return (
            <div className={'tasks'}>
                <div className={'container'}>
                    <div className={style['profile-wrapper']}>
                        <h1>{textForApp[lang].links[7]}</h1>
                        <div className={style['profile-block']}>
                            <Select labelInValue
                                    defaultValue={{
                                        value: lang,
                                        label: LanguageString[lang],
                                    }}
                                    style={{
                                        width: 120,
                                    }}
                                    onChange={this.onLanguageChange.bind(this)}>
                                <Option value={LanguageType.ru}>{LanguageString[LanguageType.ru]}</Option>
                                <Option value={LanguageType.en}>{LanguageString[LanguageType.en]}</Option>
                            </Select>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
