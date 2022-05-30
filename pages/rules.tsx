import React, { PureComponent } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

import Rule from '../components/Rule/Rule';
import { LEVELS, LEVELS_STRING } from '../constants/constants';
import { LanguageType } from '../types/general';

interface IRulesProps {
    lang: LanguageType;
}

interface IRulesState {
    isLoading: boolean;
}

export default class Dictionary extends PureComponent<IRulesProps, IRulesState> {
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
                <div className={'rules'}>
                    <div className={'container'} />
                </div>
            );
        }

        return (
            <div className={'rules'}>
                <div className={'container'}>
                    <Tabs>
                        <TabList className={'tab-list'}>
                            <Tab className={'tab a2-rules'}>{LEVELS_STRING.a2}</Tab>
                            <Tab className={'tab b1-rules'}>{LEVELS_STRING.b1}</Tab>
                            <Tab className={'tab b2-rules'}>{LEVELS_STRING.b2}</Tab>
                            <Tab className={'tab it-rules'}>{LEVELS_STRING.IT}</Tab>
                        </TabList>
                        {LEVELS.map((el) => (
                            <TabPanel className={'tab-panel'} key={el}>
                                <Rule filter={el} lang={lang}/>
                            </TabPanel>
                        ))}
                    </Tabs>
                </div>
            </div>
        );
    }
}
