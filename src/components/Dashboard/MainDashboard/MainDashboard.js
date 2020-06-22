import React from "react";
import { Route, Switch, withRouter } from 'react-router-dom';

// Component Imports
import DashboardNav from "./DashboardNav/DashboardNav";
import Messages from "./SidebarActions/Messages/Messages";
import Projects from "./SidebarActions/Projects/Projects";
import Profile from "./SidebarActions/Profile/Profile";
import CreateProject from "./SidebarActions/Projects/CreateProject/CreateProject";
import {useSelector} from "react-redux";
import {selectLastRoute} from "../../../features/dashboard/dashboardSlice";


const MainDashboard = props => {
    const lastRoute = useSelector(selectLastRoute);

    return (
        <div className="dashboard_main">
            <DashboardNav />
            <div className='dashboard_main_container'>
                <Switch>
                    <Route path={props.match.url + '/messages'} component={Messages} />
                    <Route path={props.match.url + '/projects'} component={Projects} />
                    <Route path={props.match.url + '/profile'} component={Profile} />
                </Switch>
                <Route path={lastRoute + '/createProject'} component={CreateProject} />
            </div>
        </div>
    )
}

export default withRouter(MainDashboard);