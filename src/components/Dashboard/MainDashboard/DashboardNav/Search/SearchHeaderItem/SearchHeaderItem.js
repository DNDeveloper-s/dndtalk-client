import React from 'react';
import * as PropTypes from 'prop-types';

// Components Imports


// Images Imports

const SearchHeaderItem = (props) => {

    return (
        <div className={props.active ? 'search_box_header_item active' : 'search_box_header_item'} onClick={props.clicked}>
            {props.children}
        </div>
    );
};

SearchHeaderItem.propTypes = {
    active: PropTypes.bool,
    clicked: PropTypes.func
};

export default SearchHeaderItem;