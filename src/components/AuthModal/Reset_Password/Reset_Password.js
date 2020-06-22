import React, {useState} from "react";
import InputControl from "../../UI/InputControl/InputControl";
import {FaInbox} from "react-icons/fa";
import {Link} from "react-router-dom";
import {validateEmail} from "../../../helpers";
import Loader from "../../UI/Loader/Loader";

const Reset_Password = props => {
    const [submitting, setSubmitting] = useState(false);

    const [emailValid, setEmailValid] = useState({});

    function validateEmailVal(e) {
        let validatedObj = validateEmail(e.target.value);
        setEmailValid(validatedObj);
    }

    let allValid = !emailValid.bool;

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
            <div className="auth_form_notice">
                <p>Enter the email connected to your account, We will sent reset password link onto that.</p>
            </div>
            <InputControl
                label='EMAIL'
                type='email'
                changed={validateEmailVal}
                valid={emailValid}
            >
                <FaInbox />
            </InputControl>
            <div className='auth_form_button'>
                <button
                    disabled={allValid}
                >
                    Reset Password
                </button>
                {loader}
            </div>
            <div className="form_separator" />
            <div className='auth_form_switch'>
                <p>Click here to </p><Link to={'/login'}>Login</Link>
            </div>
        </div>
    )
}

export default Reset_Password;