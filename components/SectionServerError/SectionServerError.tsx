import * as React from 'react';
import { connect } from 'react-redux';

import style from './SectionServerError.module.scss';

interface ISectionServerErrorProps {
    className?: string;
}

export const SectionServerError: React.FC<ISectionServerErrorProps> = connect()(function SectionServerError() {
    return (
        <div className={style['section-server-error']}>
            <div className={style.content}>
                <img src={'https://http.cat/500'} alt={''} />
            </div>
        </div>
    );
});
