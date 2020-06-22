import React, {useState} from "react";

import MessagesNavHeaderItem from "./MessagesNavHeaderItem/MessagesNavHeaderItem";

const MessagesNavHeader = props => {
    let [active, setActive] = useState(0);

    return (
        <div className='dashboard_main_messages_nav_header'>
            <MessagesNavHeaderItem active={active === 0} clicked={() => {
                props.activeItem('All');
                setActive(0);
            }}>All Chat</MessagesNavHeaderItem>
            <MessagesNavHeaderItem active={active === 1} clicked={() => {
                props.activeItem('People');
                setActive(1);
            }}>People Chat</MessagesNavHeaderItem>
            <MessagesNavHeaderItem active={active === 2} clicked={() =>{
                props.activeItem('Group');
                setActive(2);
            }}>Group Chat</MessagesNavHeaderItem>
        </div>
    )
}

export default MessagesNavHeader;