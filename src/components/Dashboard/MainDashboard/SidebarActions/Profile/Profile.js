import React, {Fragment, useEffect, useState} from 'react';
import axios from '../../../../../axios-dashboard';

import ProfileSide from "./ProfileSide/ProfileSide";
import ProfileMain from "./ProfileMain/ProfileMain";
import Loader from "../../../../UI/Loader/Loader";
import FetchingSome from "../Messages/FetchingSome";

const Profile = props => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        async function fetchUser() {
            const query = new URLSearchParams(props.location.search);
            const userId = query.get('userId');
            console.log(userId);
            const res = await axios.get('/user?userIdToBeFetched=' + userId);
            console.log(res.data);
            setCurrentUser(res.data.fetchedUser);
            setLoading(false);
        }

        fetchUser();

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