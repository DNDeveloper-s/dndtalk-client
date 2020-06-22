import React, {useEffect, useState} from "react";
import * as PropTypes from 'prop-types';
import {wait} from "../../../helpers";

const AuthFormMessage = (props) => {
    let [message, setMessage] = useState('');
    let [timer, setTimer] = useState(null);

    let mounted = false;

    useEffect(() => {
        mounted = true;
        async function toggleMessage() {
            await hideMessage();
            setMessage(props.message);
            showMessage();
        }
        if(props.message) {
            toggleMessage();
        }

        // Component will unmount
        return () => {
            mounted = false;
        }
    }, [props.show])


    function hideMessage() {
        if(mounted) {
            const messageEl = document.querySelector('.auth_form_message');
            messageEl.classList.remove('show');
            return wait(300);
        }
    }

    function showMessage() {
        if(mounted) {
            const messageEl = document.querySelector('.auth_form_message');
            messageEl.classList.add('show');

            if(props.timeout) {
                if(timer) {
                    clearTimeout(timer);
                    setTimer(null);
                }
                let timerOut = setTimeout(async () => {
                    await hideMessage();
                }, props.timeout);
                setTimer(timerOut);
            }
        }
    }

    let classes = ['auth_form_message', props.type || ''];

    return (
        <div className={classes.join(' ')}>
            <p>{message}</p>
        </div>
    )
}

AuthFormMessage.propTypes = {
    timeout: PropTypes.number,
    message: PropTypes.string,
    show: PropTypes.bool
}

export default AuthFormMessage;