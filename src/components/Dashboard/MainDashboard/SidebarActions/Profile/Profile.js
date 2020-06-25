import React, {Fragment, useEffect, useState} from 'react';
import axios from '../../../../../axios-dashboard';

import ProfileSide from "./ProfileSide/ProfileSide";
import ProfileMain from "./ProfileMain/ProfileMain";
import FetchingSome from "../../../../UI/FetchingSome/FetchingSome";

// Redux Imports
import {selectToken} from "../../../../../features/auth/authSlice";
import {useSelector} from "react-redux";

const Profile = props => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = useSelector(selectToken);

    useEffect(() => {
        setLoading(true);

        async function fetchUser() {
            const query = new URLSearchParams(props.location.search);
            const userId = query.get('userId');
            console.log(userId);
            const res = await axios.get('/user?userIdToBeFetched=' + userId, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            console.log(res.data);
            setCurrentUser(res.data.fetchedUser);
            setLoading(false);
        }

        fetchUser().then().catch(e => console.error(e.message));

    }, [props.location.search]);

    let fetchedProfile = <FetchingSome>Fetching User Data...</FetchingSome>;

    if (!loading) {
        fetchedProfile = (
            <div className='dashboard_main_profile'>
                <ProfileSide currentUser={currentUser} self={Boolean(currentUser.email)}/>
                <ProfileMain currentUser={currentUser} self={Boolean(currentUser.email)}/>
            </div>
        )
    }

    return fetchedProfile;
}

export default Profile;