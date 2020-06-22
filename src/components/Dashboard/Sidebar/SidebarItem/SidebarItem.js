import React from "react";
import * as PropTypes from 'prop-types';
import { rippleClicked } from "../../../../helpers";

const SidebarItem = props => {

    return (
        <div className='dashboard_sidebar_item' onClick={rippleClicked}>
            <div className='dashboard_sidebar_item_icon'>
                {props.children}
            </div>
            <div className='dashboard_sidebar_item_label'>
                <p>{props.label}</p>
            </div>
        </div>
    )
}

SidebarItem.propTypes = {
    label: PropTypes.string
}

export default SidebarItem;