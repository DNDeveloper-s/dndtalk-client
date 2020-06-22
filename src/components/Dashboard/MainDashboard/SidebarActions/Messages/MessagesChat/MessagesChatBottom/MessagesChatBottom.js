import React, {useRef} from "react";
import {GrAttachment} from "react-icons/gr";
import {FiCamera, FiMic} from "react-icons/fi";
import {BsImageFill} from "react-icons/bs";
import Button from "../../../../../../UI/Button/Button";
import axios from "../../../../../../../axios-dashboard";
import { selectLoadedConversation, SET_CHAT, selectCurrentUser, SET_TEMP_CHAT } from "../../../../../../../features/dashboard/dashboardSlice";
import {useDispatch, useSelector} from "react-redux";
import {v4 as uuidv4} from 'uuid';

const MessagesChatBottom = props => {
    const dispatch = useDispatch();
    let inputMessageRef = useRef();
    const loadedConversation = useSelector(selectLoadedConversation);
    const currentUser = useSelector(selectCurrentUser);

    async function sendMessageHandler() {
        // Returning immediately if the message string is empty
        if(inputMessageRef.current.value.trim().length === 0) return;

        let toUserId = null;
        if(loadedConversation.type === 'private') {
            toUserId = loadedConversation.users.find(user => !user.itsYou)._id;
        }

        // Checking if the last chat by the same user to push onto the same stack
        const isLastMessageIsYours = loadedConversation.chats[loadedConversation.chats.length - 1].sentBy._id === currentUser._id;

        console.log(isLastMessageIsYours);

        let tempId = null;
        if(!isLastMessageIsYours) tempId = uuidv4();

        dispatch(SET_TEMP_CHAT({
            conversationId: loadedConversation._id,
            // chat: res.data.chat
            message: inputMessageRef.current.value,
            isAnotherMessageByMe: isLastMessageIsYours,
            timeStamp: Date.now(),
            tempId,
        }));

        const inputValue = inputMessageRef.current.value;
        // Setting Value
        inputMessageRef.current.value = '';

        const res = await axios.post('/sendMessage', {
            conversationType: loadedConversation.type,
            conversationId: loadedConversation._id,
            message: inputValue,
            toUserId,
            tempId,
        });

        console.log(res.data);
        if(res.data.type === 'success') {

            dispatch(SET_CHAT({
                conversationId: loadedConversation._id,
                tempId,
                chat: res.data.chat,
                isMessageSent: true
            }));
        }
    }

    return (
        <div className="dashboard_main_messages_chat_bottom">
            <div className="dashboard_main_messages_chat_bottom_input">
                <input type="text" placeholder='Type a message here...' ref={inputMessageRef} onKeyDown={(e) => {
                    if(e.key === 'Enter') sendMessageHandler().then().catch(e => console.error(e.message));
                }}/>
            </div>
            <div className="dashboard_main_messages_chat_bottom_tools">
                <div className="dashboard_main_messages_chat_bottom_tools_attachments">
                    <div className="dashboard_main_messages_chat_bottom_tools_attachments_doc">
                        <div className="dashboard_main_messages_chat_bottom_tools_attachments_doc_input">
                            <input type="file" accept='.jpeg, .jpg, .gif, .png' multiple={false}/>
                        </div>
                        <div className="dashboard_main_messages_chat_bottom_tools_attachments_doc_icon">
                            <GrAttachment />
                        </div>
                    </div>
                    <div className="dashboard_main_messages_chat_bottom_tools_attachments_camera">
                        <div className="dashboard_main_messages_chat_bottom_tools_attachments_camera_input">
                            <input type="file" accept='.jpeg, .jpg, .gif, .png' multiple={false}/>
                        </div>
                        <div className="dashboard_main_messages_chat_bottom_tools_attachments_camera_icon">
                            <FiCamera />
                        </div>
                    </div>
                    <div className="dashboard_main_messages_chat_bottom_tools_attachments_mic">
                        <div className="dashboard_main_messages_chat_bottom_tools_attachments_mic_input">
                            <input type="file" accept='.jpeg, .jpg, .gif, .png' multiple={false}/>
                        </div>
                        <div className="dashboard_main_messages_chat_bottom_tools_attachments_mic_icon">
                            <FiMic />
                        </div>
                    </div>
                    <div className="dashboard_main_messages_chat_bottom_tools_attachments_image">
                        <div className="dashboard_main_messages_chat_bottom_tools_attachments_image_input">
                            <input type="file" accept='.jpeg, .jpg, .gif, .png' multiple={false}/>
                        </div>
                        <div className="dashboard_main_messages_chat_bottom_tools_attachments_image_icon">
                            <BsImageFill />
                        </div>
                    </div>
                </div>
                <div className="dashboard_main_messages_chat_bottom_tools_action">
                    <div className="dashboard_main_messages_chat_bottom_tools_action_button">
                        <Button clicked={() => sendMessageHandler()}>Reply</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MessagesChatBottom;