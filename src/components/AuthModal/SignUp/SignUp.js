import React, {useState} from "react";
import { FaUserTie, FaInbox } from 'react-icons/fa';
import { AiFillEye, AiTwotoneEyeInvisible } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import validator from "validator/es";
import axios from 'axios';

import InputControl from "../../UI/InputControl/InputControl";
import AuthFormMessage from "../../UI/AuthFormMessage/AuthFormMessage";
import Loader from "../../UI/Loader/Loader";

import {
    validatePassword,
    validateEmail,
} from "../../../helpers";



const SignUp = props => {
    const [submitting, setSubmitting] = useState(false);

    const [pwValue, setPwValue] = useState('');
    const [fullNameValue, setFullNameValue] = useState('');
    const [emailValue, setEmailValue] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showConPassword, setShowConPassword] = useState(false);

    const [type, setType] = useState(null);
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState(null);

    const [fullNameValid, setFullNameValid] = useState({});
    const [emailValid, setEmailValid] = useState({});
    const [pwValid, setPwValid] = useState({});
    const [confirmPwValid, setConfirmPwValid] = useState({});

    function validateName(e) {
        setFullNameValue(e.target.value);
        let conditions = validator.isLength(e.target.value, {min: undefined, max: 20}) &&
        !validator.isEmpty(e.target.value);
        setFullNameValid({
            bool: conditions,
            message: 'Name cannot be empty and at most 20 characters.'
        });
    }

    function validateEmailVal(e) {
        setEmailValue(e.target.value);
        let validatedObj = validateEmail(e.target.value);
        setEmailValid(validatedObj);
    }

    function validatePw(e) {
        setPwValue(e.target.value);
        const validatedObj = validatePassword(e.target.value);
        setPwValid(validatedObj);
    }

    function validateConfirmPw(e) {
        let conditions = validator.equals(e.target.value, pwValue);
        setConfirmPwValid({
            bool: conditions,
            message: 'Password doesn\'t match'
        });
    }

    async function signupHandler(e) {
        setSubmitting(true);
        const res = await axios.post('http://localhost:5000/auth/signup', {
            fullName: fullNameValue,
            password: pwValue,
            email: emailValue
        });
        setSubmitting(false);
        console.log(res.data);
        setMessage(res.data.message);
        setType(res.data.type);
        setShow(!show);
    }

    function togglePasswordStateHandler() {
        setShowPassword(!showPassword);
    }

    function toggleConPasswordStateHandler() {
        setShowConPassword(!showConPassword);
    }

    let allValid = !(fullNameValid.bool && emailValid.bool && pwValid.bool && confirmPwValid.bool);

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
            {/*<div className="auth_form_message">*/}
            {/*    <p>{message}</p>*/}
            {/*</div>*/}
            <InputControl
                label='FULL NAME'
                changed={validateName}
                valid={fullNameValid}

            >
                <FaUserTie />
            </InputControl>
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
                <div className={'eye'} onClick={togglePasswordStateHandler}>
                    {showPassword ? <AiTwotoneEyeInvisible /> : <AiFillEye />}
                </div>
            </InputControl>
            <InputControl
                label='CONFIRM PASSWORD'
                type={showConPassword ? 'text' : 'password'}
                changed={validateConfirmPw}
                valid={confirmPwValid}
            >
                <div className={'eye'} onClick={toggleConPasswordStateHandler}>
                    {showConPassword ? <AiTwotoneEyeInvisible /> : <AiFillEye />}
                </div>
            </InputControl>
            <div className='auth_form_button'>
                <button
                    disabled={allValid}
                    onClick={signupHandler}
                >
                    Sign Up
                </button>
                {loader}
            </div>
            <div className="form_separator" />
            <div className='auth_form_switch'>
                <p>Already have an account? Click</p><NavLink to={'/login'}>Sign In</NavLink>
            </div>
        </div>
    )
};

export default SignUp;