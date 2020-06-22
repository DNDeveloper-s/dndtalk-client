import React from "react";

import MessagesChatHeader from "./MessagesChatHeader/MessagesChatHeader";
import MessagesChatBox from "./MessagesChatBox/MessagesChatBox";
import MessagesChatBottom from "./MessagesChatBottom/MessagesChatBottom";

const MessagesChat = props => {

    return (
        <div className='dashboard_main_messages_chat'>
            <MessagesChatHeader />
            <MessagesChatBox />
            <MessagesChatBottom />
        </div>
    )
}

export default MessagesChat;