import React, {useState} from "react";
import * as PropTypes from 'prop-types';

const InputControl = props => {
    const [value, setValue] = useState(props.value);

    function handleChange(e) {
        setValue(e.target.value);
    }

    return (
        <div className="dashboard_main_profile_main_card_controls">
            <div className="dashboard_main_profile_main_card_controls_input">
                <input type="text" required value={value} onChange={handleChange}/>
                <div className="dashboard_main_profile_main_card_controls_input_label">
                    <p>{props.label}</p>
                </div>
            </div>
        </div>
    )
}

InputControl.propTypes = {
    label: PropTypes.string,

}

export default InputControl;