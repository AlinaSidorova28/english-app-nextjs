import React, { PureComponent } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

import Rule from '../components/Rule/Rule';
import { LEVELS } from '../constants/constants';
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
            <div className={'dictionary'}>
                <div className={'container'}>
                    <Tabs>
                        <TabList className={'tab-list'}>
                            <Tab className={'tab a2-rules'}>Pre Intermediate</Tab>
                            <Tab className={'tab b1-rules'}>Intermediate</Tab>
                            <Tab className={'tab b2-rules'}>Upper Intermedite</Tab>
                            <Tab className={'tab it-rules'}>IT Sphere</Tab>
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
