import React, { PureComponent } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

import TaskBlock from '../../components/TaskBlock/TaskBlock';
import { LEVELS, LEVELS_STRING } from '../../constants/constants';
import { LanguageType } from '../../types/general';

interface ITasksProps {
    lang: LanguageType;
}

interface ITasksState {
    isLoading: boolean;
}

export default class Tasks extends PureComponent<ITasksProps, ITasksState> {
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
                <div className={'tasks'}>
                    <div className={'container'} />
                </div>
            );
        }

        return (
            <div className={'tasks'}>
                <div className={'container'}>
                    <Tabs>
                        <TabList className={'tab-list'}>
                            <Tab className={'tab a2-tasks'}>{LEVELS_STRING.a2}</Tab>
                            <Tab className={'tab b1-tasks'}>{LEVELS_STRING.b1}</Tab>
                            <Tab className={'tab b2-tasks'}>{LEVELS_STRING.b2}</Tab>
                            <Tab className={'tab it-tasks'}>{LEVELS_STRING.IT}</Tab>
                        </TabList>
                        {LEVELS.map((el) => (
                            <TabPanel className={'tab-panel'} key={el}>
                                <TaskBlock filter={el} lang={lang}/>
                            </TabPanel>
                        ))}
                    </Tabs>
                </div>
            </div>
        );
    }
}
