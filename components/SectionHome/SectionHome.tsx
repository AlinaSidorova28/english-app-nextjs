import nookies from 'nookies';
import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import { setConstants } from '../../reducers/constantsReducer';
import { IStore } from '../../utils/store';
import PromoPage from '../PromoPage/PromoPage';

interface ISectionHomeProps {
    className?: string;
}

interface Internal {
    constants?: Record<string, any>;
    setConstants: any;
    ownProps: any;
    userName?: string;
}

function mapStateToProps(store: IStore, ownProps: any) {
    const { userName } = nookies.get(null);

    return {
        constants: store.Constants,
        ownProps,
        userName,
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
    userName,
}: ISectionHomeProps & Internal) {
    useEffect(() => {
        setConstants({ greeting: 'Hello' });
    }, []);

    return (
        <div>
            {userName
                ? <div className={className || ''}>
                    {`${constants?.greeting}, Alina! Home page :D`}
                    {/*{(tasks.a2[3].wb[9].content as string[]).map((el) => parse(el))}*/}
                    {/*<Button onClick={() => history.push('/welcome')}>Click</Button>*/}
                    {/*<NavLink to={'/welcome'}>Click</NavLink>*/}
                </div>
                : <PromoPage/>}
        </div>
    );
});
