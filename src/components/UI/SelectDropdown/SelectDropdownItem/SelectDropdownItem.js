import React from "react";
import * as PropTypes from 'prop-types';

const SelectDropdownItem = props => {

    let styles = {
        color: props.itemColor,
        fontSize: props.fontSize,
    }

    return (
        <div className='select_dropdown_list_item' onClick={props.clicked}>
            <p style={styles}>{props.children}</p>
        </div>
    )
}

SelectDropdownItem.propTypes = {
    clicked: PropTypes.func,
    itemColor: PropTypes.string
}

export default SelectDropdownItem;