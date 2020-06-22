import React from "react";
import * as PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

// Components Imports
import SignUp from "./SignUp/SignUp";
import Login from "./Login/Login";
import Reset_Password from "./Reset_Password/Reset_Password";

// Images Imports
import Logo from '../../assets/images/logo.png';

const AuthModal = (props) => {
    let main_auth = <Login />
    if(props.authType === 'signup') {
        main_auth = <SignUp />
    }
    if(props.authType === 'reset_password') {
        main_auth = <Reset_Password />
    }
    return (
        <div className='auth_modal'>
            <div className="auth_modal_header">
                <div className="auth_modal_toggle_buttons">
                    <NavLink to='/login'>SIGN IN</NavLink>
                    <NavLink to='/signup'>SIGN UP</NavLink>
                </div>
                <div className="auth_modal_logo">
                    <img src={Logo} alt="DNDtalk"/>
                </div>
            </div>
            <div className="main_auth">
                {main_auth}
            </div>
        </div>
    )
}

AuthModal.propTypes = {
    authType: PropTypes.oneOf(['signup', 'login', 'reset_password']),
}

export default AuthModal;