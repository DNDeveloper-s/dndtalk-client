import React from "react";
import * as PropTypes from 'prop-types';
import { RiErrorWarningLine } from 'react-icons/ri'

export default function InputControl(props) {
    return (
        <div className="auth_form_input_control">
            <label htmlFor="">{props.label || 'Label'}</label>
            <input
                type={props.type || 'text'}
                spellCheck={props.checkSpell || false}
                data-valid={props.valid.bool}
                onChange={props.changed}
            />
            <div className='auth_form_input_icon'>
                {props.children}
                <div className='auth_form_input_icon_warning' aria-invalid={props.valid.message}>
                    <RiErrorWarningLine />
                </div>
            </div>
        </div>
    )
}

InputControl.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    valid: PropTypes.shape({
        bool: PropTypes.bool,
        message: PropTypes.string
    }),
    checkSpell: PropTypes.bool,
    changed: PropTypes.func
}