import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        };
    }

    onChangeEmail = e => {
        const { value: email } = e.target;

        this.setState(state => ({ ...state, email }));

        // this.setState(state => ({
        //     email: state.email,
        //     password: state.password,
        //     email,        
        // });
    }

    onChangePassword = e => {
        const { value: password } = e.target;

        this.setState(state => ({ ...state, password }));
    }

    onSubmit = (e = { preventDefault: () => {} }) => {
        e.preventDefault();
        const { password, email } = this.state;

        this.props.onSubmit(email, password);
    }

    render() {
        const {
            email,
            password,
        } = this.state;

        return (
            <form id="login-form" className="login-form" onSubmit={e => this.onSubmit(e)}>
                <h2 className="login-form__title">Zaloguj się</h2>
                {this.props.errorMessage && <Paper className="error-box">{this.props.errorMessage}</Paper>}
                <TextField
                    label="Email"
                    value={email}
                    onChange={this.onChangeEmail}
                    type="email"
                    fullWidth
                >Email
                </TextField>
                <TextField
                    label="Hasło"
                    fullWidth
                    value={password}
                    onChange={this.onChangePassword}
                    type="password"
                >Hasło
                </TextField>
                <Button 
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="form-login__button"
                    onClick={this.onSubmit}
                >Zaloguj się</Button>
            </form>                
        );
    }
}

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired,
};

export default LoginForm;