import React from "react";

import AuthModal from "../../components/AuthModal/Authmodal";

const Login = (props) => {

    return (
        <div className='login_page auth_page'>
            <AuthModal authType='login' />
        </div>
    )
}

export default Login;