import React from 'react';

import textForApp from '../../constants/translate';
import planeImg from './img/plane.png';
import style from './Spinner.module.scss';

const Spinner = ({ lang }) => (
    <div className={style.spinner}>
        <img src={planeImg} alt="spinner" />
        {textForApp[lang].inscription.loading}...
    </div>
);

export default Spinner;
