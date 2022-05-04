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

    onChange(value, extIndex = 0, intIndex = 0) {
        const { task } = this.props;
        const answers = [...this.state.answers];
        const length = value?.target?.value?.length || 0;

        switch (task.type) {
        case taskTypes.CHECK:
            this.setState({ answers: value, diff: null });
            break;
        case taskTypes.CHOOSE:
            answers[value.target.name.split('-')[1]] = value.target.value;
            this.setState({ answers, diff: null });
            break;
        case taskTypes.MATCH:
            answers[extIndex] = ALPHABET.indexOf(value.target.value?.toLowerCase()) + 1;
            this.setState({ answers, diff: null });
            break;
        case taskTypes.WRITE:
            value.target.size = length - 4 <= 6 ? 6 : length - 4;
            answers[extIndex] = value.target.value;
            this.setState({ answers, diff: null });
            break;
        case taskTypes.WRITE_EXAMPLE:
            // todo что делать с шириной для мобилок ??? (max-width: 243px; можно еще с height придумать)
            value.target.rows = length >= 75 ? 3 : length >= 40 ? 2 : 1;

            if (!answers[extIndex]) {
                answers[extIndex] = [];
            }

            answers[extIndex][intIndex] = value.target.value;
            this.setState({ answers, diff: null });
            break;
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
                                            <span><b>Example: </b><i>{el}</i></span>
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
                                        <div>{el}</div>
                                        <div>
                                            {new Array(task.example.length).fill('').map((input, index) => {
                                                return <textarea maxLength={100}
                                                                 key={`input-${task.number}-${i}-${index}`}
                                                                 className={diff?.[i - 1]?.[index]
                                                                     ? style.wrong
                                                                     : diff?.length === 0 ? style.right : ''}
                                                                 onChange={(e) =>
                                                                     this.onChange.call(this, e, i - 1, index)}
                                                                 rows={1}
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
