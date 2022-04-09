import { GeneralTask } from '../types/general';

export default class Task {
    constructor(
        public id: string = '',
        public task: GeneralTask[] = [],
    ) {}
}
