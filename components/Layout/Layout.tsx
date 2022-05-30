import { useRouter } from 'next/router';
import nookies from 'nookies';
import React, { useEffect, useState } from 'react';

import Home from '../../pages';
import { LanguageType } from '../../types/general';
import redirectTo from '../../utils/redirectTo';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Spinner from '../Spinner/Spinner';

export default function Layout({ children }) {
    const [lang, setLang] = useState(LanguageType.ru);
    const [userName, setUserName] = useState<string | undefined>(undefined);
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        setIsLoading(false);
    }, []);

    useEffect(() => {
        const { userName } = nookies.get(null);
        const { lang } = children?.props;
        const shouldRedirect = !userName && router.pathname !== '/login' && router.pathname !== '/';

        if (shouldRedirect) {
            redirectTo('/');
        }

        setLang(lang as LanguageType);
        setUserName(userName);
        setShouldRedirect(shouldRedirect);
    }, [lang, userName, router]);

    if (isLoading) {
        return <Spinner/>;
    }

    return (
        <>
            <Header lang={lang} userName={userName}/>
            <main>
                {!userName
                    ? shouldRedirect
                        ? React.cloneElement(<Home/>, { userName, lang })
                        : React.cloneElement(children, { userName, lang })
                    : React.cloneElement(children, { userName, lang })}
            </main>
            <Footer lang={lang}/>
        </>
    );
}
