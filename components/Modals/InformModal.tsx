import { Modal } from 'antd';
import React from 'react';

import style from './Modals.module.scss';

interface IInformModalProps {
    title: string;
    content: any;
    onClose: () => void;
}

const InformModal = (props: IInformModalProps) => {
    const { title, onClose, content } = props;

    return (
        <Modal visible={true}
               className={style.modal}
               title={title}
               footer={null}
               onCancel={onClose}
               centered={true}>
            <div className={style.info_content}>{content}</div>
        </Modal>
    );
};

export default InformModal;
