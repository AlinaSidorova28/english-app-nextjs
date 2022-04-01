/* eslint-disable no-magic-numbers */
export const EMPTY_DATA = '—';

export const ONE_SECOND = 1000;
export const DIGIT_THOUSAND = 1000;
export const ONE_MINUTE = ONE_SECOND * 60;
export const ONE_HOUR = ONE_MINUTE * 60;
export const ONE_DAY = ONE_HOUR * 24;
export const ONE_HOUR_IN_MINUTES = 60;
export const ONE_WEEK_IN_DAYS = 7;
export const DAYS_LABEL = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export enum taskTypes {
    MATCH = 'match',
    CHOOSE = 'choose',
    CHECK = 'check',
    WRITE = 'write',
    WRITE_EXAMPLE = 'write-example',
}

export enum Books {
    SB = 'sb',
    WB = 'wb',
    TB = 'tb',
}

export enum Levels {
    A2 = 'a2',
    B1 = 'b1',
    B2 = 'b2',
}

// главный тип
// достаем по ключу из Levels (tasks[Levels.A2])
export type Tasks = {
    [key in Levels]: Array<Unit>;
}

export type Rules = {
    [key in Levels]: Array<Array<Rule>>;
}

export type Words = {
    [key in Levels]: Array<IWord>;
}

export interface Unit {
    name: string;
    sb: Array<Task>;
    wb: Array<Task>;
    tb: Array<Task>;
}

export interface Rule {
    number: number;
    name: string;
    content: string[];
}

export interface IWord {
    number: number;
    content: string[];
}

export interface IBaseTask {
    number: number;
    task: string;
    audio?: string;
    image?: string;
}

export interface IMatchTask extends IBaseTask {
    type: taskTypes.MATCH;
    content: {
        left: string[];
        right: string[];
    };
    answer: Array<number[]>;
}

export interface ICheckTask extends IBaseTask {
    type: taskTypes.CHECK;
    content: string[];
    answer: number[];
}

export interface IChooseTask extends IBaseTask {
    type: taskTypes.CHOOSE;
    content: Array<{
        question: string;
        answers: string[];
    }>;
    answer: Array<number|number[] >;
}

export interface IWriteTask extends IBaseTask {
    type: taskTypes.WRITE;
    content: string[];
    answer: string[];
}

export interface IWriteExampleTask extends IBaseTask {
    type: taskTypes.WRITE_EXAMPLE;
    content: string[];
    example: string[];
    answer: Array<string[]>;
}

export type Task = IMatchTask | IChooseTask | IWriteTask | IWriteExampleTask | ICheckTask;
