import React, {useState} from 'react';
import axios from 'axios';
import * as PropTypes from 'prop-types';
import moment from 'moment';

// Redux Imports
import {useSelector} from "react-redux";
import { selectToken } from "../../../../../../features/auth/authSlice";

// Components Imports
import Button from "../../../../../UI/Button/Button";
import Loader from "../../../../../UI/Loader/Loader";

// Images Imports
import DefaultImage from "../../../../../../assets/images/default.jpg";

const NotificationItem = (props) => {
    const token = useSelector(selectToken);
    const [loading, setLoading] = useState({
        bool: false,
        message: 'Loading...'
    });
    const [responded, setResponded] = useState(null);

    let description = null;

    if(props.activity_type === 'send_friend_req') {
        description = 'sent you friend request.';
    }

    if(props.activity_type === 'send_message') {
        description = 'sent you message.';
    }

    async function confirmNotificationHandler() {
        setResponded(null);
        setLoading({
            bool: true,
            message: 'Confirming...'
        });
        try {
            const res = await axios.post(props.object_url.confirm, null, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            setLoading({bool: false});
            setResponded({
                bool: true,
                message: res.data.message,
                type: 'success'
            });
        } catch (e) {

            setLoading({bool: false});
            setResponded({
                bool: true,
                message: e.message,
                type: 'error'
            });
        }

    }

    async function declineNotificationHandler() {
        setResponded(null);
        setLoading({
            bool: true,
            message: 'Declining...'
        });
        try {
            const res = await axios.post(props.object_url.decline, null, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });

            setLoading({bool: false});
            setResponded({
                bool: true,
                message: res.data.message,
                type: 'success'
            });
        } catch (e) {

            setLoading({bool: false});
            setResponded({
                bool: true,
                message: e.message,
                type: 'error'
            });
        }
    }

    let loader = null;
    if(loading.bool) {
        loader = (
            <div className='notification_item_loader'>
                <p style={{
                    color: '#878787',
                    fontSize: '15px',
                    marginBottom: '7px'
                }}>{loading.message}</p>
                <Loader color='#878787' />
            </div>
        )
    }
    if(responded) {
        loader = (
            <div className='notification_item_response' data-response-type={responded.type}>
                <p>{responded.message}</p>
            </div>
        )
    }

    return (
        <div className='notification_item'>
            <div className='notification_item_main'>
                <div className="notification_item_image">
                    <img src={props.image || DefaultImage} alt=""/>
                </div>
                <div className="notification_item_details">
                    <div className="notification_item_details_title">
                        <p>{props.title}</p>
                    </div>
                    <div className="notification_item_details_description">
                        <p>{description}</p>
                    </div>
                    <div className="notification_item_details_actions">
                        <div className="notification_item_details_actions_timeStamp">
                            <p>{moment(new Date(props.timeStamp)).startOf('second').fromNow()}</p>
                        </div>
                        <div className='notification_item_details_actions_buttons'>
                            <Button styles={{padding: '5px 20px', width: 'auto', marginRight: '20px', backgroundColor: '#3596f9'}} clicked={confirmNotificationHandler}>Accept</Button>
                            <Button styles={{padding: '5px 20px', width: 'auto', backgroundColor: '#fb5050'}} clicked={declineNotificationHandler}>Delete</Button>
                        </div>
                    </div>
                </div>
            </div>
            {loader}
        </div>
    );
};

NotificationItem.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
    activity_type: PropTypes.string,
    timeStamp: PropTypes.string,
    object_url: PropTypes.shape({
        confirm: PropTypes.string,
        decline: PropTypes.string
    })
};

export default NotificationItem;