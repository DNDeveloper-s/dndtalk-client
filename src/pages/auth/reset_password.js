import React from "react";

import AuthModal from "../../components/AuthModal/Authmodal";

const reset_password = (props) => {

    return (
        <div className='reset_password_page auth_page'>
            <AuthModal authType='reset_password' />
        </div>
    )
}

export default reset_password;