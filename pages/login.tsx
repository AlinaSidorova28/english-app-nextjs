import nookies from 'nookies';
import React from 'react';

import AuthorizationForm from '../components/Form/AuthorizationForm';

class Login extends React.PureComponent<{ lang: string }, any> {
    static async getInitialProps(ctx) {
        const { lang } = nookies.get(ctx);

        return { lang };
    }

    render() {
        const { lang } = this.props;

        return (
            <>
                <div className="logo" />
                <AuthorizationForm inputId="login" lang={lang} focus/>
            </>
        );
    }
}

export default Login;
