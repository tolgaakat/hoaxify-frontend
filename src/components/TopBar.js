import React, { Component } from 'react';
import logo from '../assets/hoaxify.png';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { t } from 'i18next';

class TopBar extends Component {
    render() {
        return (
            <div className='shadow-sm bg-light mb-2' >
                <nav className="navbar navbar-light  container navbar-expand">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} width="60" alt="Hoaxify Logo" />
                        Hoaxify</Link>
                    <ul className='navbar-nav ms-auto'>
                        <li>
                            <Link className='nav-link' to='/login'>
                                {t('Login')}
                            </Link>
                        </li>
                        <li>
                            <Link className='nav-link' to='/signup'>
                                {t('Sign Up')}
                            </Link>
                        </li>
                    </ul>

                </nav>
            </div>
        )
    }
}


export default withTranslation()(TopBar);
