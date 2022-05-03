import { Checkbox, Image, Radio, Row } from 'antd';
import parse from 'html-react-parser';
import React from 'react';

import { ALPHABET } from '../../constants/constants';
import { GeneralTask, taskTypes } from '../../types/general';
import { SimpleSpinner } from '../SimpleSpinner/SimpleSpinner';
import style from './TaskBlock.module.scss';

interface ITypedTaskProps {
    task: GeneralTask;
}

interface ITypedTaskState {
    answers: (number | string)[];
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

    onChange(value, index = 0) {
        const { task } = this.props;
        const answers = [...this.state.answers];

        switch (task.type) {
        case taskTypes.CHECK:
            this.setState({ answers: value, diff: null });
            break;
        case taskTypes.CHOOSE:
            answers[value.target.name.split('-')[1]] = value.target.value;
            this.setState({ answers, diff: null });
            break;
        case taskTypes.MATCH:
            answers[index] = ALPHABET.indexOf(value.target.value?.toLowerCase()) + 1;
            this.setState({ answers, diff: null });
            break;
        case taskTypes.WRITE:
            const length = value.target.value?.length || 0;
            value.target.size = length - 4 <= 6 ? 6 : length - 4;
            answers[index] = value.target.value;
            this.setState({ answers, diff: null });
            break;
        case taskTypes.WRITE_EXAMPLE:
        default:
            break;
        }
    }

    checkAnswer() {
        const { answers } = this.state;
        const { task } = this.props;
        const diff: any = [];

        switch (task.type) {
        case taskTypes.CHECK:
            [...answers, ...task.answer].filter((answer: any) => {
                if (!(answers.includes(answer) && task.answer.includes(answer))) {
                    diff.push(answer);
                }
            });
            break;
        case taskTypes.CHOOSE:
        case taskTypes.WRITE:
            task.answer.map((answer, i) => {
                if (answer !== answers[i]) {
                    diff[i] = answer;
                }
            });
            break;
        case taskTypes.MATCH:
            task.answer.map((answer) => {
                const i = answer[0] - 1;
                if (answers[i] !== answer[1]) {
                    diff[i] = answer[1];
                }
            });
            break;
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
                    <h2 className={style.task_header}>{`Task ${task.number}. ${task.task}`}</h2>
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
                            <Image src={`/${task.image}`}/>
                        </div>}
                    </div>
                </div>
            );
        case taskTypes.CHOOSE:
            return (
                <div className={style.task}>
                    <h2 className={style.task_header}>{`Task ${task.number}. ${task.task}`}</h2>
                    <div className={style.task_content}>
                        <div className={style.task_block}>
                            {task.audio && <audio src={require(`public/audio/${task.audio}`).default} controls/>}
                            <div>
                                {task.content.map((el, i) => {
                                    return <div key={el.question}>
                                        <div>{`${i + 1}. ${parse(el.question)}`}</div>
                                        <Radio.Group name={`${task.number}-${i}`} onChange={this.onChange.bind(this)}>
                                            {el.answers.map((answer, index) => {
                                                return <Radio key={`${i}-${index}-${answer}`}
                                                              value={index + 1}
                                                              className={diff?.[i] === index + 1
                                                                  ? 'wrong'
                                                                  : diff?.length === 0 ? 'right' : ''}>
                                                    {answer}
                                                </Radio>;
                                            })}
                                        </Radio.Group>
                                    </div>;
                                })}
                            </div>
                            <button className={style.button_check}
                                    onClick={this.checkAnswer.bind(this)}
                                    type="submit">
                                {isLoading ? <SimpleSpinner/> : 'Check'}
                            </button>
                        </div>
                        {task.image && <div className={style.image_block}>
                            <Image src={`/${task.image}`}/>
                        </div>}
                    </div>
                </div>
            );
        case taskTypes.MATCH:
            return (
                <div className={style.task}>
                    <h2 className={style.task_header}>{`Task ${task.number}. ${task.task}`}</h2>
                    <div className={style.task_content}>
                        <div className={style.task_block}>
                            {task.audio && <audio src={require(`public/audio/${task.audio}`).default} controls/>}
                            <div>
                                <div className={style.list_block}>
                                    <ol type={'1'}>
                                        {task.content.left.map((el, index) => {
                                            return <li key={`${index}-${el}`}>{parse(el)}</li>;
                                        })}
                                    </ol>
                                    <ol type={'A'}>
                                        {task.content.right.map((el, index) => {
                                            return <li key={`${index}-${el}`}>{parse(el)}</li>;
                                        })}
                                    </ol>
                                </div>
                                <div className={style.input_block}>
                                    {task.content.left.map((el, index) => {
                                        return <span key={`answer-${task.number}-${index}`}>
                                            {`${ index +1 } – `}
                                            <input maxLength={1}
                                                   className={diff?.[index]
                                                       ? style.wrong
                                                       : diff?.length === 0 ? style.right : ''}
                                                   onChange={(e) => this.onChange.call(this, e, index)}/>
                                        </span>;
                                    })}
                                </div>
                            </div>
                            <button className={style.button_check}
                                    onClick={this.checkAnswer.bind(this)}
                                    type="submit">
                                {isLoading ? <SimpleSpinner/> : 'Check'}
                            </button>
                        </div>
                        {task.image && <div className={style.image_block}>
                            <Image src={`/${task.image}`}/>
                        </div>}
                    </div>
                </div>
            );
        case taskTypes.WRITE:
            let inputIndex = 0;

            return (
                <div className={style.task}>
                    <h2 className={style.task_header}>{`Task ${task.number}. ${task.task}`}</h2>
                    <div className={style.task_content}>
                        <div className={style.task_block}>
                            {task.audio && <audio src={require(`public/audio/${task.audio}`).default} controls/>}
                            <div>
                                {task.content.map((el, i) => {
                                    const splited = el.split('...');

                                    return <span key={`${task.number}-${i}`}>
                                        {parse(splited[0])}
                                        {splited[1]
                                            ? <>
                                                <input maxLength={30}
                                                       name={(inputIndex++).toString()}
                                                       className={diff?.[inputIndex - 1]
                                                           ? style.wrong
                                                           : diff?.length === 0 ? style.right : ''}
                                                       onChange={(e) => this.onChange.call(this, e, +e.target.name)}
                                                       size={6}/>
                                                {parse(splited[1])}
                                            </>
                                            : null}
                                    </span>;
                                })}
                            </div>
                            <button className={style.button_check}
                                    onClick={this.checkAnswer.bind(this)}
                                    type="submit">
                                {isLoading ? <SimpleSpinner/> : 'Check'}
                            </button>
                        </div>
                        {task.image && <div className={style.image_block}>
                            <Image src={`/${task.image}`}/>
                        </div>}
                    </div>
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
