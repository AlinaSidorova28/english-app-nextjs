import * as React from 'react';
import { connect } from 'react-redux';

import style from './SectionUnauthorized.module.scss';

interface ISectionUnauthorizedProps {
    className?: string;
}

export const SectionUnauthorized: React.FC<ISectionUnauthorizedProps> = connect()(function SectionUnauthorized() {
    return (
        <div className={style['section-unauthorized']}>
            <div className={style.content}>
                <img src={'https://http.cat/401'} alt={''} />
            </div>
        </div>
    );
});
