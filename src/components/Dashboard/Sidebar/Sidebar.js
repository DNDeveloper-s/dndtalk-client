import React, {useState} from "react";
import {withRouter, NavLink} from 'react-router-dom';
import { DiSenchatouch } from 'react-icons/di';
import { AiOutlineDashboard } from "react-icons/ai";
import { MdChat } from "react-icons/md";
import { TiChartBar } from "react-icons/ti";
import { BsFillGearFill, BsListNested } from "react-icons/bs";
import { FaUserMd, FaUserTie } from "react-icons/fa";

import {selectCurrentUser} from "../../../features/dashboard/dashboardSlice";

// Components Imports
import SidebarItem from "./SidebarItem/SidebarItem";
import ProjectIcon from "../../UI/Icons/ProjectIcon";
import TaskIcon from "../../UI/Icons/TaskIcon";
import InvoiceIcon from "../../UI/Icons/InvoiceIcon";
import {useSelector} from "react-redux";

const Sidebar = props => {
    const currentUser = useSelector(selectCurrentUser);

    return (
        <div className='dashboard_sidebar'>
            <div className="dashboard_sidebar_header">
                <div className="dashboard_sidebar_header_icon">
                    <DiSenchatouch />
                </div>
                <div className="dashboard_sidebar_header_label">
                    <p>DND-Talk</p>
                </div>
            </div>
            <div className='dashboard_sidebar_items'>
                <NavLink to={props.match.url + '/home'} activeClassName='dashboard_sidebar_item_link-active'>
                    <SidebarItem label='Dashboard'>
                        <AiOutlineDashboard />
                    </SidebarItem>
                </NavLink>
                <NavLink to={props.match.url + '/projects'} activeClassName='dashboard_sidebar_item_link-active'>
                    <SidebarItem label='Projects'>
                        <BsListNested />
                    </SidebarItem>
                </NavLink>
                <NavLink to={props.match.url + '/tasks'} activeClassName='dashboard_sidebar_item_link-active'>
                    <SidebarItem label='Tasks'>
                        <TaskIcon />
                    </SidebarItem>
                </NavLink>
                <NavLink to={props.match.url + '/invoices'} activeClassName='dashboard_sidebar_item_link-active'>
                    <SidebarItem label='Invoice'>
                        <InvoiceIcon />
                    </SidebarItem>
                </NavLink>
                <NavLink to={props.match.url + '/messages'} activeClassName='dashboard_sidebar_item_link-active'>
                    <SidebarItem label='Messages'>
                        <MdChat />
                    </SidebarItem>
                </NavLink>
                <NavLink to={props.match.url + '/reports'} activeClassName='dashboard_sidebar_item_link-active'>
                    <SidebarItem label='Reports'>
                        <TiChartBar />
                    </SidebarItem>
                </NavLink>
            </div>
            <div className='dashboard_sidebar_bottom'>
                <NavLink to={props.match.url + '/settings'} activeClassName='dashboard_sidebar_item_link-active'>
                    <SidebarItem label='Settings'>
                        <BsFillGearFill />
                    </SidebarItem>
                </NavLink>
                <NavLink to={{
                    pathname: props.match.url + '/profile',
                    search: "?userId=" + currentUser._id
                }} activeClassName='dashboard_sidebar_item_link-active'>
                    <SidebarItem label='Profile'>
                        <FaUserTie />
                    </SidebarItem>
                </NavLink>
                <NavLink
                    to={props.match.url + '/contact'}
                >
                    <SidebarItem label='Contact Support' activeClassName='dashboard_sidebar_item_link-active'>
                        <FaUserMd />
                    </SidebarItem>
                </NavLink>
            </div>
        </div>
    )
}

export default withRouter(Sidebar);