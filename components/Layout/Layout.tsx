import { useRouter } from 'next/router';
import nookies, { setCookie } from 'nookies';
import React, { useEffect, useState } from 'react';

import Home from '../../pages';
import { LanguageType } from '../../types/general';
import redirectTo from '../../utils/redirectTo';
import { updateSettings } from '../../utils/settingsControllers';
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
        const { lang } = children?.props;
        setLang(lang as LanguageType);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        const { userName } = nookies.get(null);
        const shouldRedirect = !userName && router.pathname !== '/login' && router.pathname !== '/';

        if (shouldRedirect) {
            redirectTo('/');
        }

        setUserName(userName);
        setShouldRedirect(shouldRedirect);
    }, [lang, userName, router]);

    const updateLang = (value) => {
        updateSettings({ lang: value });
        setLang(value);
        setCookie(null, 'lang', value);
    };

    if (isLoading) {
        return <Spinner lang={children?.props?.lang}/>;
    }

    return (
        <>
            <Header lang={lang} userName={userName}/>
            <main>
                {!userName
                    ? shouldRedirect
                        ? React.cloneElement(<Home/>, { userName, lang })
                        : React.cloneElement(children, { userName, lang })
                    : React.cloneElement(children, { userName, lang, updateLang })}
            </main>
            <Footer lang={lang}/>
        </>
    );
}
