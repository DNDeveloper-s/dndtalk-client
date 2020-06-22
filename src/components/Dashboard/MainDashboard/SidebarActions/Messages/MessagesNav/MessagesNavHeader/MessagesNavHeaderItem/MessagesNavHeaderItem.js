import React from "react";
import * as PropTypes from 'prop-types';

const MessagesNavHeaderItem = props => {

    const className = ['dashboard_main_messages_nav_header_item'];

    if(props.active) className.push('active');

    return (
        <div className={className.join(' ')} onClick={props.clicked}>
            <p>{props.children}</p>
        </div>
    )
}

MessagesNavHeaderItem.propTypes = {
    active: PropTypes.bool,
    clicked: PropTypes.func
}

export default MessagesNavHeaderItem;