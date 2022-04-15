/* eslint-disable no-magic-numbers */
import { Menu } from 'antd';
import { SubMenu } from 'rc-menu';
import React from 'react';

import { UNITS_AMOUNT } from '../../constants/constants';
import textForApp from '../../constants/translate';
import { LanguageType } from '../../types/general';
import { getModuleWords } from '../../utils/wordsControllers';
import Spinner from '../Spinner/Spinner';
import style from './Word.module.scss';

interface IWordProps {
    filter: string;
    lang: LanguageType;
}

interface IWordState {
    words: any[];
    isLoading: boolean;
    openKeys: any[];
}

const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

export default class Word extends React.PureComponent<IWordProps, IWordState> {
    constructor(props) {
        super(props);
        this.state = {
            words: [],
            isLoading: true,
            openKeys: [],
        };
    }

    componentDidMount() {
        this.getSectionWords();
    }

    getSectionWords = async () => {
        const { filter } = this.props;
        const content = await getModuleWords(filter);
        const words = content?.words?.[0]?.content || [];

        this.setState({ words, isLoading: false });
    };

    onOpenChange = (keys) => {
        const latestOpenKey = keys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys: keys });
        } else {
            this.setState({ openKeys: latestOpenKey ? [latestOpenKey] : [] });
        }
    };

    render() {
        const { words, isLoading, openKeys } = this.state;
        const { lang, filter } = this.props;
        const comingSoon = <h3>{textForApp[lang].message[3]}</h3>;

        if (isLoading) {
            return <Spinner />;
        }

        if (!words.length) {
            return comingSoon;
        }

        return (
            <div className={style.word}>
                <Menu mode="inline" openKeys={openKeys} onOpenChange={this.onOpenChange.bind(this)} style={{ width: '100%' }}>
                    {new Array(UNITS_AMOUNT).fill('Unit').map((el, index) => {
                        return (
                            <SubMenu key={`${el}-${index}`} title={`${el}-${index + 1}`}>
                                <Menu.Item key={`item-${index + 1}`} disabled>
                                    {words.map((el) => {
                                        return (el.startsWith(`${filter}-${index + 1}`)
                                            && <div className={style['word-image']} key={el}>
                                                <img src={`/${el}`}/>
                                            </div>);
                                    })}
                                </Menu.Item>
                            </SubMenu>
                        );
                    })}
                </Menu>
            </div>
        );
    }
}
