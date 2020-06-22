import React, {useEffect, useState} from 'react';

// Redux Imports'
import {useSelector} from "react-redux";
import {selectCurrentUser, selectLoadedConversation} from "../../../../../../features/dashboard/dashboardSlice";

// Components Imports
import MessagesNavHeader from "./MessagesNavHeader/MessagesNavHeader";
import MessagesNavPaneCard from "./MessagesNavPaneCard/MessagesNavPaneCard";

const MessagesNav = props => {
    let curLoggedInUser = useSelector(selectCurrentUser);
    let loadedConversation = useSelector(selectLoadedConversation);

    const [activeCategory, setActiveCategory] = useState('People');
    const [conversations, setConversations] = useState(null);

    useEffect(() => {
        let conversationsArr = [];
        curLoggedInUser.conversations.results.forEach(conversationId => {
            const curConversation = curLoggedInUser.conversations.entities[conversationId];
            conversationsArr.push({
                _id: curConversation._id,
                type: curConversation.type,
                users: curConversation.users,
                chats: curConversation.chats
            })
        });

        setConversations(conversationsArr);
        console.log(curLoggedInUser, conversationsArr);
    }, [loadedConversation]);

    let paneCards = null;

    if(conversations) {
        if(activeCategory === 'All') {
            paneCards = conversations.map((conversation, ind) => {
                return <MessagesNavPaneCard
                    key={ind}
                    active={loadedConversation._id.toString() === conversation._id.toString()}
                    conversation={conversation}
                    cardTeams={conversation.cardTeams}
                />
            })
        } else
        if(activeCategory === 'Group') {
            paneCards = conversations.map((conversation, ind) => {
                if(conversation.type === 'group') {
                    return <MessagesNavPaneCard
                        key={ind}
                        active={loadedConversation._id.toString() === conversation._id.toString()}
                        conversation={conversation}
                        cardTeams={conversation.cardTeams}
                    />
                }
            })
        } else
        if(activeCategory === 'People') {
            paneCards = conversations.map((conversation, ind) => {
                if(conversation.type === 'private') {
                    return <MessagesNavPaneCard
                        key={ind}
                        active={loadedConversation._id.toString() === conversation._id.toString()}
                        conversation={conversation}
                    />
                }
            })
        }
    }

    return (
        <div className='dashboard_main_messages_nav'>
            <MessagesNavHeader activeItem={setActiveCategory} />
            <div className='dashboard_main_messages_nav_pane'>
                {paneCards}
            </div>
        </div>
    )
}

export default MessagesNav;