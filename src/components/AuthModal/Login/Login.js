import React, {useEffect, useState} from "react";
import { FaInbox } from 'react-icons/fa';
import { AiFillEye, AiTwotoneEyeInvisible } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { LOGGED_IN } from '../../../features/auth/authSlice';
import { withRouter } from 'react-router-dom';

import { validatePassword, validateEmail } from "../../../helpers";

import InputControl from "../../UI/InputControl/InputControl";
import AuthFormMessage from "../../UI/AuthFormMessage/AuthFormMessage";
import Loader from "../../UI/Loader/Loader";

const Login = props => {
    const [submitting, setSubmitting] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    const [type, setType] = useState(null);
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState(null);

    const [emailValid, setEmailValid] = useState({});
    const [pwValid, setPwValid] = useState({});

    function validateEmailVal(e) {
        setEmail(e.target.value);
        let validatedObj = validateEmail(e.target.value);
        setEmailValid(validatedObj);
    }

    function validatePw(e) {
        setPassword(e.target.value);
        const validatedObj = validatePassword(e.target.value);
        setPwValid(validatedObj);
    }

    async function loginHandler(e) {
        setSubmitting(true);
        const res = await axios.post('http://localhost:5000/auth/login', {
            email, password
        });

        console.log(res.data);

        if(res.data.type === 'success') {
            return props.logged_in({
                authenticated: true,
                userId: res.data.userId,
                token: res.data.token
            });
        }
        setMessage(res.data.message);
        setType(res.data.type);
        setShow(!show);
        setSubmitting(false);
    }

    function togglePasswordStateHandler() {
        setShowPassword(!showPassword);
    }

    let allValid = !(emailValid.bool && pwValid.bool);

    let loader = null;
    if(submitting) {
        loader = (
            <div className='auth_form_button_loader'>
                <Loader color={'red'} />
            </div>
        )
    }

    return (
        <div className='auth_form_holder'>
            <AuthFormMessage
                show={show}
                message={message}
                timeout={5000}
                type={type}
            />
            <InputControl
                label='EMAIL'
                type='email'
                changed={validateEmailVal}
                valid={emailValid}
            >
                <FaInbox />
            </InputControl>
            <InputControl
                label='PASSWORD'
                type={showPassword ? 'text' : 'password'}
                changed={validatePw}
                valid={pwValid}
            >
                <div className='eye' onClick={togglePasswordStateHandler}>
                    {showPassword ? <AiTwotoneEyeInvisible /> : <AiFillEye />}
                </div>
            </InputControl>
            <div className='auth_form_button'>
                <button
                    disabled={allValid}
                    onClick={loginHandler}
                >
                    Sign In
                </button>
                {loader}
            </div>
            <div className="form_separator" />
            <div className='auth_form_switch'>
                <Link to={'/reset_password'}>Forgot Password?</Link>
            </div>
        </div>
    )
};

const mapDispatchToProps = dispatch => {
    return {
        logged_in: (data) => dispatch(LOGGED_IN(data))
    }
}

export default connect(null, mapDispatchToProps)(withRouter(Login));