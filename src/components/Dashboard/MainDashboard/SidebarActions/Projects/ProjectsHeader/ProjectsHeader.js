import React from "react";
import {withRouter} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {BsGrid3X3Gap} from "react-icons/bs";
import {FaThList} from "react-icons/fa";

import { SET_LAST_ROUTE } from "../../../../../../features/dashboard/dashboardSlice";

import SelectDropdown from "../../../../../UI/SelectDropdown/SelectDropdown";
import Button from "../../../../../UI/Button/Button";

const ProjectsHeader = props => {
    const dispatch = useDispatch();

    function gotoCreateProject(e) {
        console.log(props);
        dispatch(SET_LAST_ROUTE({
            lastRoute: props.match.url
        }))
        props.history.push(props.match.url + '/createProject');
    }

    return (
        <div className='dashboard_main_projects_header'>
            <div className='dashboard_main_projects_header_title'>
                <p>Projects List</p>
            </div>
            <div className='dashboard_main_projects_header_menu'>
                <div className='dashboard_main_projects_header_menu_thumbnail'>
                    <div className='dashboard_main_projects_header_menu_thumbnail_icon'>
                        <BsGrid3X3Gap />
                    </div>
                </div>
                <div className='dashboard_main_projects_header_menu_list'>
                    <div className='dashboard_main_projects_header_menu_list_icon'>
                        <FaThList />
                    </div>
                </div>
                <div className='dashboard_main_projects_header_menu_dropdown'>
                    <SelectDropdown
                        defaultItem='Project Type'
                    />
                </div>
                <div className='dashboard_main_projects_header_menu_dropdown'>
                    <SelectDropdown
                        defaultItem='Category'
                    />
                </div>
                <div className="dashboard_main_projects_header_menu_action">
                    <div className="dashboard_main_projects_header_menu_action_btn">
                        <Button clicked={gotoCreateProject}>Create Project</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(ProjectsHeader);