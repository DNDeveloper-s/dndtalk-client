import React from "react";
import {BsGear} from "react-icons/bs";
import {FaEllipsisH} from "react-icons/fa";
import MessagesChatHeaderMenuUser from "./MessagesChatHeaderMenuUser/MessagesChatHeaderMenuUser";

const MessagesChatHeaderMenu = props => {
    return (
        <div className="dashboard_main_messages_chat_header_menu">
            <div className='dashboard_main_messages_chat_header_menu_users'>
                <MessagesChatHeaderMenuUser />
                <MessagesChatHeaderMenuUser />
                <MessagesChatHeaderMenuUser />
            </div>
            <div className='dashboard_main_messages_chat_header_menu_settings'>
                <div className='dashboard_main_messages_chat_header_menu_settings_icon'>
                    <BsGear />
                </div>
            </div>
            <div className='dashboard_main_messages_chat_header_menu_options'>
                <div className='dashboard_main_messages_chat_header_menu_options_icon'>
                    <FaEllipsisH />
                </div>
            </div>
        </div>
    )
}

export default MessagesChatHeaderMenu;