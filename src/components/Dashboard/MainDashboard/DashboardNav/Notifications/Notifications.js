import React, {Fragment, useEffect, useState} from 'react';
import * as PropTypes from 'prop-types';
import axios from '../../../../../axios-dashboard';

// Redux Imports
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUser, SET_NOTIFICATIONS, selectNotifications} from "../../../../../features/dashboard/dashboardSlice";
import {selectToken} from "../../../../../features/auth/authSlice";

// Components Imports
import Loader from "../../../../UI/Loader/Loader";
import NotificationItem from "./NotificationItem/NotificationItem";

const Notifications = (props) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const token = useSelector(selectToken);
    const notifications = useSelector(selectNotifications);

    useEffect(() => {
        async function fetchNotifications() {
            const res = await axios.get('/notifications?userId=' + currentUser._id, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            dispatch(SET_NOTIFICATIONS(res.data.notifications));
        }
        console.log(notifications);
        if(Object.keys(notifications.entities).length === 0) {fetchNotifications().then().catch(e => console.error(e));}
    }, []);

    let notificationsEl = (
        <div className='notifications_container_loader'>
            <p style={{
                color: '#878787',
                fontSize: '15px',
                marginBottom: '20px'
            }}>Loading Notifications...</p>
            <Loader color='#878787' />
        </div>
    );
    if(Object.keys(notifications.entities).length > 0) {
        notificationsEl = notifications.results.map((notificationId, ind) => {
            const notification = notifications.entities[notificationId];

            return (
                <NotificationItem
                    key={ind}
                    image={process.env.REACT_APP_API_URI + notification.sender_id.image}
                    title={notification.sender_id.fullName}
                    activity_type={notification.activity_type}
                    timeStamp={notification.timeStamp}
                    object_url={notification.object_url}
                />
            );
        });
        if(notificationsEl.length === 0) {
            notificationsEl = (
                <div className='notifications_container_no-notifications'>
                    <p>No Notifications</p>
                </div>
            )
        }
    }

    return notificationsEl;
};

Notifications.propTypes = {

};

export default Notifications;