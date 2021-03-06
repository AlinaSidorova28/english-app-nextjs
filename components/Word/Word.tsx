import { Menu } from 'antd';
import React from 'react';

import textForApp from '../../constants/translate';
import { IWord, LanguageType } from '../../types/general';
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
        const words = content?.words || [];

        this.setState({ words, isLoading: false });
    };

    onOpenChange = (keys) => {
        const latestOpenKey = keys.find(key => this.state.openKeys.indexOf(key) === -1);
        this.setState({ openKeys: latestOpenKey ? [latestOpenKey] : [] });
    };

    render() {
        const { words, isLoading, openKeys } = this.state;
        const { lang } = this.props;

        if (isLoading) {
            return <Spinner lang={lang}/>;
        }

        if (!words.length) {
            return <h3>{textForApp[lang].message[3]}</h3>;
        }

        return (
            <div className={style.word}>
                <Menu mode="inline"
                      openKeys={openKeys}
                      onOpenChange={this.onOpenChange.bind(this)}
                      style={{ width: '100%' }}
                      items={
                          words.sort((a, b) => a.id.localeCompare(b.id)).map((word: IWord, index) => {
                              return {
                                  label: `Unit ${index + 1}`,
                                  key: `Unit-${index}`,
                                  children: [
                                      {
                                          label: word.content.map((img) => {
                                              return (<img src={`/${img}`} key={img}/>);
                                          }),
                                          key: `item-${index + 1}`,
                                          className: 'words-item',
                                          disabled: true,
                                      },
                                  ],
                              };
                          })
                      }/>
            </div>
        );
    }
}
