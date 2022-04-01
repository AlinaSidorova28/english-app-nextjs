import * as React from 'react';

import style from './Collapse.module.scss';

interface ICollapseProps {
    initialExpanded?: boolean;
    expandText?: string;
    closeText?: string;
    title: string;
    children: React.ReactNode;
    className?: string;
    headerClassname?: string;
    expendByRoot?: boolean;
}

export const Collapse = (props: ICollapseProps) => {
    const {
        children,
        initialExpanded = false,
        expandText = 'Развернуть',
        closeText = 'Свернуть',
        title,
        className,
        headerClassname,
        expendByRoot,
    } = props;
    const [isExpanded, setExpanded] = React.useState(initialExpanded);

    const _setExpanded = (value, e) => {
        e?.stopPropagation();
        setExpanded(value);
    };

    return <>
        <div className={`${style.header} ${style[headerClassname ?? '']} ${style[expendByRoot ? 'interactive' : '']}`}
             onClick={expendByRoot && _setExpanded.bind(null, !isExpanded) || undefined}>
            <h4>{title}</h4>
            <div className={`${style.expandToggle} ${style.interactive}`}
                 onClick={_setExpanded.bind(null, !isExpanded)}>
                {!isExpanded ? expandText : closeText}
            </div>
        </div>
        <div className={className ? className : ''}>
            {isExpanded
                ? children
                : null
            }
        </div>
        <hr className={style.separator}/>
    </>;
};
