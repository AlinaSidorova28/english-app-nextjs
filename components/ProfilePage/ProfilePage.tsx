import { ReloadOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import React, { PureComponent } from 'react';

import { LEVELS, LEVELS_STRING } from '../../constants/constants';
import textForApp from '../../constants/translate';
import { IMainProps } from '../../pages';
import { LanguageString, LanguageType } from '../../types/general';
import { resetSettings } from '../../utils/settingsControllers';
import { getAllTasks } from '../../utils/TasksControllers';
import ConfirmModal from '../Modals/ConfirmModal';
import { SimpleError } from '../SimpleError/SimpleError';
import Spinner from '../Spinner/Spinner';
import style from './ProfilePage.module.scss';
import StatisticsTable from './StatisticsTable';

const { Option } = Select;

interface IProfilePageState {
    isLoading: boolean;
    taskList: Record<string, any>;
    loadingError: Error | null;
    showModal: boolean;
    progress: Record<string, any>;
}

export default class ProfilePage extends PureComponent<IMainProps, IProfilePageState> {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            taskList: {},
            loadingError: null,
            showModal: false,
            progress: {},
        };
    }

    componentDidMount() {
        this.getInitialData();
    }

    onLanguageChange({ value }) {
        this.props.updateLang?.(value);
    }

    showModal(showModal) {
        this.setState({ showModal });
    }

    onConfirm() {
        resetSettings();
        this.showModal(false);
        this.setState({ progress: {} });
    }

    async getInitialData() {
        const result = await getAllTasks();

        if (result.error) {
            this.setState({ loadingError: result.error, isLoading: false });
        } else {
            const taskList = {};
            result.data.map((el) => {
                taskList[el.id] = el.task;
            });

            this.setState({ taskList, isLoading: false, progress: this.props.settings?.progress ?? {} });
        }
    }

    render() {
        const { lang } = this.props;
        const { isLoading, taskList, loadingError, showModal, progress } = this.state;

        if (isLoading) {
            return (
                <div className={'profile'}>
                    <div className={'container'}>
                        <Spinner lang={lang}/>
                    </div>
                </div>
            );
        }

        return (
            <div className={'profile'}>
                {showModal && <ConfirmModal question={textForApp[lang]?.modal?.questions?.[1]}
                                            lang={lang}
                                            onClose={this.showModal.bind(this, false)}
                                            onConfirm={this.onConfirm.bind(this)}/>}
                <div className={'container'}>
                    <div className={style['profile-wrapper']}>
                        <h1>{textForApp[lang].links[7]}</h1>
                        <div className={style['profile-block']}>
                            <div className={style.lang}>
                                <span>{textForApp[lang].inscription.lang}:</span>
                                <Select labelInValue
                                        defaultValue={{
                                            value: lang,
                                            label: LanguageString[lang],
                                        }}
                                        style={{ width: 120 }}
                                        onChange={this.onLanguageChange.bind(this)}>
                                    <Option value={LanguageType.ru}>{LanguageString[LanguageType.ru]}</Option>
                                    <Option value={LanguageType.en}>{LanguageString[LanguageType.en]}</Option>
                                </Select>
                            </div>
                            {loadingError
                                ? <SimpleError error={loadingError}/>
                                : <div>{LEVELS.map((level) => {
                                    const tasks: Record<string, any> = {};
                                    Object.keys(progress)?.map((el: any) => {
                                        if (el.includes(level)) {
                                            tasks[el] = progress[el];
                                        }
                                    });

                                    return <StatisticsTable key={level}
                                                            title={LEVELS_STRING[level]}
                                                            level={level}
                                                            progress={tasks}
                                                            taskList={taskList}
                                                            lang={lang}/>;
                                })}</div>}
                            <div className={style.button_container}>
                                <button className="reset-button"
                                        style={{ width: 220 }}
                                        onClick={this.showModal.bind(this, true)}>
                                    <ReloadOutlined className="img"/>{textForApp[lang].inscription.reset}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
