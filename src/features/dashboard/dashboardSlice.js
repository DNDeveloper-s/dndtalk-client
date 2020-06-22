import {createSlice} from "@reduxjs/toolkit";

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        lastRoute: null,
        currentUser: null
    },
    reducers: {
        SET_LAST_ROUTE: (state, action) => {
            state.lastRoute = action.payload.lastRoute;
        },
        SET_CURRENT_USER: (state, action) => {
            state.currentUser = action.payload;
        },
        ADD_NOTIFICATION: (state, action) => {
            state.currentUser.notifications.results.push(action.payload);
        },
        REMOVE_NOTIFICATION: (state, action) => {
            state.currentUser.notifications[action.payload.notificationId] = undefined;
            state.currentUser.notifications.results = state.currentUser.notifications.results.filter(notif => notif.toString() !== action.payload.notificationId.toString());
        },
        SET_CONVERSATIONS: (state, action) => {
            state.currentUser.conversations.entities = action.payload.conversations;
            state.currentUser.conversations.results = Object.keys(action.payload.conversations);
        },
        SET_CUR_CONVERSATION: (state, action) => {
            state.currentUser.conversations.loaded = action.payload;
        },
        SET_TEMP_CHAT: (state, action) => {
            if(action.payload.isAnotherMessageByMe) {
                const chats = state.currentUser.conversations.entities[action.payload.conversationId].chats;
                chats[chats.length - 1].messages.push(action.payload.message);
                chats[chats.length - 1].timeStamp = action.payload.timeStamp;
                chats[chats.length - 1].isSent = false;
            } else {
                state.currentUser.conversations.entities[action.payload.conversationId].chats.push({
                    _id: null,
                    sentBy: {
                        _id: state.currentUser._id,
                        fullName: state.currentUser.fullName,
                        image: state.currentUser.image,
                        itsYou: true
                    },
                    isSent: false,
                    tempId: action.payload.tempId,
                    messages: [action.payload.message],
                    timeStamp: action.payload.timeStamp,
                })
            }
        },
        SET_CHAT: (state, action) => {
            if(!action.payload.isMessageSent) {
                const doesExist = state.currentUser.conversations.entities[action.payload.conversationId].chats.find(chat => chat._id === action.payload.chat._id);
                if(doesExist) {
                    state.currentUser.conversations.entities[action.payload.conversationId].chats.forEach(chat => {
                        if(chat._id === action.payload.chat._id) {
                            chat.messages = action.payload.chat.messages;
                            chat.timeStamp = action.payload.chat.timeStamp;
                        }
                    });
                } else {
                    state.currentUser.conversations.entities[action.payload.conversationId].chats.push(action.payload.chat);
                }
            } else {
                if(action.payload.tempId) {
                    let tempChat = state.currentUser.conversations.entities[action.payload.conversationId].chats.find(chat => chat.tempId === action.payload.tempId);
                    tempChat._id = action.payload.chat._id;
                    tempChat.isSent = action.payload.chat.isSent;
                } else {
                    const chats = state.currentUser.conversations.entities[action.payload.conversationId].chats;
                    const lastChat = chats[chats.length - 1];
                    lastChat.isSent = action.payload.chat.isSent;
                }
            }
        }
    }
});

export const {
    SET_LAST_ROUTE,
    SET_CURRENT_USER,
    ADD_NOTIFICATION,
    REMOVE_NOTIFICATION,
    SET_CONVERSATIONS,
    SET_CUR_CONVERSATION,
    SET_CHAT,
    SET_TEMP_CHAT
} = dashboardSlice.actions;

// Async Functions

// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectLastRoute = state => state.dashboard.lastRoute;
export const selectCurrentUser = state => state.dashboard.currentUser;
export const selectLoadedConversation = state => {
    return state.dashboard.currentUser.conversations.entities[state.dashboard.currentUser.conversations.loaded];
};

export default dashboardSlice.reducer;