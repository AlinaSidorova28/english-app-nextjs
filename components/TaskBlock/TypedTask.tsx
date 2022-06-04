import { Checkbox, Image, Radio, Row } from 'antd';
import parse from 'html-react-parser';
import React from 'react';

import { ALPHABET, TASKS_IN_TEST } from '../../constants/constants';
import { GeneralTask, taskTypes } from '../../types/general';
import { SimpleSpinner } from '../SimpleSpinner/SimpleSpinner';
import style from './TaskBlock.module.scss';

interface ITypedTaskProps {
    task: GeneralTask;
    taskId: string;
    isTest: boolean;
    moveNext: () => void;
    progress: Record<string, any>;
    updateProgress: (settings) => void;
    disabled: boolean;
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

    componentDidUpdate(prevProps: Readonly<ITypedTaskProps>) {
        const { progress, taskId, isTest } = this.props;
        const solvedTasks = Object.keys(progress?.[taskId])?.filter((key) => key.match(/\d+/));

        if (JSON.stringify(progress) !== JSON.stringify(prevProps.progress)
        && isTest && !solvedTasks.length) {
            this.resetData();
        }
    }

    setInitialData() {
        const { progress, taskId, task, isTest } = this.props;
        const tasks = progress?.[taskId] ?? {};
        const currentTask = tasks[task.number] ?? {};

        if (currentTask?.done || (isTest && currentTask?.done !== undefined)) {
            this.setState({
                answers: currentTask?.answer,
                diff: isTest ? this.setDifference(currentTask?.answer) : [],
            });
        }
    }

    resetData() {
        this.setState({ answers: [], diff: null });
    }

    formatProgress(done: boolean) {
        const { answers } = this.state;
        const { progress, task, taskId, updateProgress, isTest } = this.props;
        const tasks = progress[taskId] ?? {};
        const currentTask = tasks[task.number] ?? {};
        const testAttempts = tasks.attempts ? tasks.attempts : 1;
        const result = tasks.result ? [...tasks.result] : [0];
        const currentResult = result[tasks.attempts ? tasks.attempts - 1 : 0] ?? 0;

        result[tasks.attempts ? tasks.attempts - 1 : 0] = done
            ? currentResult + 1
            : currentResult;

        const settings = !isTest
            ? {
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
            }
            : {
                progress: {
                    [taskId]: {
                        ...tasks,
                        attempts: testAttempts,
                        result,
                        done: Object.keys(tasks)?.filter((key) => key.match(/\d+/))
                            ?.length === TASKS_IN_TEST - 1,
                        [task.number]: {
                            ...currentTask,
                            answer: answers,
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
            event.target.size = length <= 6 ? 6 : length;
            answers[extIndex] = event.target.value;
            this.setState({ answers, diff: null });
            break;
        case taskTypes.WRITE_EXAMPLE:
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

    setDifference(answers) {
        const { task } = this.props;
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

        return diff;
    }

    checkAnswer() {
        const { isTest, moveNext } = this.props;
        const diff = this.setDifference(this.state.answers);

        if (isTest) {
            moveNext();
        }

        this.formatProgress(!diff.length);
        this.setState({ diff });
    }

    render() {
        const { isLoading, diff, answers } = this.state;
        const { task, disabled } = this.props;

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
                                                  disabled={disabled}
                                                  onChange={(e) => this.onChange.call(this, e, index)}>
                                            {`${index + 1}. ${parse(el)}`}
                                        </Checkbox>
                                    </Row>;
                                })}
                            </div>
                            <button className={`${style.button_check} ${disabled ? style.hidden : ''}`}
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
                                                          disabled={disabled}
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
                            <button className={`${style.button_check} ${disabled ? style.hidden : ''}`}
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
                                                   disabled={disabled}
                                                   value={answers?.[index] ? ALPHABET[(answers[index] as number) - 1] : ''}
                                                   className={`${disabled ? style.disabled : ''} ${diff?.[index]
                                                       ? style.wrong
                                                       : diff?.length === 0 ? style.right : ''}`}
                                                   onChange={(e) => this.onChange.call(this, e, index)}/>
                                        </span>;
                                    })}
                                </div>
                            </div>
                            <button className={`${style.button_check} ${disabled ? style.hidden : ''}`}
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
                                                       disabled={disabled}
                                                       className={`${disabled ? style.disabled : ''} ${diff?.[inputIndex - 1]
                                                           ? style.wrong
                                                           : diff?.length === 0 ? style.right : ''}`}
                                                       onChange={(e) => this.onChange.call(this, e, +e.target.name)}
                                                       size={length <= 6 ? 6 : length}/>
                                                {parse(splited[1])}
                                            </>
                                            : null}
                                    </span>;
                                })}
                            </div>
                            <button className={`${style.button_check} ${disabled ? style.hidden : ''}`}
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
                                                return <textarea maxLength={100}
                                                                 disabled={disabled}
                                                                 key={`input-${task.number}-${i}-${index}`}
                                                                 value={answers?.[i -1]?.[index]}
                                                                 className={`${disabled ? style.disabled : ''} 
                                                                    ${diff?.[i - 1]?.[index]
                                                                     ? style.wrong
                                                                     : diff?.length === 0 ? style.right : ''}`}
                                                                 onChange={(e) =>
                                                                     this.onChange.call(this, e, i - 1, index)}
                                                                 cols={60}/>;
                                            })}
                                        </div>
                                    </div>;

                                })}
                            </div>
                            <button className={`${style.button_check} ${disabled ? style.hidden : ''}`}
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
