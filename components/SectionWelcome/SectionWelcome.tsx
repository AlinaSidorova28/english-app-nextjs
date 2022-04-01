import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import { setConstants } from '../../reducers/constantsReducer';
import { IStore } from '../../utils/store';

interface ISectionWelcomeProps {
    className?: string;
}

interface Internal {
    constants?: Record<string, any>;
    setConstants: any;
}

function mapStateToProps(store: IStore) {
    return {
        constants: store.Constants,
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        setConstants: (value: any) => {
            dispatch(setConstants(value));
        },
    };
}

export const SectionWelcome: React.FC<ISectionWelcomeProps> = connect(mapStateToProps, mapDispatchToProps)
(function SectionWelcome({
    className,
    constants,
    setConstants,
}: ISectionWelcomeProps & Internal) {
    useEffect(() => {
        setConstants({ greeting: 'Hello' });
    }, []);

    return (
        <div className={className || ''}>
            {`${constants?.greeting}, Alina!`}
        </div>
    );
});
