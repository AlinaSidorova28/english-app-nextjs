import { LanguageType, Progress } from '../types/general';

export default class Settings {
    constructor(
        public user: string = '',
        public lang: LanguageType = LanguageType.ru,
        public progress: Record<string, Record<string, Progress>> = {},
    ) {}
}
