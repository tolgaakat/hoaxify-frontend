import React from "react";
import { signup } from "../api/apiCalls";
import Input from "../components/input";
import { withTranslation } from 'react-i18next';
import { withApiProgress } from '../shared/ApiProgress'
import i18n from "../i18n";
import ButtonWithProgress from "../components/ButtonWithProgress";


class UserSignupPage extends React.Component {

    state = {
        username: null,
        displayName: null,
        password: null,
        passwordRepeat: null,
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

        try {
            const response = await signup(body);
        }
        catch (error) {
            //console.log(error);
            if (error.response.data.validationErrors) {
                this.setState({ errors: error.response.data.validationErrors });
            }
        }



    }




    render() {

        const { t, pendingApiCall } = this.props;
        const { errors } = this.state;
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
                        <ButtonWithProgress
                            onClick={this.onClickSignup}
                            disabled={pendingApiCall || passwordRepeat !== undefined}
                            pendingApiCall={pendingApiCall}
                            text={t('Sign Up')}
                        />
                    </div>

                </form >
            </div >
        );
    }
}


const UserSignupPageWithApiProgress = withApiProgress(UserSignupPage, 'api/1.0/users');

const UserSignupPageWithTranslation = withTranslation()(UserSignupPageWithApiProgress);


export default UserSignupPageWithTranslation;