import { IRule } from '../types/general';

export default class Rule {
    constructor(
        public id: string = '',
        public unitRules: IRule[] = [],
    ) {}
}
