import React, {useEffect, useState} from "react";
import socket from 'socket.io-client';
import {useDispatch, useSelector} from "react-redux";

// Components Imports
import Sidebar from "./Sidebar/Sidebar";
import MainDashboard from "./MainDashboard/MainDashboard";
import Loader from "../UI/Loader/Loader";
import FetchingSome from "./MainDashboard/SidebarActions/Messages/FetchingSome";

// Redux Imports
import { SET_CURRENT_USER, ADD_NOTIFICATION, REMOVE_NOTIFICATION, SET_CHAT } from "../../features/dashboard/dashboardSlice";
import { selectToken } from "../../features/auth/authSlice";
import { START_ACTION, STOP_ACTION } from "../../features/ui/uiSlice";

const Dashboard = props => {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector(selectToken);

    useEffect(() => {

        dispatch(START_ACTION({
            action: {
                name: 'fetching_cur_user'
            } 
        }));

        const io = socket(process.env.REACT_APP_API_URI, {
            query: {token: token}
        });

        io.on('logged_in', async (data) => {
            // Setting Current User Data on Dashboard Load
            dispatch(SET_CURRENT_USER(data));

            dispatch(STOP_ACTION({
                name: 'fetching_cur_user'
            }));

            setLoaded(true);
        });

        io.on('notification_rcvd', data => {
            console.log('Notification Received!');
            dispatch(ADD_NOTIFICATION(data));
        });

        io.on('notification_removed', data => {
            console.log('Notification Removed!');
            dispatch(REMOVE_NOTIFICATION(data));
        });

        io.on('message_rcvd', data => {
            console.log(data);
            dispatch(SET_CHAT({
                conversationId: data.conversationId,
                chat: data.chat
            }))
        });

    }, []);

    let load = <FetchingSome styles={{height: '100vh'}}>Preparing Dashboard...</FetchingSome>;

    if(loaded) {
        load = (
            <div className='dashboard_page'>
                <Sidebar />
                <MainDashboard />
            </div>
        );
    }


    return (
        load
    );
}

export default Dashboard;