import { InfoCircleOutlined } from '@ant-design/icons';
import React, { PureComponent } from 'react';

import { BOOKS, EMPTY_DATA, PERCENT, TASKS_IN_TEST } from '../../constants/constants';
import textForApp from '../../constants/translate';
import { LanguageType } from '../../types/general';
import InformModal from '../Modals/InformModal';
import style from './ProfilePage.module.scss';

interface IStatisticsTableProps {
    title: string;
    level: string;
    progress: Record<string, any>;
    lang: LanguageType;
    taskList: Record<string, any>;
}

interface IStatisticsTableState {
    formattedProgress: Record<string, any>;
    showFullStatistics: boolean;
    currentTask: any;
    currentTitle: string;
}

export default class StatisticsTable extends PureComponent<IStatisticsTableProps, IStatisticsTableState> {
    constructor(props) {
        super(props);

        this.state = {
            formattedProgress: {},
            showFullStatistics: false,
            currentTask: null,
            currentTitle: '',
        };
    }

    componentDidMount() {
        this.formatData();
    }

    formatData() {
        const { progress } = this.props;
        const formattedProgress = {};

        Object.keys(progress).map((el) => {
            const splittedName = el.split('-');
            formattedProgress[splittedName[1]] = Object.assign({},
                formattedProgress[splittedName[1]] ?? {},
                { [splittedName[2]]: progress[el] },
            );
        });

        this.setState({ formattedProgress });
    }

    countDone(tasks) {
        if (!tasks) {
            return 0;
        }

        return Object.values(tasks).filter((el: any) => el.done).length;
    }

    showFullStatistics(task, title, showFullStatistics) {
        const content = this.formatContent(task, title);
        this.setState({ currentTask: content, currentTitle: title, showFullStatistics });
    }

    formatContent(task, title) {
        const { lang } = this.props;

        if (!task) {
            return <div>{textForApp[lang].message[4]}</div>;
        }

        return <table className={'table'}>
            <tbody>
                {Object.entries(task).map((el: any) => {
                    return <React.Fragment key={`${title}-${el[0]}`}>
                        <tr>
                            <th colSpan={2}>{`${textForApp[lang].table[3]} ${el[0]}`}</th>
                        </tr>
                        <tr>
                            <td>{`${textForApp[lang].table[4]}${el[1].attempts}`}</td>
                            <td>
                                {`${textForApp[lang].table[0]}${el[1].done
                                    ? textForApp[lang].modal.answers[0]
                                    : textForApp[lang].modal.answers[1]}`}
                            </td>
                        </tr>
                    </React.Fragment>;
                })}
            </tbody>
        </table>;
    }

    render() {
        const { progress, title, lang, taskList, level } = this.props;
        const { formattedProgress, showFullStatistics, currentTitle, currentTask } = this.state;

        return (
            <div className={style.statistics}>
                {showFullStatistics
                    && <InformModal onClose={this.showFullStatistics.bind(this, '', null, false)}
                                    title={currentTitle}
                                    content={currentTask}/>}

                <h2>{title}</h2>
                {Object.keys(progress).length
                    ? <div className={style.table_wrapper}>
                        <table className={'table'}>
                            <tbody>
                                <tr>
                                    <th className={'unit'}/>
                                    <th>{BOOKS.sb}</th>
                                    <th>{BOOKS.wb}</th>
                                    <th>{BOOKS.tb}</th>
                                </tr>
                                {Object.entries(formattedProgress).map((el) => {
                                    return <tr key={`${title}-row-${el[0]}`}>
                                        <td className={'unit'}>{`Unit ${el[0]}`}</td>
                                        <td>
                                            <div>
                                                {`${textForApp[lang].table[0]}${this.countDone(el[1].sb)}`}
                                                <InfoCircleOutlined className={'info'}
                                                                    onClick={this.showFullStatistics
                                                                        .bind(this, el[1].sb, `${BOOKS.sb}, 
                                                                        Unit ${el[0]}`, true)}/>
                                            </div>
                                            <div>
                                                {`${textForApp[lang].table[1]}${taskList[`${level}-${el[0]}-sb`]?.length}`}
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                {`${textForApp[lang].table[0]}${this.countDone(el[1].wb)}`}
                                                <InfoCircleOutlined className={'info'}
                                                                    onClick={this.showFullStatistics
                                                                        .bind(this, el[1].wb, `${BOOKS.wb}, 
                                                                        Unit ${el[0]}`, true)}/></div>
                                            <div>
                                                {`${textForApp[lang].table[1]}${taskList[`${level}-${el[0]}-wb`]?.length}`}
                                            </div>
                                        </td>
                                        <td>
                                            {+el[0] % 2
                                                ? EMPTY_DATA
                                                : <div>
                                                    {el[1].tb.result?.map((res, index) => {
                                                        if (el[1].tb.attempts - 1 === index && !el[1].tb.done) {
                                                            return null;
                                                        }

                                                        return <div key={`${level}-${el[0]}-tb-${index}`}>
                                                            {`${textForApp[lang].table[2]} ${index + 1}: 
                                                        ${(res / TASKS_IN_TEST) * PERCENT}%`}
                                                        </div>;
                                                    })}
                                                </div>}
                                        </td>
                                    </tr>;
                                })}
                            </tbody>
                        </table>
                    </div>
                    : <div>{textForApp[lang].message[4]}</div>}
            </div>
        );
    }
}
