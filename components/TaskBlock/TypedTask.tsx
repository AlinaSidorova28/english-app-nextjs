import { Checkbox, Image, Row } from 'antd';
import parse from 'html-react-parser';
import React from 'react';

import { GeneralTask, taskTypes } from '../../types/general';
import { SimpleSpinner } from '../SimpleSpinner/SimpleSpinner';
import style from './TaskBlock.module.scss';

interface ITypedTaskProps {
    task: GeneralTask;
}

interface ITypedTaskState {
    answers: number[];
    isLoading: boolean;
    diff: any;
}

export default class TypedTask extends React.PureComponent<ITypedTaskProps, ITypedTaskState> {
    constructor(props) {
        super(props);
        this.state = {
            answers: [],
            isLoading: false,
            diff: null,
        };
    }

    onChange(checkedValues) {
        this.setState({ answers: checkedValues, diff: null });
    }

    checkAnswer() {
        const { answers } = this.state;
        const { task } = this.props;
        const diff: any = [];

        switch (task.type) {
        case taskTypes.CHECK:
            [...answers, ...task.answer].filter((answer) => {
                if (!(answers.includes(answer) && task.answer.includes(answer))) {
                    diff.push(answer);
                }
            });
            break;
        case taskTypes.CHOOSE:
        case taskTypes.MATCH:
        case taskTypes.WRITE:
        case taskTypes.WRITE_EXAMPLE:
        default:
            break;
        }

        this.setState({ diff });
    }

    render() {
        const { isLoading, diff } = this.state;
        const { task } = this.props;

        switch (task.type) {
        case taskTypes.CHECK:
            return (
                <div className={style.task}>
                    <h2 className={style.task_header}>{`Task ${task.number}. ${parse(task.task)}`}</h2>
                    <div className={style.task_content}>
                        <div className={style.task_block}>
                            {task.audio && <audio src={require(`public/audio/${task.audio}`).default} controls/>}
                            <Checkbox.Group style={{ width: '100%' }} onChange={this.onChange.bind(this)}>
                                {(task.content).map((el, index) => {
                                    return <Row key={el}>
                                        <Checkbox className={diff?.includes(index + 1)
                                            ? 'wrong'
                                            : diff?.length === 0 ? 'right' : ''}
                                                  value={index + 1}>
                                            {`${index + 1}. ${parse(el)}`}
                                        </Checkbox>
                                    </Row>;
                                })}
                            </Checkbox.Group>
                            <button className={style.button_check}
                                    onClick={this.checkAnswer.bind(this)}
                                    type="submit">
                                {isLoading ? <SimpleSpinner/> : 'Check'}
                            </button>
                        </div>
                        {task.image && <div className={style.image_block}>
                            <Image src={task.image}/>
                        </div>}
                    </div>
                </div>
            );
        // todo: DEV-26
        case taskTypes.CHOOSE:
            return (
                <div className={style.task}>
                    <h2>{`Task ${task.number}`}</h2>
                    {task.type}
                </div>
            );
        // todo: DEV-9
        case taskTypes.MATCH:
            return (
                <div className={style.task}>
                    <h2>{`Task ${task.number}`}</h2>
                    {task.type}
                </div>
            );
        // todo: DEV-24
        case taskTypes.WRITE:
            return (
                <div className={style.task}>
                    <h2>{`Task ${task.number}`}</h2>
                    {task.type}
                </div>
            );
        // todo: DEV-23
        case taskTypes.WRITE_EXAMPLE:
            return (
                <div className={style.task}>
                    <h2>{`Task ${task.number}`}</h2>
                    {task.type}
                </div>
            );
        default:
            return null;
        }
    }
}
