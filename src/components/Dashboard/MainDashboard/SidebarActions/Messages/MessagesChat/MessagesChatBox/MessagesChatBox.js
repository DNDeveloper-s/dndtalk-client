import React, {useEffect, useRef} from "react";

// Redux Imports
import {useSelector} from "react-redux";
import {selectLoadedConversation} from "../../../../../../../features/dashboard/dashboardSlice";

// Component Imports
import MessagesChatBoxMessage from "./MessagesChatBoxMessage/MessagesChatBoxMessage";

const MessagesChatBox = props => {
    const chatBoxRef = useRef();
    const loadedConversation = useSelector(selectLoadedConversation);

    // This useEffect is for switch between conversations
    useEffect(() => {
        chatBoxRef.current.scrollTo({
            top: chatBoxRef.current.scrollHeight,
            left: 0,
            // behavior: 'smooth',
        })
    }, [loadedConversation._id]);

    // This useEffect is for new chats
    useEffect(() => {
        chatBoxRef.current.scrollTo({
            top: chatBoxRef.current.scrollHeight,
            left: 0,
            behavior: 'smooth',
        })
    }, [loadedConversation.chats]);

    const chats = loadedConversation.chats.map((chat, ind) => {
        return (
            <MessagesChatBoxMessage
                key={ind}
                chat={chat}
                byMe={chat.sentBy.itsYou}
            />
        )
    });

    return (
        <div className='dashboard_main_messages_chat_box' ref={chatBoxRef}>
            {chats}
        </div>
    )
}

export default MessagesChatBox;