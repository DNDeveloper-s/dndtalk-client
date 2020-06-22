import React from "react";
import PhoneInput from "react-phone-input-2";
import './TelInput.scss';

const TelInput = props => {
    return (
        <PhoneInput country={'in'} />
    )
}

export default TelInput;