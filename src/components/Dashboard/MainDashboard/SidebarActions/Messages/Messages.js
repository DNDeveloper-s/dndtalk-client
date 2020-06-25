import React, {useEffect, useState} from 'react';
import axios from "../../../../../axios-dashboard";
import {withRouter} from 'react-router-dom';

// Redux Imports
import {useDispatch, useSelector} from "react-redux";
import {
    selectLoadedConversation,
    SET_CONVERSATIONS,
    SET_CUR_CONVERSATION
} from "../../../../../features/dashboard/dashboardSlice";
import {selectToken} from "../../../../../features/auth/authSlice";

// Components Imports
import MessagesNav from "./MessagesNav/MessagesNav";
import MessagesChat from "./MessagesChat/MessagesChat";
import Loader from "../../../../UI/Loader/Loader";
import FetchingSome from "../../../../UI/FetchingSome/FetchingSome";

const Messages = props => {
    const dispatch = useDispatch();
    const token = useSelector(selectToken);
    const loadedConversation = useSelector(selectLoadedConversation);

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        console.log('[Messages.js ....], Mounted for first time');

        // Parsing query parameters
        const url = new URLSearchParams(props.location.search);
        const loadConversationId = url.get('loadConversationId');

        // Fetching Conversations
        async function fetchConversations() {
            setLoaded(false);
            const res = await axios.get('/conversations', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });

            if(res.data.type === 'success') {
                dispatch(SET_CONVERSATIONS({
                    conversations: res.data.conversations
                }));
                if(loadConversationId) {
                    dispatch(SET_CUR_CONVERSATION(loadConversationId));
                } else {
                    dispatch(SET_CUR_CONVERSATION(Object.keys(res.data.conversations)[0]));
                }

            }
            setLoaded(true);
        }
        fetchConversations().then().catch(e => console.error(e));
    }, []);

    // Rendering Content
    let content = <FetchingSome>Fetching Conversations...</FetchingSome>;
    if(loaded) {
        content = (
            <div className='dashboard_main_messages'>
                <MessagesNav />
                {loadedConversation ? <MessagesChat /> : <p style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#878787'}}
                >No Conversations</p>}
            </div>
        )
    }

    return content;
};

export default withRouter(Messages);