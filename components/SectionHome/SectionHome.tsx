import * as React from 'react';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { setConstants } from '../../reducers/constantsReducer';
import { LanguageType } from '../../types/general';
import { IStore } from '../../utils/store';
import PromoPage from '../PromoPage/PromoPage';

interface ISectionHomeProps {
    props: Record<string, any>;
}

interface Internal {
    constants?: Record<string, any>;
    setConstants: any;
    ownProps: any;
    userName?: string;
    lang: LanguageType;
}

function mapStateToProps(store: IStore, ownProps: any) {
    return {
        constants: store.Constants,
        ...ownProps?.props,
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
    constants,
    setConstants,
    lang,
    userName,
}: ISectionHomeProps & Internal) {
    const [isRendered, setIsRendered] = useState(false);

    useEffect(() => {
        setConstants({ greeting: 'Hello' });
        setIsRendered(true);
    }, []);

    if (!isRendered) {
        return null;
    }

    return (
        userName
            ? <div>
                {`${constants?.greeting}, Alina! Home page :D`}
                {/*{(tasks.a2[3].wb[9].content as string[]).map((el) => parse(el))}*/}
                {/*<Button onClick={() => history.push('/welcome')}>Click</Button>*/}
                {/*<NavLink to={'/welcome'}>Click</NavLink>*/}
            </div>
            : <PromoPage lang={lang}/>
    );

});
