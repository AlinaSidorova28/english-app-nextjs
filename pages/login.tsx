import React from 'react';

import AuthorizationForm from '../components/Form/AuthorizationForm';

class Login extends React.PureComponent<{ lang: string }, any> {
    render() {
        const { lang } = this.props;

        return <AuthorizationForm inputId="login" lang={lang} focus/>;
    }
}

export default Login;
