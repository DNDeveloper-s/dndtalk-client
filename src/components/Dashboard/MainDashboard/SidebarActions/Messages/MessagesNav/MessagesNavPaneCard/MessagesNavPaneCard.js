import React, {useState} from "react";
import {FaEllipsisH} from "react-icons/fa";
import * as PropTypes from 'prop-types';

// Redux Imports
import {useDispatch} from "react-redux";
import {SET_CUR_CONVERSATION} from "../../../../../../../features/dashboard/dashboardSlice";

// Component Imports
import MessagesNavPaneCardTeam from "./MessagesNavPaneCardTeam/MessagesNavPaneCardTeam";
import DefaultImage from "../../../../../../../assets/images/default.jpg";
import NotificationIcon from "../../../../../../UI/NotificationIcon/NotificationIcon";

const MessagesNavPaneCard = props => {
    const dispatch = useDispatch();
    let [expand, setExpand] = useState(props.expand || false);

    function loadConversation(id) {
        dispatch(SET_CUR_CONVERSATION(id));
    }

    let teamsArr = [];
    if(props.cardTeams) {
        for(let cardTeam of props.cardTeams) {
            if(!expand) {
                teamsArr.push(<MessagesNavPaneCardTeam key={Math.ceil(Math.random() * 1625387)} />);
                break;
            }
            teamsArr.push(<MessagesNavPaneCardTeam key={Math.ceil(Math.random() * 129837817263)} />);
        }
    }

    let card = null;

    if(props.conversation.type === 'group') {
        card = (
            <div className='dashboard_main_messages_nav_pane_card'>
                <div className='dashboard_main_messages_nav_pane_card_header'>
                    <div className='dashboard_main_messages_nav_pane_card_header_group'>
                        <div className='dashboard_main_messages_nav_pane_card_header_group_image'>
                            <img src={DefaultImage} alt=""/>
                        </div>
                        <div className='dashboard_main_messages_nav_pane_card_header_group_title'>
                            <p>Framer Teams</p>
                        </div>
                    </div>
                    <div className='dashboard_main_messages_nav_pane_card_header_icon'>
                        <FaEllipsisH />
                    </div>
                </div>
                {teamsArr}
                <div className='dashboard_main_messages_nav_pane_card_bottom'>
                    <div className='dashboard_main_messages_nav_pane_card_bottom_viewteams' onClick={() => setExpand(!expand)}>
                        <p>{expand ? 'Less Teams' : 'View Teams'}</p>
                    </div>
                </div>
            </div>
        );
    }

    if(props.conversation.type === 'private') {
        let otherUser = null;
        props.conversation.users.forEach(user => {
            if(!user.itsYou) {
                otherUser = user;
            }
        });

        card = (
            <div className={props.active ? 'dashboard_main_messages_nav_pane_card active' : 'dashboard_main_messages_nav_pane_card'} onClick={() => loadConversation(props.conversation._id)}>
                <div className='dashboard_main_messages_nav_pane_card_header'>
                    <div className='dashboard_main_messages_nav_pane_card_header_group'>
                        <div className='dashboard_main_messages_nav_pane_card_header_group_image'>
                            <img src={process.env.REACT_APP_API_URI + otherUser.image || DefaultImage} alt="user_default"/>
                        </div>
                        <div className='dashboard_main_messages_nav_pane_card_header_group_title'>
                            <p>{otherUser.fullName}</p>
                        </div>
                    </div>
                    {props.conversation.hasNewMessages ?
                        <div className='dashboard_main_messages_nav_pane_card_header_notification'>
                            <NotificationIcon />
                        </div> :
                    null}

                    <div className='dashboard_main_messages_nav_pane_card_header_icon'>
                        <FaEllipsisH />
                    </div>
                </div>
                <div className='dashboard_main_messages_nav_pane_card_message'>
                    {
                        props.conversation.chats.length === 0 ?
                            <p className='dashboard_main_messages_nav_pane_card_message no_messages_yet' style={{whiteSpace: expand ? 'normal' : 'nowrap'}}>No messages yet!</p> :
                            <p style={{whiteSpace: expand ? 'normal' : 'nowrap'}}>{props.conversation.chats[props.conversation.chats.length - 1].messages[props.conversation.chats[props.conversation.chats.length - 1].messages.length - 1]}</p>
                    }
                </div>
            </div>
        )
    }


    return (card);
};

MessagesNavPaneCard.propTypes = {
    cardTeams: PropTypes.array,
    expand: PropTypes.bool,
    conversation: PropTypes.object,
    type: PropTypes.oneOf(['group', 'private'])
};

export default MessagesNavPaneCard;