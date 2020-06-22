import React, {Fragment} from "react";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import {useSelector} from 'react-redux';

import signup from "../pages/auth/signup";
import login from "../pages/auth/login";
import reset_password from "../pages/auth/reset_password";
import { authenticated } from '../features/auth/authSlice';
import dashboard from "../pages/dashboard/dashboard";

const Layout = props => {
    const authenticatedSel = useSelector(authenticated);

    return (
        <BrowserRouter>
            <Switch>
                { authenticatedSel ?
                    <Fragment>
                        <Route path={'/dashboard'} component={dashboard}/>
                        <Redirect from={'/'} to={'/dashboard/messages'}/>
                    </Fragment>
                :
                    <Fragment>
                        <Route path='/signup' component={signup} />
                        <Route path='/login' component={login} />
                        <Route path='/reset_password' component={reset_password} />
                        <Redirect from={'/'} to={'/login'}/>
                    </Fragment>
                }
            </Switch>
        </BrowserRouter>
    )
}

export default Layout;