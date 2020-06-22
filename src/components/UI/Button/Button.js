import React from "react";
import * as PropTypes from 'prop-types';

import classes from './Button.module.scss';
import {rippleClicked} from "../../../helpers";

const Button = props => {

    return (
        <div style={props.styles} className={classes.Button} onClick={e => {
            // props.clicked ? props.clicked() : null;
            props.clicked()
            rippleClicked(e);
        }}>
            {props.children}
        </div>
    )
};

Button.propTypes = {
    clicked: PropTypes.func.isRequired,
    styles: PropTypes.object
}
;
export default Button;