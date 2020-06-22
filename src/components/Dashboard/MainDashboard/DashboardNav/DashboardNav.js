import React, {useEffect, useRef, useState} from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";

import DefaultImage from '../../../../assets/images/default.jpg';
import DropDown from "../../../UI/DropDown/DropDown";
import Notifications from "./Notifications/Notifications";
import Search from "./Search/Search";

// Redux imports
import {selectCurrentUser} from "../../../../features/dashboard/dashboardSlice";
import {LOG_OUT} from "../../../../features/auth/authSlice";


const DashboardNav = props => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);

    const [show, setShow] = useState(false);
    const dropdownRef = useRef();
    const notificationsRef = useRef();
    const [showNotifications, setShowNotifications] = useState(false);

    function logOut() {
        dispatch(LOG_OUT());
    }

    let dropdownItems = [
        {
            name: 'My account',
            clicked: () => null
        },
        {
            name: 'Reports',
            clicked: () => null
        },
        {
            name: 'Projects',
            clicked: () => null
        },
        {
            name: 'Tasks',
            clicked: () => null
        },
        {
            name: 'Support',
            clicked: () => null
        },
        {
            name: 'Log Out',
            clicked: logOut
        }
    ];

    useEffect(() => {
        // Component Mounted
        document.addEventListener('click', closeDropDownOnOut);

        return () => {
            document.removeEventListener('click', closeDropDownOnOut);
        }

    }, []);

    function closeDropDownOnOut(e) {
        const path = e.path || (e.composedPath && e.composedPath());
        if(!path.includes(dropdownRef.current)) {
            setShow(false);
        }
        if(!path.includes(notificationsRef.current)) {
            setShowNotifications(false);
        }
    }

    let notifications = null;
    if(showNotifications) {
        notifications =
            <div className='notifications_container'>
                <Notifications />
            </div>
    }

    return (
        <div className='dashboard_main_nav'>
            <Search />
            <div className='dashboard_main_nav_notification' ref={notificationsRef}>
                <div className='dashboard_main_nav_notification_count' data-count={currentUser ? currentUser.notifications.results.length : 0}>
                    {currentUser ? currentUser.notifications.results.length : null}
                </div>
                <div className='dashboard_main_nav_notification_icon' onClick={() => setShowNotifications(true)}>
                    <IoIosNotificationsOutline/>
                </div>
                {notifications}
            </div>
            <div ref={dropdownRef} className='dashboard_main_nav_user'>
                <div className='dashboard_main_nav_user_image'>
                    <img src={currentUser ? process.env.REACT_APP_API_URI + currentUser.image : DefaultImage} alt="user_default"/>
                </div>
                <div className='dashboard_main_nav_user_name'>
                    <p>{currentUser ? currentUser.fullName : ''}</p>
                </div>
                <div className='dashboard_main_nav_user_icon' onClick={(e) => setShow(!show)}>
                    <FaAngleDown />
                </div>
                <div className={show ? 'dashboard_main_nav_user_dropdown show' : 'dashboard_main_nav_user_dropdown'}>
                    <DropDown items={dropdownItems} />
                </div>
            </div>
        </div>
    )
}

export default DashboardNav;