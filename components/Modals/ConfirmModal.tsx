import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import React from 'react';

import textForApp from '../../constants/translate';
import { LanguageType } from '../../types/general';
import style from './Modals.module.scss';

interface IConfirmModalProps {
    question: string;
    lang: LanguageType;
    onClose: () => void;
    onConfirm: () => void;
}

const ConfirmModal = (props: IConfirmModalProps) => {
    const { question, lang, onClose, onConfirm } = props;

    return (
        <Modal visible={true}
               className={`${style.modal} ${style.confirm}`}
               title={
                   <span>
                       <ExclamationCircleOutlined className={style.warn}/>
                       {textForApp[lang]?.modal?.headers?.[0]}
                   </span>
               }
               width="35%"
               footer={
                   <div className={style.buttons_wrapper}>
                       <button onClick={onConfirm}>{textForApp[lang]?.modal?.answers?.[0]}</button>
                       <button onClick={onClose}>{textForApp[lang]?.modal?.answers?.[1]}</button>
                   </div>
               }
               okText={textForApp[lang]?.modal?.answers?.[0]}
               cancelText={textForApp[lang]?.modal?.answers?.[1]}
               onCancel={onClose}
               onOk={onConfirm}
               centered={true}>
            <div className={style.confirm_content}>{question}</div>
        </Modal>
    );
};

export default ConfirmModal;
