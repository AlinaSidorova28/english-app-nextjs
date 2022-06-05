import { MenuOutlined } from '@ant-design/icons';
import Link from 'next/link';
import React from 'react';

import textForApp from '../../constants/translate';
import { LanguageType } from '../../types/general';
import { logout } from '../../utils/authControllers';
import NavLink from '../NavLink/NavLink';
import style from './Header.module.scss';
import userImg from './img/user.png';

interface IHeaderProps {
    lang: LanguageType;
    userName?: string;
}

interface IHeaderState {
    show: boolean;
    showNavMenu: boolean;
    isRendered: boolean;
}

class Header extends React.PureComponent<IHeaderProps, IHeaderState> {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            showNavMenu: false,
            isRendered: false,
        };
        this.showMenu = this.showMenu.bind(this);
    }

    componentDidMount() {
        this.setState({ isRendered: true });
        document.getElementById('__next')?.addEventListener('click', (e) => {
            if ((e?.target as HTMLElement)?.className !== style.user) {
                this.setState({ show: false });
            }

            if ((e?.target as HTMLElement)?.className !== style.burger_wrapper) {
                this.setState({ showNavMenu: false });
            }
        });
    }

    showMenu() {
        this.setState((prevState) => ({
            show: !prevState.show,
        }));
    }

    showNavMenu() {
        this.setState((prevState) => ({
            showNavMenu: !prevState.showNavMenu,
        }));
    }

    render() {
        const { show, showNavMenu, isRendered } = this.state;
        const { lang, userName } = this.props;

        if (!isRendered) {
            return null;
        }

        return (
            <div className={style.header}>
                <img className={style.user} src={userImg} alt="user" role="button" onClick={this.showMenu} />
                <div className={`${style['user-links']} ${!userName ? style.short : ''} ${show ? '' : style.hidden}`}>
                    {userName
                        ? <>
                            <Link href="/profile">
                                <a className={style.profile}>{textForApp[lang].links[1]}</a>
                            </Link>
                            <span className={style.exit}
                                  role="button"
                                  onClick={() => logout()}
                                  tabIndex={0}>
                                {textForApp[lang].authorization.text[2]}
                            </span>
                        </>
                        : <Link href="/login">
                            <a className={style.login}>{textForApp[lang].authorization.text[0]}</a>
                        </Link>}
                </div>
                <div className={style.burger_wrapper}
                     onClick={this.showNavMenu.bind(this)}/>
                <MenuOutlined className={`${style.burger} ${showNavMenu ? style.rotate : ''}`}/>
                <ul className={`${style.navigation} ${showNavMenu ? style.opened : ''}`}>
                    <li>
                        <NavLink href="/" activeClassName={style.active}>
                            <a>{textForApp[lang].links[2]}</a>
                        </NavLink>
                    </li>
                    {userName && <>
                        <li>
                            <NavLink href="/tasks" activeClassName={style.active} exact={false}>
                                <a>{textForApp[lang].links[3]}</a>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink href="/dictionary" activeClassName={style.active}>
                                <a>{textForApp[lang].links[4]}</a>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink href="/rules" activeClassName={style.active}>
                                <a>{textForApp[lang].links[5]}</a>
                            </NavLink>
                        </li>
                    </>}
                </ul>
            </div>
        );
    }
}

export default Header;
