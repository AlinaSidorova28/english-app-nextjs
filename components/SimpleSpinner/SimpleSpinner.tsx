import * as React from 'react';

import style from './SimpleSpinner.module.scss';

export interface SpinnerProps {
    className?: string;

    size?: number;
    strokeSize?: number;
}

export const SimpleSpinner: React.FC<SpinnerProps> = function SimpleSpinner({ className, size = 24, strokeSize = 2 }) {
    const radius = size / 2;

    return (
        <svg className={`${style.spinner} ${className}`}
             viewBox={`0 0 ${size} ${size}`}
             width={size}
             height={size}>
            <circle cx={radius}
                    cy={radius}
                    r={radius - strokeSize}
                    fill="none"
                    strokeWidth={strokeSize}
                    strokeDasharray="30,150"
                    strokeDashoffset="0"/>
        </svg>
    );
};
