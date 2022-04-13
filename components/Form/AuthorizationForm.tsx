import React from 'react';

import textForApp from '../../constants/translate';
import redirectTo from '../../utils/redirectTo';
import { checkConfirm, checkForEmptiness, checkPasswordInput } from '../../utils/validator';
import { SimpleSpinner } from '../SimpleSpinner/SimpleSpinner';
import style from './Form.module.scss';
import eyeImg from './img/eye.png';

interface IAuthorizationFormState {
    inputValueName: string;
    inputValuePassword: string;
    inputValueConfirm: string;
    isForSignUp: boolean;
    isPasswordHidden: boolean;
    isConfirmHidden: boolean;
    errorPlace: string;
    errorMessage: string;
    isLoading: boolean;
}

interface IAuthorizationFormProps {
    lang: string;
    inputId: string;
    focus: boolean;
}

class AuthorizationForm extends React.PureComponent<IAuthorizationFormProps, IAuthorizationFormState> {
    constructor(props) {
        super(props);
        this.state = {
            inputValueName: '',
            inputValuePassword: '',
            inputValueConfirm: '',
            isForSignUp: false,
            isPasswordHidden: true,
            isConfirmHidden: true,
            errorPlace: '',
            errorMessage: '',
            isLoading: false,
        };
        this.handleInputName = this.handleInputName.bind(this);
        this.handleInputPassword = this.handleInputPassword.bind(this);
        this.handleInputConfirm = this.handleInputConfirm.bind(this);
        this.resetInputs = this.resetInputs.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.handleErrors = this.handleErrors.bind(this);
    }

    componentDidMount() {
        this.makeFocus('name');
    }

    handleInputName(e) {
        this.setState({ inputValueName: e.target.value });

        if (e.target.value) {
            e.target.setCustomValidity('');
        }
    }

    handleInputPassword(e) {
        const { lang } = this.props;
        const { isForSignUp } = this.state;
        this.setState({ inputValuePassword: e.target.value });

        if (isForSignUp) {
            checkPasswordInput(e, lang);
        } else if (e.target.value) {
            e.target.setCustomValidity('');
        }
    }

    handleInputConfirm(e) {
        this.setState({ inputValueConfirm: e.target.value });
        const { inputValuePassword } = this.state;
        const { lang } = this.props;

        checkConfirm(e, inputValuePassword, lang);
    }

    async handleErrors(text) {
        const { lang } = this.props;

        switch (text) {
        case 'User doesn\'t exist':
            this.setState({
                errorMessage: textForApp[lang].error[0],
                errorPlace: 'name',
            });
            this.makeFocus('name');
            break;
        case 'Password is incorrect':
            this.setState({
                errorMessage: textForApp[lang].error[1],
                errorPlace: 'password',
            });
            this.makeFocus('password');
            break;
        case 'Such user already exists':
            this.setState({
                errorMessage: textForApp[lang].error[2],
                errorPlace: 'name',
            });
            this.makeFocus('name');
            break;
        default:
            this.setState({ errorPlace: '' });
            try {
                await fetch('/');
                redirectTo('/');
            } catch (err) {
                console.error(err);
            }

            break;
        }
    }

    async onSubmitHandler(e) {
        e.preventDefault();

        const { lang, inputId } = this.props;
        const {
            inputValueName,
            inputValuePassword,
            isForSignUp,
        } = this.state;

        if (checkForEmptiness(inputId, lang, isForSignUp)) {
            const url = isForSignUp ? '/api/users/register' : '/api/users/login';

            try {
                this.setState({ isLoading: true }, async () => {
                    const res = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            login: inputValueName,
                            password: inputValuePassword,
                        }),
                    }).then((response) => {
                        this.setState({ isLoading: false });

                        return response.json();
                    }).catch((error) => {
                        this.setState({ isLoading: false });
                        console.error(error);
                    });

                    this.handleErrors(res.error);
                });
            } catch (error) {
                console.error(error);
            }
        }
    }

    makeFocus(id) {
        const { inputId, focus } = this.props;
        if (focus) {
            document.getElementById(`${inputId}-${id}`)?.focus();
        }
    }

    resetInputs() {
        this.setState((prev) => ({
            inputValueName: '',
            inputValuePassword: '',
            inputValueConfirm: '',
            isPasswordHidden: true,
            isConfirmHidden: true,
            isForSignUp: !prev.isForSignUp,
            errorPlace: '',
            errorMessage: '',
        }));

        this.makeFocus('name');
    }

    render() {
        const { inputId, lang } = this.props;

        const {
            inputValueName,
            inputValuePassword,
            inputValueConfirm,
            isForSignUp,
            isPasswordHidden,
            isConfirmHidden,
            errorPlace,
            errorMessage,
            isLoading,
        } = this.state;

        const text = isForSignUp
            ? textForApp[lang].authorization.text[1]
            : textForApp[lang].authorization.text[0];

        return (
            <div className={style.signin}>
                <div className={style.signin__container}>
                    <h1>{text}</h1>
                    <form onSubmit={(e) => this.onSubmitHandler(e)}>
                        <input id={`${inputId}-name`}
                               className={`${style['input-field-name']} ${style.name} ${errorPlace === 'name'
                                   ? style['error-input'] : ''}`}
                               autoComplete="off"
                               autoFocus
                               maxLength={18}
                               value={inputValueName}
                               placeholder={textForApp[lang].authorization.placeholder[0]}
                               onChange={this.handleInputName}/>
                        <input id={`${inputId}-password`}
                               className={`${style['input-field-name']} ${errorPlace === 'password' ? style['error-input'] : ''}`}
                               autoComplete="off"
                               type={isPasswordHidden ? 'password' : 'text'}
                               value={inputValuePassword}
                               placeholder={textForApp[lang].authorization.placeholder[1]}
                               onChange={this.handleInputPassword}/>
                        <span className={style.eye}
                              role={"button"}
                              onClick={() => {
                                  this.setState({ isPasswordHidden: !isPasswordHidden });
                              }}>
                            <img src={eyeImg} alt="visible"/>
                            <div className={`${style.before} ${!isPasswordHidden ? style.hidden : ''}`}>/</div>
                        </span>
                        <input id={`${inputId}-confirm`}
                               className={`${style['input-field-name']} ${errorPlace === 'confirm'
                                   ? style['error-input'] : ''} ${isForSignUp ? '' : style.hidden}`}
                               autoComplete="off"
                               type={isConfirmHidden ? 'password' : 'text'}
                               value={inputValueConfirm}
                               placeholder={textForApp[lang].authorization.placeholder[2]}
                               onChange={this.handleInputConfirm}/>
                        <span className={`${style.eye} ${isForSignUp ? '' : style.hidden}`}
                              role={"button"}
                              onClick={() => {
                                  this.setState({ isConfirmHidden: !isConfirmHidden });
                              }}>
                            <img src={eyeImg} alt="visible"/>
                            <div className={`${style.before} ${!isConfirmHidden ? style.hidden : ''}`}>/</div>
                        </span>
                        <p className={`${style.error} ${!errorPlace ? style.hidden : ''}`}>{errorMessage}</p>
                        <button className={style[`button-${isForSignUp ? 'signup' : 'signin'}`]}
                                type="submit">
                                {/*value={isLoading ? <SimpleSpinner/> : text.toLowerCase()}>*/}
                            {isLoading ? <SimpleSpinner/> : text.toLowerCase()}
                        </button>
                    </form>
                    <p className={style['to-sign-up']}>
                        {isForSignUp
                            ? textForApp[lang].authorization.question[1]
                            : textForApp[lang].authorization.question[0]}
                        <span role="button"
                              onClick={this.resetInputs.bind(this)}>
                            {isForSignUp
                                ? textForApp[lang].authorization.text[0]
                                : textForApp[lang].authorization.text[1]}
                        </span>
                    </p>
                </div>
            </div>
        );
    }
}

export default AuthorizationForm;
