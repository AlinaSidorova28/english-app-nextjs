import { useRouter } from 'next/router';
import nookies from 'nookies';
import React, { useEffect, useState } from 'react';

import { LanguageType } from '../../types/general';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

export default function Layout({ children }) {
    const [lang, setLang] = useState(LanguageType.ru);
    const [userName, setUserName] = useState<string | undefined>(undefined);
    const router = useRouter();

    useEffect(() => {
        const { lang, userName } = nookies.get(null);
        setLang(lang as LanguageType);
        setUserName(userName);
    }, [lang, userName, router]);

    return (
        <>
            <Header lang={lang} userName={userName}/>
            <main>{React.cloneElement(children, { userName, lang })}</main>
            <Footer lang={lang}/>
        </>
    );
}
