import { LanguageType } from '../types/general';

export default class Settings {
    constructor(
        public user: string = '',
        public lang: LanguageType = LanguageType.ru,
    ) {}
}
