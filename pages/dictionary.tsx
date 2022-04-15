import nookies from 'nookies';
import React, { PureComponent } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

import Word from '../components/Word/Word';
import { LEVELS } from '../constants/constants';
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

    static async getInitialProps(ctx) {
        const { lang } = nookies.get(ctx);

        return { lang };
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
                            <Tab className={'tab a2-words'}>Pre Intermediate</Tab>
                            <Tab className={'tab b1-words'}>Intermediate</Tab>
                            <Tab className={'tab b2-words'}>Upper Intermedite</Tab>
                            <Tab className={'tab it-words'}>IT Sphere</Tab>
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
