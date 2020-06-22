import React from "react";

import MessagesChatHeaderTitle from "./MessagesChatHeaderTitle/MessagesChatHeaderTitle";
import MessagesChatHeaderMenu from "./MessagesChatHeaderMenu/MessagesChatHeaderMenu";
import {useSelector} from "react-redux";
import { selectLoadedConversation } from "../../../../../../../features/dashboard/dashboardSlice";

const MessagesChatHeader = props => {
    const loadedConversation = useSelector(selectLoadedConversation);

    return (
        loadedConversation ?
                <div className="dashboard_main_messages_chat_header">
                    <MessagesChatHeaderTitle loadedConversation={loadedConversation} />
                    <MessagesChatHeaderMenu loadedConversation={loadedConversation} />
                </div>
        : null
    )
};

export default MessagesChatHeader;