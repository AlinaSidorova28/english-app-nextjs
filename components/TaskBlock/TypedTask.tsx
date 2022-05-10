import { Checkbox, Image, Radio, Row } from 'antd';
import parse from 'html-react-parser';
import React from 'react';

import { ALPHABET } from '../../constants/constants';
import { GeneralTask, taskTypes } from '../../types/general';
import { SimpleSpinner } from '../SimpleSpinner/SimpleSpinner';
import style from './TaskBlock.module.scss';

interface ITypedTaskProps {
    task: GeneralTask;
    taskId: string;
    moveNext: () => void;
    progress: Record<string, any>;
    updateProgress: (settings) => void;
}

interface ITypedTaskState {
    answers: (number | string | string[])[];
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

    componentDidMount() {
        this.setInitialData();
    }

    setInitialData() {
        const { progress, taskId, task } = this.props;
        const tasks = progress?.[taskId] ?? {};
        const currentTask = tasks[task.number] ?? {};

        if (currentTask?.done) {
            this.setState({ answers: currentTask?.answer, diff: [] });
        }
    }

    formatProgress(done: boolean) {
        const { answers } = this.state;
        const { progress, task, taskId, updateProgress } = this.props;
        const tasks = progress[taskId] ?? {};
        const currentTask = tasks[task.number] ?? {};
        const settings = {
            progress: {
                [taskId]: {
                    ...tasks,
                    [task.number]: {
                        ...currentTask,
                        answer: answers,
                        attempts: currentTask.attempts
                            ? currentTask.done && done ? currentTask.attempts : currentTask.attempts + 1
                            : 1,
                        done,
                    },
                },
            },
        };
        updateProgress(settings);
    }

    onChange(event, extIndex = 0, intIndex = 0) {
        const { task } = this.props;
        const answers = [...this.state.answers];
        const length = event?.target?.value?.length || 0;

        switch (task.type) {
        case taskTypes.CHECK:
            if (answers[extIndex]) {
                delete answers[extIndex];
            } else {
                answers[extIndex] = event.target.value;
            }

            this.setState({ answers, diff: null });
            break;
        case taskTypes.CHOOSE:
            answers[extIndex] = event.target.value;
            this.setState({ answers, diff: null });
            break;
        case taskTypes.MATCH:
            answers[extIndex] = ALPHABET.indexOf(event.target.value?.toLowerCase()) + 1;
            this.setState({ answers, diff: null });
            break;
        case taskTypes.WRITE:
            event.target.size = length - 4 <= 6 ? 6 : length - 4;
            answers[extIndex] = event.target.value;
            this.setState({ answers, diff: null });
            break;
        case taskTypes.WRITE_EXAMPLE:
            // todo что делать с шириной для мобилок ??? (max-width: 243px; можно еще с height придумать)
            event.target.rows = length >= 75 ? 3 : length >= 40 ? 2 : 1;

            if (!answers[extIndex]) {
                answers[extIndex] = [];
            }

            answers[extIndex][intIndex] = event.target.value;
            this.setState({ answers, diff: null });
            break;
        default:
            break;
        }
    }

    checkAnswer() {
        const { answers } = this.state;
        const { task, moveNext } = this.props;
        const diff: any = [];

        switch (task.type) {
        case taskTypes.CHECK:
            [...answers, ...task.answer].filter((answer: any) => {
                if (answer && !(answers.includes(answer) && task.answer.includes(answer))) {
                    diff.push(answer);
                }
            });
            break;
        case taskTypes.CHOOSE:
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
        case taskTypes.WRITE:
            task.answer.map((answer, i) => {
                if (!answer.split('/').includes(answers[i] as string)) {
                    diff[i] = answer;
                }
            });
            break;
        case taskTypes.WRITE_EXAMPLE:
            task.answer.map((answerArray, i) => {
                answerArray.map((answer, index) => {
                    if (!answer.split('/').includes(answers[i]?.[index] as string)) {
                        if (!diff[i]) {
                            diff[i] = [];
                        }

                        diff[i][index] = answer;
                    }
                });
            });
            break;
        default:
            break;
        }

        if (!diff.length) {
            moveNext();
        }

        this.formatProgress(!diff.length);
        this.setState({ diff });
    }

    render() {
        const { isLoading, diff, answers } = this.state;
        const { task } = this.props;

        switch (task.type) {
        case taskTypes.CHECK:
            return (
                <div className={style.task}>
                    <h2 className={style.task_header}>{`Task ${task.number}. ${task.task}`}</h2>
                    <div className={style.task_content}>
                        <div className={style.task_block}>
                            {task.audio && <audio src={require(`public/audio/${task.audio}`).default} controls/>}
                            <div>
                                {(task.content).map((el, index) => {
                                    return <Row key={el}>
                                        <Checkbox className={diff?.includes(index + 1)
                                            ? 'wrong'
                                            : diff?.length === 0 ? 'right' : ''}
                                                  value={index + 1}
                                                  checked={answers?.includes(index + 1)}
                                                  onChange={(e) => this.onChange.call(this, e, index)}>
                                            {`${index + 1}. ${parse(el)}`}
                                        </Checkbox>
                                    </Row>;
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
                                        {el.answers.map((answer, index) => {
                                            return <Radio key={`${i}-${index}-${answer}`}
                                                          value={index + 1}
                                                          checked={answers?.[i] === index + 1}
                                                          onChange={(e) => this.onChange.call(this, e, i)}
                                                          className={diff?.[i] === index + 1
                                                              ? 'wrong'
                                                              : diff?.length === 0 ? 'right' : ''}>
                                                {answer}
                                            </Radio>;
                                        })}
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
                                                   value={answers?.[index] ? ALPHABET[(answers[index] as number) - 1] : ''}
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
                                    const length = (answers as string[])?.[inputIndex]?.length ?? 0;

                                    return <span key={`${task.number}-${i}`}>
                                        {parse(splited[0])}
                                        {splited[1]
                                            ? <>
                                                <input maxLength={30}
                                                       name={(inputIndex++).toString()}
                                                       value={answers?.[inputIndex - 1] ?? ''}
                                                       autoComplete={'off'}
                                                       className={diff?.[inputIndex - 1]
                                                           ? style.wrong
                                                           : diff?.length === 0 ? style.right : ''}
                                                       onChange={(e) => this.onChange.call(this, e, +e.target.name)}
                                                       size={length - 4 <= 6 ? 6 : length - 4}/>
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
        case taskTypes.WRITE_EXAMPLE:
            return (
                <div className={style.task}>
                    <h2 className={style.task_header}>{`Task ${task.number}. ${task.task}`}</h2>
                    <div className={style.task_content}>
                        <div className={style.task_block}>
                            {task.audio && <audio src={require(`public/audio/${task.audio}`).default} controls/>}
                            <div>
                                {task.content.map((el, i) => {
                                    if (!i) {
                                        return <div key={`${task.number}-${i}`}>
                                            <span><b>Example: </b><i>{parse(el)}</i></span>
                                            <br/>
                                            <span>
                                                <b>Answer: </b>
                                                {task.example.map((example) => {
                                                    return parse(example);
                                                })}
                                            </span>
                                        </div>;
                                    }

                                    return <div key={`${task.number}-${i}`}>
                                        <div>{parse(el)}</div>
                                        <div>
                                            {new Array(task.example.length).fill('').map((input, index) => {
                                                const length = input?.length;

                                                return <textarea maxLength={100}
                                                                 key={`input-${task.number}-${i}-${index}`}
                                                                 value={answers?.[i -1]?.[index]}
                                                                 className={diff?.[i - 1]?.[index]
                                                                     ? style.wrong
                                                                     : diff?.length === 0 ? style.right : ''}
                                                                 onChange={(e) =>
                                                                     this.onChange.call(this, e, i - 1, index)}
                                                                 rows={length >= 75 ? 3 : length >= 40 ? 2 : 1}
                                                                 cols={60}/>;
                                            })}
                                        </div>
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
        default:
            return null;
        }
    }
}
