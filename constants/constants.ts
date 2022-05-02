import { SettingsReducerState } from '../reducers/settingsReducer';
import { LanguageType } from '../types/general';

export const DB_URI = 'https://a.free.asidorova.ravendb.cloud';
export const DB_NAME = 'english-app';

export const EMPTY_DATA = '—';

export const ONE_SECOND = 1000;
export const DIGIT_THOUSAND = 1000;
export const ONE_MINUTE = ONE_SECOND * 60;
export const ONE_HOUR = ONE_MINUTE * 60;
export const ONE_DAY = ONE_HOUR * 24;
export const ONE_HOUR_IN_MINUTES = 60;
export const ONE_WEEK_IN_DAYS = 7;
export const DAYS_LABEL = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
export const ALPHABET = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
];

export const LEVELS = ['a2', 'b1', 'b2', 'IT'];

export const RESPONSE_STATUSES = {
    CODE_200: 200,
    CODE_302: 302,
    CODE_400: 400,
    CODE_401: 401,
    CODE_403: 403,
    CODE_404: 404,
    CODE_418: 418,
    CODE_500: 500,
    CODE_502: 502,
    CODE_503: 503,
};

export const STATUSES_MAP = {
    400: 'Неверный запрос',
    401: 'Не авторизирован',
    403: 'Нет доступа',
    404: 'Не найдено',
    500: 'Внутренняя ошибка сервера',
    502: 'Ошибочный шлюз',
    503: 'Сервис недоступен',
};

export const initialSettings: SettingsReducerState = {
    lang: LanguageType.ru,
    error: null,
};
