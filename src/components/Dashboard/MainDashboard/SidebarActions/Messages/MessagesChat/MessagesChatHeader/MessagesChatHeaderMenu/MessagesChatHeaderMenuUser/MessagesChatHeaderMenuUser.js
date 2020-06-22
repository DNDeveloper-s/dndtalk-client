import React from "react";
import DefaultImage from "../../../../../../../../../assets/images/default.jpg";

const MessagesChatHeaderMenuUser = props => {

    return (
        <div className='dashboard_main_messages_chat_header_menu_users_user'>
            <div className='dashboard_main_messages_chat_header_menu_users_user_image'>
                <img src={DefaultImage} alt=""/>
            </div>
            <div className='dashboard_main_messages_chat_header_menu_users_user_popup'>
                <div className='dashboard_main_messages_chat_header_menu_users_user_popup_details'>
                    <p className='dashboard_main_messages_chat_header_menu_users_user_popup_details_title'>Saurabh Singh</p>
                    <p className='dashboard_main_messages_chat_header_menu_users_user_popup_details_description'>Web Developer</p>
                </div>
            </div>
        </div>
    )
}

export default MessagesChatHeaderMenuUser;