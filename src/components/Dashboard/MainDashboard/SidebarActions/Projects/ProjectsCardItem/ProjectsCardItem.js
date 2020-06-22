import React, {useEffect, useRef, useState} from "react";
import * as PropTypes from 'prop-types';
import {BsThreeDots} from "react-icons/bs";
import DropDown from "../../../../../UI/DropDown/DropDown";
import DefaultImage from "../../../../../../assets/images/default.jpg";
import MessagesChatHeaderMenuUser
    from "../../Messages/MessagesChat/MessagesChatHeader/MessagesChatHeaderMenu/MessagesChatHeaderMenuUser/MessagesChatHeaderMenuUser";

const ProjectsCardItem = props => {
    const [showDropDown, setShowDropDown] = useState(false);
    const dropdownRef = useRef();

    useEffect(() => {

        // Component mounted
        document.addEventListener('click', outOfDropdown);

        return () => {
            // Component mounted
            document.removeEventListener('click', outOfDropdown);
        }

    }, []);

    function outOfDropdown(e) {
        const path = e.path || (e.composedPath && e.composedPath());
        if(!path.includes(dropdownRef.current)) {
            setShowDropDown(false);
        }
    }

    return (
        <div className="dashboard_main_projects_cards_item">
            <div className="dashboard_main_projects_cards_item_header">
                <div className="dashboard_main_projects_cards_item_header_date">
                    28 June 2017
                </div>
                <div className="dashboard_main_projects_cards_item_header_menu" ref={dropdownRef}>
                    <div className="dashboard_main_projects_cards_item_header_menu_icon" onClick={() => setShowDropDown(!showDropDown)}>
                        <BsThreeDots />
                    </div>
                    <div className={showDropDown ? 'dashboard_main_projects_cards_item_header_menu_dropdown show' : 'dashboard_main_projects_cards_item_header_menu_dropdown'}>
                        <DropDown theme={'black'} />
                    </div>
                </div>
            </div>
            <div className='dashboard_main_projects_cards_item_project'>
                <div className="dashboard_main_projects_cards_item_project_image">
                    <img src={DefaultImage} alt=""/>
                </div>
                <div className="dashboard_main_projects_cards_item_project_title">
                    <p>User Interface Design</p>
                </div>
                <div className="dashboard_main_projects_cards_item_project_users">
                    <MessagesChatHeaderMenuUser />
                    <MessagesChatHeaderMenuUser />
                    <MessagesChatHeaderMenuUser />
                </div>
                <div className="dashboard_main_projects_cards_item_project_status" data-status={props.status || 'In-Progress'}>
                    <p>{props.status || 'In-Progress'}</p>
                </div>
            </div>
            <div className='dashboard_main_projects_cards_item_bottom'>
                <div className="dashboard_main_projects_cards_item_bottom_item">
                    <p>Add People</p>
                </div>
                <div className="dashboard_main_projects_cards_item_bottom_item">
                    <p>Create Task</p>
                </div>
                <div className="dashboard_main_projects_cards_item_bottom_item">
                    <p>Comments</p>
                </div>
            </div>
        </div>
    )
}

ProjectsCardItem.propTypes = {
    status: PropTypes.oneOf(['In-Progress', 'Active'])
}

export default ProjectsCardItem;