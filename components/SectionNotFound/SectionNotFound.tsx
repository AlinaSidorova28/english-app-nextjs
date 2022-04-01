import * as React from 'react';
import { connect } from 'react-redux';

import style from './SectionNotFound.module.scss';

interface ISectionNotFoundProps {
    className?: string;
}

export const SectionNotFound: React.FC<ISectionNotFoundProps> = connect()(function SectionNotFound() {
    return (
        <div className={style['section-not-found']}>
            <div className={style.content}>
                <img src={'https://http.cat/404'} alt={''} />
            </div>
        </div>
    );
});
