import React, {useState} from "react";
import * as PropTypes from 'prop-types';
import axios from '../../../../../../axios-dashboard';
import mainAxios from 'axios';
import {withRouter} from 'react-router-dom';

import {useDispatch, useSelector} from "react-redux";
import {selectToken} from "../../../../../../features/auth/authSlice";
import {SET_CUR_CONVERSATION} from "../../../../../../features/dashboard/dashboardSlice";

import {MdPhotoCamera} from "react-icons/md";
import {AiFillWechat} from "react-icons/ai";

import Button from "../../../../../UI/Button/Button";

import InfoModal from "../../../../../UI/InfoModal/InfoModal";


const ProfileSide = props => {
    const dispatch = useDispatch();
    const token = useSelector(selectToken);
    const [show, setShow] = useState(false);
    const [remove, setRemove] = useState(true);
    const [response, setResponse] = useState(null);
    const [accepted, setAccepted] = useState(false);

    let currentUser = props.currentUser;

    let currentUserImage = <img src={process.env.REACT_APP_API_URI + currentUser.image} alt={currentUser.fullName || 'DND-talk'}/>;


    async function toggleModalHandler() {
        setRemove(false);
        setShow(true);
    }

    async function sendFriendReqHandler() {
        const res = await axios.post('/send_friend_req', {
            toUserId: currentUser._id
        });
        console.log(res.data);
        setResponse(res.data);
    }

    async function acceptFriendReqHandler() {
        setAccepted(false);
        const res = await mainAxios.post(props.currentUser.isRequestPending.object_url.confirm, null, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        console.log(res.data);
        if(res.data.type === 'success') {
            setAccepted(true);
        }
    }

    async function loadConversation(userId) {
        const res = await axios.get('/fetchPrivateConversation?toUserId=' + userId);

        console.log(res.data);

        dispatch(SET_CUR_CONVERSATION(res.data.conversation));

        props.history.push('/dashboard/messages?loadConversationId=' + res.data.conversation._id);
    }

    let infoModal = null;
    if(!remove && response) {
        infoModal = <InfoModal show={show} showState={setShow}>
            <div className='info_modal_header'>
                <div className='info_modal_header_image'>
                    {currentUserImage}
                </div>
                <div className='info_modal_header_title'>
                    <p>{currentUser.fullName}</p>
                </div>
            </div>
            <div className='info_modal_description'>
                <p>{response.message}</p>
            </div>
            <div className='info_modal_action'>
                <div className="info_modal_action_btn">
                    <Button
                        styles={{
                            padding: '5px 30px',

                        }}
                        clicked={() => setShow(false)}
                    >Ok</Button>
                </div>
            </div>
        </InfoModal>
    }

    let isYourFriend = null;
    if(!props.self && !props.currentUser.isYourFriend) {
        isYourFriend = (
            <div className="dashboard_main_profile_side_card_action">
                <div className="dashboard_main_profile_side_card_action_button" onClick={sendFriendReqHandler}>
                    <Button
                        styles={{
                            fontSize: '10px',
                            backgroundColor: '#3596f9',
                            padding: '0 40px'
                        }}
                        clicked={toggleModalHandler}
                    >Add Friend</Button>
                </div>
            </div>
        );

        // Checking if user has pending friend req of this user
        if(props.currentUser.isRequestPending.bool) {
            isYourFriend = (
                !accepted ? <div className="dashboard_main_profile_side_card_action">
                    <div className="dashboard_main_profile_side_card_action_button" onClick={acceptFriendReqHandler}>
                        <Button
                            styles={{
                                fontSize: '10px',
                                backgroundColor: '#3596f9',
                                padding: '0 40px'
                            }}
                            clicked={() => null}
                        >Accept Friend Request</Button>
                    </div>
                </div> :
                <div className="dashboard_main_profile_side_card_action">
                    <div className="dashboard_main_profile_side_card_action_button" onClick={() => null}>
                        <Button
                            styles={{
                                fontSize: '10px',
                                backgroundColor: '#3596f9',
                                padding: '0 40px'
                            }}
                            clicked={() => loadConversation(currentUser._id)}
                        >Send Message</Button>
                    </div>
                </div>
            )
        }
    }

    if(props.currentUser.isYourFriend) {
        isYourFriend = (
            <div className="dashboard_main_profile_side_card_action">
                <div className="dashboard_main_profile_side_card_action_button" onClick={() => null}>
                    <Button
                        styles={{
                            fontSize: '10px',
                            backgroundColor: '#3596f9',
                            padding: '0 40px'
                        }}
                        clicked={() => loadConversation(currentUser._id)}
                    >Send Message</Button>
                </div>
            </div>
        )
    }

    return (
        <div className="dashboard_main_profile_side">
            {infoModal}
            <div className="dashboard_main_profile_side_card">
                <div className="dashboard_main_profile_side_card_title">
                    <p>Profile</p>
                </div>
                <div className="dashboard_main_profile_side_card_input">
                    <div className="dashboard_main_profile_side_card_input_image">
                        {currentUserImage}
                        <div className='dashboard_main_profile_side_card_input_image_icon'>
                            <MdPhotoCamera />
                        </div>
                    </div>
                    <input type="file"/>
                </div>
                <div className="dashboard_main_profile_side_card_name">
                    <p>{currentUser.fullName || ''}</p>
                </div>
                {isYourFriend}
            </div>
            <div className="dashboard_main_profile_side_card">
                <div className="dashboard_main_profile_side_card_vector">
                    <div className="dashboard_main_profile_side_card_vector_icon">
                        <AiFillWechat />
                    </div>
                </div>
                <div className="dashboard_main_profile_side_card_title need_help">
                    <p>Need help?</p>
                </div>
                <div className="dashboard_main_profile_side_card_description">
                    <p>Have questions or concerns regarding your account? Our experts are here to help!</p>
                </div>
                <div className="dashboard_main_profile_side_card_action">
                    <div className="dashboard_main_profile_side_card_action_button">
                        <Button
                            styles={{
                                fontSize: '10px',
                                backgroundColor: '#3596f9',
                                padding: '0 40px'
                            }}
                            clicked={() => null}
                        >Chat with us</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

ProfileSide.propTypes = {
    currentUser: PropTypes.object,
    self: PropTypes.bool
}

export default withRouter(ProfileSide);