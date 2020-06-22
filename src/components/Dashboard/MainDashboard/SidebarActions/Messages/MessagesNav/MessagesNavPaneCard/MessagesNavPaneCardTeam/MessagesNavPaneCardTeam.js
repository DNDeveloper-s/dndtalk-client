import React from 'react';
import DefaultImage from "../../../../../../../../assets/images/default.jpg";
import * as PropTypes from 'prop-types';

import MessagesChatHeaderMenuUser
    from "../../../MessagesChat/MessagesChatHeader/MessagesChatHeaderMenu/MessagesChatHeaderMenuUser/MessagesChatHeaderMenuUser";

const MessagesNavPaneCardTeam = props => {

    let className = ['dashboard_main_messages_nav_pane_card_team'];

    if(props.active) className.push('active');

    return (
        <div className={className.join(' ')}>
            <div className='dashboard_main_messages_nav_pane_card_team_title'>
                <p>Design Team</p>
            </div>
            <div className='dashboard_main_messages_nav_pane_card_team_description'>
                <p>Hey James, Okay I will finish that in such moment and we will get back to this.</p>
            </div>
            <div className='dashboard_main_messages_nav_pane_card_team_bottom'>
                <div className='dashboard_main_messages_nav_pane_card_team_bottom_users'>
                    <MessagesChatHeaderMenuUser />
                    <MessagesChatHeaderMenuUser />
                    <MessagesChatHeaderMenuUser />
                </div>
                <div className='dashboard_main_messages_nav_pane_card_team_bottom_timestamp'>
                    04:14 PM
                </div>
            </div>
        </div>
    )
}

MessagesNavPaneCardTeam.propTypes = {
    active: PropTypes.bool
}

export default MessagesNavPaneCardTeam;