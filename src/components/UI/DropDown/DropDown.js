import React from "react";
import * as PropTypes from 'prop-types';
import {string} from "prop-types";

const DropDown = props => {

    let items = null;

    if(props.items) {
        items = props.items.map((item, ind) => <li key={ind} onClick={item.clicked}>{item.name}</li>);
    }

    return (
        <div className='dropdown' data-theme={props.theme || 'white'}>
            <ul>
                {items}
            </ul>
        </div>
    )
};

DropDown.propTypes = {
    theme: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({name: PropTypes.string, clicked: PropTypes.func}))
};

export default DropDown;