import { useRouter } from 'next/router';
import nookies from 'nookies';
import React, { useEffect, useState } from 'react';

import Home from '../../pages';
import { LanguageType } from '../../types/general';
import redirectTo from '../../utils/redirectTo';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

export default function Layout({ children }) {
    const [lang, setLang] = useState(LanguageType.ru);
    const [userName, setUserName] = useState<string | undefined>(undefined);
    const router = useRouter();

    useEffect(() => {
        const { userName } = nookies.get(null);
        const { lang } = children?.props;

        if (!userName && router.pathname !== '/login' && router.pathname !== '/promo' && router.pathname !== '/') {
            redirectTo('/');
        }

        setLang(lang as LanguageType);
        setUserName(userName);
    }, [lang, userName, router]);

    const shouldRedirect = (!userName && router.pathname !== '/login' && router.pathname !== '/promo' && router.pathname !== '/');

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
