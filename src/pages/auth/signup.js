import React from "react";

import AuthModal from "../../components/AuthModal/Authmodal";

const signup = (props) => {

    return (
        <div className='signup_page auth_page'>
            <AuthModal authType='signup' />
        </div>
    )
}

export default signup;