import React, { PureComponent } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

import Word from '../components/Word/Word';
import { LEVELS, LEVELS_STRING } from '../constants/constants';
import { LanguageType } from '../types/general';

interface IDictionaryProps {
    lang: LanguageType;
}

interface IDictionaryState {
    isLoading: boolean;
}

export default class Dictionary extends PureComponent<IDictionaryProps, IDictionaryState> {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        };
    }

    componentDidMount() {
        this.setState({ isLoading: false });
    }

    render() {
        const { isLoading } = this.state;
        const { lang } = this.props;

        if (isLoading) {
            return (
                <div className={'dictionary'}>
                    <div className={'container'} />
                </div>
            );
        }

        return (
            <div className={'dictionary'}>
                <div className={'container'}>
                    <Tabs>
                        <TabList className={'tab-list'}>
                            <Tab className={'tab a2-words'}>{LEVELS_STRING.a2}</Tab>
                            <Tab className={'tab b1-words'}>{LEVELS_STRING.b1}</Tab>
                            <Tab className={'tab b2-words'}>{LEVELS_STRING.b2}</Tab>
                            <Tab className={'tab it-words'}>{LEVELS_STRING.IT}</Tab>
                        </TabList>
                        {LEVELS.map((el) => (
                            <TabPanel className={'tab-panel'} key={el}>
                                <Word filter={el} lang={lang}/>
                            </TabPanel>
                        ))}
                    </Tabs>
                </div>
            </div>
        );
    }
}
