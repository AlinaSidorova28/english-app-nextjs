import parse from 'html-react-parser';
import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import { setConstants } from '../../reducers/constantsReducer';
import { tasks } from '../../tasks';
import { IStore } from '../../utils/store';

interface ISectionHomeProps {
    className?: string;
}

interface Internal {
    constants?: Record<string, any>;
    setConstants: any;
    ownProps: any;
    addWords: any;
}

function mapStateToProps(store: IStore, ownProps: any) {
    return {
        constants: store.Constants,
        ownProps,
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        setConstants: (value: any) => {
            dispatch(setConstants(value));
        },
    };
}

export const SectionHome: React.FC<ISectionHomeProps> = connect(mapStateToProps, mapDispatchToProps)
(function SectionHome({
    className,
    constants,
    setConstants,
}: ISectionHomeProps & Internal) {
    useEffect(() => {
        setConstants({ greeting: 'Hello' });
    }, []);

    return (
        <div className={className || ''}>
            {`${constants?.greeting}, Alina! Home page :D`}
            {(tasks.a2[3].wb[9].content as string[]).map((el) => parse(el))}
            {/*<Button onClick={() => history.push('/welcome')}>Click</Button>*/}
            {/*<NavLink to={'/welcome'}>Click</NavLink>*/}
        </div>
    );
});
