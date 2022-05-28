import React from 'react';

import textForApp from '../../constants/translate';
import { LanguageType } from '../../types/general';
import style from './ConfirmModal.module.scss';

interface IConfirmModalProps {
    question: string;
    lang: LanguageType;
    onClose: () => void;
    onConfirm: () => void;
}

const ConfirmModal = (props: IConfirmModalProps) => {
    const { question, lang, onClose, onConfirm } = props;

    return (
        <div className={style.modal_wrapper}>
            <div className={style.modal_background} onClick={onClose}/>
            <div className={style.modal}>
                <span>{question}</span>
                <div className={style.buttons_wrapper}>
                    <button onClick={onConfirm}>{textForApp[lang]?.modal?.answers?.[0]}</button>
                    <button onClick={onClose}>{textForApp[lang]?.modal?.answers?.[1]}</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
