export enum LanguageType {
    en = 'en',
    ru = 'ru',
}

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
    IT = 'IT',
}

export type Rules = {
    [key in Levels]: Array<Array<IRule>>;
}

export type Words = {
    [key in Levels]: Array<IWord>;
}

export interface IUnit {
    name: string;
    sb: Array<GeneralTask>;
    wb: Array<GeneralTask>;
    tb: Array<GeneralTask>;
}

export interface IRule {
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

export type GeneralTask = IMatchTask | IChooseTask | IWriteTask | IWriteExampleTask | ICheckTask;
