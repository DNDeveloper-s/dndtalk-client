import React, {Fragment, useEffect} from "react";
import * as PropTypes from 'prop-types';
import moment from "moment";
import axios from "../../../../../../../../axios-dashboard";

// Redux Imports
import {CHAT_IS_READ} from "../../../../../../../../features/dashboard/dashboardSlice";
import {selectToken} from "../../../../../../../../features/auth/authSlice";
import {useDispatch, useSelector} from "react-redux";

import Loader from "../../../../../../../UI/Loader/Loader";
import NotificationIcon from "../../../../../../../UI/NotificationIcon/NotificationIcon";

import * as colors from "../../../../../../../../helpers/colors";

const MessagesChatBoxMessage = props => {
    const dispatch = useDispatch();
    const token = useSelector(selectToken);

    useEffect(() => {

        async function postReadMessage() {
            const res = await axios.post('/chatIsRead', {
                chatId: props.chat._id
            }, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            console.log(res.data);
        }
        console.log('postReadMessage...', 'Use Effect called');

        if(!Boolean(props.chat.isRead) && !props.chat.sentBy.itsYou ) {
            postReadMessage().then().catch(e => console.error(e.message));

            dispatch(CHAT_IS_READ({
                conversationId: props.chat.conversationId,
                chatId: props.chat._id
            }));
        }
    }, [props.chat]);

    let typingClass = ['dashboard_main_messages_chat_box_message_details_line'];

    if(props.typing) {
        typingClass.push('typing');
    }

    let messages = props.chat.messages.map((message, ind) => {
        return <p key={ind}>{message}</p>
    });

    return (
        <div className='dashboard_main_messages_chat_box_message' data-by={props.byMe ? 'me' : 'other'}>
            <div className="dashboard_main_messages_chat_box_message_header">
                <div className="dashboard_main_messages_chat_box_message_header_image">
                    <img src={process.env.REACT_APP_API_URI + props.chat.sentBy.image} alt=""/>
                </div>
                <div className="dashboard_main_messages_chat_box_message_header_title">
                    <p>{props.chat.sentBy.fullName}</p>
                </div>
                {!props.typing ?
                    <div className="dashboard_main_messages_chat_box_message_header_timestamp">
                        <p>{moment(new Date(props.chat.timeStamp)).startOf('second').fromNow()}</p>
                    </div> :
                null}
            </div>
            <div className="dashboard_main_messages_chat_box_message_details">
                <div className={typingClass.join(' ')}>
                    {props.typing ?
                        <Fragment>
                            <p>Typing...</p>
                            <div className='dashboard_main_messages_chat_box_message_details_line_loader'>
                                <Loader color='#50cb33'/>
                            </div>
                        </Fragment> :
                        messages
                    }
                </div>
                {
                    props.byMe ?
                        <div className='dashboard_main_messages_chat_box_message_details_tick'>
                            <NotificationIcon color={props.chat.isReadByAll ? colors.LIGHT_GREEN : props.chat.isSent ? colors.SKY_BLUE : colors.LIGHT_RED} />
                        </div>
                    : null
                }
            </div>

        </div>
    )
};

MessagesChatBoxMessage.propTypes = {
    typing: PropTypes.bool,
    byMe: PropTypes.bool,
    chat: PropTypes.object,
};

export default MessagesChatBoxMessage;