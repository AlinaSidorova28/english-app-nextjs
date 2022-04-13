import { STATUSES_MAP } from 'constants/constants';
import * as React from 'react';

import style from './SimpleError.module.scss';

export interface ISimpleError {
    error: any;
    data?: {
        label: string;
    };
    className?: string;
}

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
