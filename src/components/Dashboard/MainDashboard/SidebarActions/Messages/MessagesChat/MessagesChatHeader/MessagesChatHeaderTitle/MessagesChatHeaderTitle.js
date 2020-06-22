import React from "react";
import * as PropTypes from 'prop-types';

const MessagesChatHeaderTitle = props => {
    let otherUser = null;
    props.loadedConversation.users.forEach(user => {
        if(!user.itsYou) {
            otherUser = user;
        }
    });

    return (
        <div className="dashboard_main_messages_chat_header_title">
            <div className='dashboard_main_messages_chat_header_title_image'>
                <img src={process.env.REACT_APP_API_URI + otherUser.image} alt=""/>
            </div>
            <div className="dashboard_main_messages_chat_header_title_label">
                <p>{otherUser.fullName}</p>
            </div>
        </div>
    )
};

MessagesChatHeaderTitle.propTypes = {
    loadedConversation: PropTypes.object
};

export default MessagesChatHeaderTitle;