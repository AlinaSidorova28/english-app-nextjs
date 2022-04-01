import React from 'react';

import style from './Link.module.scss';

interface ILinkProps {
    href?: string;
    title?: string;
    onClick?: () => void;
    className?: string;
    target?: string;
    disable?: boolean;
    disablePreventDefault?: boolean;
}

export class Link extends React.Component<ILinkProps, any> {
    constructor(props: ILinkProps) {
        super(props);
    }

    onClick(e: KeyboardEvent) {
        const { href, onClick, disablePreventDefault } = this.props;
        if (!href || href && onClick && !disablePreventDefault) {
            e.preventDefault();
        }

        e.stopPropagation();
        onClick && onClick();
    }

    render() {
        const { onClick: isInteractive, href, target, title, className, disable, children } = this.props;

        return <a href={href || '/'}
                  title={title}
                  rel={"noopener"}
                  target={target}
                  className={`${style.link}
                  + ${style[isInteractive ? 'link_interactive' : '']}
                  + ${className || ''}
                  + ${style[disable ? 'disable' : '']}`
                  }
                  onClick={() => this.onClick.bind(this)}>{children}</a>;
    }
}
