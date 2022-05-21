import React, { useEffect, useState } from 'react';

import textForApp from '../../constants/translate';
import style from './Footer.module.scss';

const Footer = ({ lang }) => {
    const [isRendered, setIsRendered] = useState(false);

    useEffect(() => {
        setIsRendered(true);
    }, []);

    if (!isRendered) {
        return null;
    }

    return (
        <div className={style.footer}>
            <span>{`Copyright © 2022 ${textForApp[lang].links[0]}`}</span>
        </div>
    );
};

export default Footer;
