import React from "react";
import { signup } from "../api/apiCalls";
import Input from "../components/input";
import { withTranslation } from 'react-i18next';
import i18n from "../i18n";
import { changeLanguage } from "i18next";


class UserSignupPage extends React.Component {

    state = {
        username: null,
        displayName: null,
        password: null,
        passwordRepeat: null,
        pendingApiCall: null,
        errors: {}
    }

    onChange = event => {
        const { t } = this.props;
        const { name, value } = event.target;
        const errors = { ...this.state.errors }; // kopyalama -spread operator
        errors[name] = undefined

        if (name === 'password' || name === 'passwordRepeat') {
            if (name === 'password' && value !== this.state.passwordRepeat) {
                errors.passwordRepeat = t('Password mismatch');
            } else if (name === 'passwordRepeat' && value !== this.state.password) {
                errors.passwordRepeat = t('Password mismatch');
            } else {
                errors.passwordRepeat = undefined;
            }
        }


        this.setState({
            [name]: value,
            errors
        });
    }



    onClickSignup = async event => {
        event.preventDefault();


        const { username, displayName, password } = this.state;

        const body = {
            username,
            displayName,
            password
        }

        this.setState({ pendingApiCall: true });

        try {
            const response = await signup(body);
        }
        catch (error) {
            //console.log(error);
            if (error.response.data.validationErrors) {
                this.setState({ errors: error.response.data.validationErrors });
            }
        }

        this.setState({ pendingApiCall: false });

        /*
             signup(body)
                 .then(response => {
                     this.setState({ pendingApiCall: false });
                 })
                 .catch(error => {
                     this.setState({ pendingApiCall: false });
                 })
         */

    }

    onChangeLanguage = language => {
        const { i18n } = this.props;
        i18n.changeLanguage(language);
        changeLanguage(language); //axios  accept-language header prm. set eder
    }


    render() {

        const { t } = this.props;
        const { pendingApiCall, errors } = this.state;
        const { username, displayName, password, passwordRepeat } = errors;


        return (

            <div className="container">
                <form>
                    <h1 className="text-center">{this.props.t('Sign Up')}</h1 >
                    <Input name="username" label={t("Username")} error={username}
                        onChange={this.onChange} />
                    {/* <div className="form-group">
                        <label>Username</label>
                        <input className={username ? "form-control is-invalid" : "form-control"} name="username" onChange={this.onChange} />
                        <div className="invalid-feedback">{username} </div> 
                    </div> */}
                    <Input name="displayName" label={t("Display Name")} error={displayName}
                        onChange={this.onChange} />
                    <Input name="password" label={t("Password")} error={password}
                        onChange={this.onChange} type="password" />
                    <Input name="passwordRepeat" label={t("Password Repeat")} error={passwordRepeat}
                        onChange={this.onChange} type="password" />
                    <div className="text-center">
                        <button
                            className="btn btn-primary"
                            onClick={this.onClickSignup}
                            disabled={pendingApiCall || passwordRepeat !== undefined}
                        >
                            {pendingApiCall && <span className="spinner-border spinner-border-sm"> </span>}
                            {t('Sign Up')}
                        </button>
                    </div>
                    <div>
                        <img src="https://cdn.countryflags.com/thumbs/turkey/flag-square-250.png" width="24" height="24" alt="Turkish Flag" onClick={() => this.onChangeLanguage('tr')} style={{ cursor: 'pointer' }}></img>
                        <img src="https://cdn.countryflags.com/thumbs/united-states-of-america/flag-square-250.png" width="24" height="24" alt="USA Flag" onClick={() => this.onChangeLanguage('en')} style={{ cursor: 'pointer' }}></img>
                    </div>
                </form >
            </div >
        );
    }
}

const UserSignupPageWithTranslation = withTranslation()(UserSignupPage);

export default UserSignupPageWithTranslation;