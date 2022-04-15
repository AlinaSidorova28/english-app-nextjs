import React from 'react';

import planeImg from './img/plane.png';
import style from './Spinner.module.scss';

const Spinner = () => (
    <div className={style.spinner}>
        <img src={planeImg} alt="spinner" />
        Загрузка...
    </div>
);

export default Spinner;
