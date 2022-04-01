import * as React from 'react';

import style from './SimpleError.module.scss';

export interface ISimpleError {
    error: any;
    data?: {
        label: string;
    };
    className?: string;
}

export const RESPONSE_STATUSES = {
    CODE_200: 200,
    CODE_400: 400,
    CODE_401: 401,
    CODE_403: 403,
    CODE_404: 404,
    CODE_418: 418,
    CODE_500: 500,
    CODE_502: 502,
    CODE_503: 503,
};

const STATUSES_MAP = {
    400: 'Неверный запрос',
    401: 'Не авторизирован',
    403: 'Нет доступа',
    404: 'Не найдено',
    500: 'Внутренняя ошибка сервера',
    502: 'Ошибочный шлюз',
    503: 'Сервис недоступен',
};

const SPACES = 1;

function SafeStringify(obj) {
    if(obj === null) {return null;}

    try {
        return JSON.stringify(obj, null, SPACES);
    } catch (e) {
        return null;
    }
}

export const SimpleError = ({ error, data, className = '' }: ISimpleError) => {
    const special_info = error?.response?.error_details?.special_info;
    const status = error?.response?.status;
    const back = error?.response?.config?.headers?.saasnew || null;
    const endPoint = error?.response?.config?.url;

    return <div className={`${style.simple_error} ${className}`}>
        {status
            ? <div className={style.status_title}>
                <h2>{status}</h2>
                {STATUSES_MAP[status]
                    ? <h3>{`: ${STATUSES_MAP[status]}`}</h3>
                    : null}
            </div>
            : null}
        {
            error?.message
                ? <div><strong>{data?.label || 'Сообщение'}</strong>: {error?.message}</div>
                : data?.label
                    ? <div><strong>{data?.label}</strong></div>
                    : null
        }
        <div className={style.data}>
            {SafeStringify(error?.response)}
        </div>
        {back
            ? <div className={style.back}>
                back: {back}
            </div>
            : null}
        {endPoint
            ? <div className={style.host}>
                endpoint: {endPoint}
            </div>
            : null}
        {
            special_info
                ? <div className={style.host}>
                    special_info: {
                        (typeof special_info === 'object'
                        && JSON.stringify(special_info)
                        || special_info.toString())
                    }
                </div>
                : null
        }
    </div>;
};
