import {createSlice} from "@reduxjs/toolkit";

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        lastRoute: null,
        currentUser: null
    },
    reducers: {
        LOGGED_OUT: (state, action) => {
            state.lastRoute = null;
            state.currentUser = null;
        },
        SET_LAST_ROUTE: (state, action) => {
            state.lastRoute = action.payload.lastRoute;
        },
        SET_CURRENT_USER: (state, action) => {
            state.currentUser = action.payload;
        },
        ADD_NOTIFICATION: (state, action) => {
            // Checking if notification already exists
            // or update of the current notification
            const doestNotificationExist = state.currentUser.notifications.results.some(cur => cur.toString() === action.payload._id.toString());
            if(!doestNotificationExist) state.currentUser.notifications.results.push(action.payload._id);
            state.currentUser.notifications.entities[action.payload._id] = action.payload.obj;
        },
        REMOVE_NOTIFICATION: (state, action) => {
            state.currentUser.notifications[action.payload.notificationId] = undefined;
            state.currentUser.notifications.results = state.currentUser.notifications.results.filter(notif => notif.toString() !== action.payload.notificationId.toString());
        },
        SET_CONVERSATIONS: (state, action) => {
            state.currentUser.conversations.entities = action.payload.conversations;
            state.currentUser.conversations.results = Object.keys(action.payload.conversations);
        },
        SET_NOTIFICATIONS: (state, action) => {
            state.currentUser.notifications = action.payload;
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
                chats[chats.length - 1].isReadByAll = false;
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
                    isReadByAll: false
                })
            }
        },
        SET_CHAT: (state, action) => {
            const isSameConversationLoaded = action.payload.conversationId.toString() === state.currentUser.conversations.loaded.toString();
            if(!isSameConversationLoaded) {
                state.currentUser.conversations.entities[action.payload.conversationId].hasNewMessages = true;
            }

            // TODO: Handle the case if conversation is not set yet and first new message arrived

            // Checking if message is sent or received
            if(!action.payload.isMessageSent) {
                const doesExist = state.currentUser.conversations.entities[action.payload.conversationId].chats.find(chat => chat._id === action.payload.chat._id);
                if(doesExist) {
                    state.currentUser.conversations.entities[action.payload.conversationId].chats.forEach(chat => {
                        if(chat._id === action.payload.chat._id) {
                            chat.messages = action.payload.chat.messages;
                            chat.timeStamp = action.payload.chat.timeStamp;
                            chat.isRead = false;
                        }
                    });
                } else {
                    state.currentUser.conversations.entities[action.payload.conversationId].chats.push({
                        ...action.payload.chat,
                        isRead: false
                    });
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
        },
        CHAT_IS_READ: (state, action) => {
            state.currentUser.conversations.entities[action.payload.conversationId].chats.forEach(chat => {
                if(chat._id.toString() === action.payload.chatId) chat.isRead = true;
            })
        },
        CHAT_IS_READ_BY_ALL: (state, action) => {
            state.currentUser.conversations.entities[action.payload.conversationId].chats.forEach(chat => {
                if(chat._id.toString() === action.payload.chatId) chat.isReadByAll = true;
            })
        }
    }
});

export const {
    LOGGED_OUT,
    SET_LAST_ROUTE,
    SET_CURRENT_USER,
    ADD_NOTIFICATION,
    REMOVE_NOTIFICATION,
    SET_CONVERSATIONS,
    SET_NOTIFICATIONS,
    SET_CUR_CONVERSATION,
    SET_CHAT,
    SET_TEMP_CHAT,
    CHAT_IS_READ,
    CHAT_IS_READ_BY_ALL
} = dashboardSlice.actions;

// Async Functions

// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectLastRoute = state => state.dashboard.lastRoute;
export const selectCurrentUser = state => state.dashboard.currentUser;
export const selectLoadedConversation = state => {
    return state.dashboard.currentUser.conversations.entities[state.dashboard.currentUser.conversations.loaded];
};
export const selectConversations = state => state.dashboard.currentUser.conversations;
export const selectNotifications = state => state.dashboard.currentUser.notifications;

export default dashboardSlice.reducer;