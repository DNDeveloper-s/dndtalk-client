import React, {useEffect, useRef, useState} from "react";
import * as PropTypes from 'prop-types';
import moment from "moment";
import TelInput from "../../../../../UI/TelInput/TelInput";
import Calendar from "../../../../../UI/Calendar/Calendar";
import InputControl from "./InputControl/InputControl";


const ProfileMain = props => {
    const [showCalendar, setShowCalendar] = useState(false);
    const [dob, setDob] = useState(null);
    const calendarRef = useRef();
    const currentUser = props.currentUser;

    useEffect(() => {

        // checkIfLoading()

        document.addEventListener('click', clickedOutOfItHandler)

        return () => {
            document.removeEventListener('click', clickedOutOfItHandler)
        }

    })

    function clickedOutOfItHandler(e) {
        const path = e.path || (e.composedPath && e.composedPath());
        if(!path.includes(calendarRef.current) && showCalendar) {
            setShowCalendar(false);
        }
    }

    let calendar = null;

    if(showCalendar) {
        calendar =
            <div className='dashboard_main_profile_main_card_container_top_item_controls_input_calendar' ref={calendarRef}>
                <Calendar
                    changed={setDob}
                    // startDate={new Date(928247033195)}
                />
            </div>
        ;
    }

    return (
        <div className="dashboard_main_profile_main">
            <div className="dashboard_main_profile_main_card">
                <div className="dashboard_main_profile_main_card_title">
                    <p>Your account is precious to us</p>
                </div>
                <div className="dashboard_main_profile_main_card_description">
                    <div className="dashboard_main_profile_main_card_description_data">
                        <p>For such security reasons, If you need to update the change. You can change your profile details upto 3 times a month.</p>
                    </div>
                    <div className="dashboard_main_profile_main_card_description_estimated">
                        <p>Estimated Day: </p>
                        <p>August 27 (2 days left)</p>
                    </div>
                </div>
            </div>
            {
                props.self ?
                    <div className="dashboard_main_profile_main_card form">
                        <div className="dashboard_main_profile_main_card_header">
                            <div className="dashboard_main_profile_main_card_header_item active">
                                <p>Personal Details</p>
                            </div>
                            <div className="dashboard_main_profile_main_card_header_item">
                                <p>Settings</p>
                            </div>
                        </div>
                        <div className="dashboard_main_profile_main_card_container">
                            <div className="dashboard_main_profile_main_card_container_top">
                                <div className="dashboard_main_profile_main_card_container_top_item">
                                    <InputControl label='First Name' value={currentUser.fullName.split(' ')[0]} />
                                    <InputControl label='Last Name' value={currentUser.fullName.split(' ')[1]}/>
                                </div>
                                <div className="dashboard_main_profile_main_card_container_top_item">
                                    <div className="dashboard_main_profile_main_card_container_top_item_controls">
                                        <div className="dashboard_main_profile_main_card_container_top_item_controls_input">
                                            <input style={{height: '35px'}} type="text" required value={moment(dob).format('LL') !== 'Invalid date' ? moment(dob).format('LL') : ''} onChange={() => setDob} onFocus={() => setShowCalendar(true)}/>
                                            {calendar}
                                            <div className="dashboard_main_profile_main_card_container_top_item_controls_input_label">
                                                <p>Date of Birth</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="dashboard_main_profile_main_card_container_top_item_controls">
                                        <div className="dashboard_main_profile_main_card_container_top_item_controls_input">
                                            <div className='dashboard_main_profile_main_card_container_top_item_controls_input_tel'>
                                                <TelInput />
                                            </div>
                                            <div className="dashboard_main_profile_main_card_container_top_item_controls_input_label active">
                                                <p>Mobile Number</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="dashboard_main_profile_main_card_container_bottom">
                                <div className="dashboard_main_profile_main_card_container_bottom_header">
                                    <p>Location</p>
                                </div>
                                <div className="dashboard_main_profile_main_card_container_bottom_item">
                                    <InputControl label='Postal / Zip Code' />
                                    <InputControl label='Country' />
                                    <InputControl label='City' />
                                </div>
                                <div className="dashboard_main_profile_main_card_container_bottom_item">
                                    <InputControl label='Address Line' />
                                </div>
                            </div>
                        </div>
                    </div>
                : null
            }
        </div>
    )
}

ProfileMain.propTypes = {
    currentUser: PropTypes.object,
    self: PropTypes.bool
}


export default ProfileMain;