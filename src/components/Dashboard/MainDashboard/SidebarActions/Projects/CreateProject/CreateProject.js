import React, {useEffect, useRef, useState} from "react";
import { withRouter } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import moment from "moment";

import { wait } from "../../../../../../helpers";
import { selectLastRoute } from "../../../../../../features/dashboard/dashboardSlice";
import {useSelector} from "react-redux";
import DefaultImage from '../../../../../../assets/images/default.jpg';
import { rippleClicked } from "../../../../../../helpers";

import Calendar from "../../../../../UI/Calendar/Calendar";

const CreateProject = props => {
    const createModalRef = useRef();
    const startCalendarRef = useRef();
    const rangeCalendarRef = useRef();

    const lastRoute = useSelector(selectLastRoute);

    const [showModal, setShowModal] = useState(true);
    const [showCalendar, setShowCalendar] = useState(false);
    const [showRangeCalendar, setShowRangeCalendar] = useState(false);
    const [startingDate, setStartingDate] = useState(new Date());
    const [rangeDate, setRangeDate] = useState(null);

    useEffect(() => {
        document.addEventListener('click', clickedOutOfModal);

        return () => {
            document.removeEventListener('click', clickedOutOfModal);
        }
    }, []);

    async function hideModal() {
        setShowModal(false);
        await wait(400);
        props.history.push(lastRoute);
    }

    function clickedOutOfModal(e) {
        const path = e.path || (e.composedPath && e.composedPath());
        if (!path.includes(createModalRef.current)) {
            hideModal();
        }

        if(!path.includes(startCalendarRef.current)) {
            setShowCalendar(false);
        }

        if(!path.includes(rangeCalendarRef.current)) {
            setShowRangeCalendar(false);
        }
    }

    let calendar = null;
    if(showCalendar) {
        calendar = <div className='projects_calendar'>
            <Calendar changed={setStartingDate} />
        </div>
    }

    let rangeCalendar = null;
    if(showRangeCalendar) {
        rangeCalendar = <div className='projects_calendar'>
            <Calendar selectRange startDate={startingDate} changed={(e) => {
                setRangeDate(e[1]);
            }} />
        </div>
    }

    let itemStyle = null

    if(showCalendar) {
        itemStyle = {
            zIndex: 1
        }
    }

    return (
        <div className={showModal ? 'dashboard_main_projects_create' : 'dashboard_main_projects_create hide'} ref={createModalRef}>
            <div className='dashboard_main_projects_create_header'>
                <div className="dashboard_main_projects_create_header_item active">
                    <p>Project Details</p>
                </div>
                <div className="dashboard_main_projects_create_header_item">
                    <p>Choose Category</p>
                </div>
            </div>
            <div className="dashboard_main_projects_create_main">
                <div className='dashboard_main_projects_create_main_item'>
                    <div className="dashboard_main_projects_create_main_item_left">
                        <div className="dashboard_main_projects_create_main_item_left_choose">
                            <div className='dashboard_main_projects_create_main_item_left_choose_container'>
                                <div className='dashboard_main_projects_create_main_item_left_choose_container_left'>
                                    <div className='dashboard_main_projects_create_main_item_left_choose_container_left_image'>
                                        <img src={DefaultImage} alt=""/>
                                    </div>
                                </div>
                                <div className="dashboard_main_projects_create_main_item_left_choose_container_right">
                                    <div className='dashboard_main_projects_create_main_item_left_choose_container_right_content'>
                                        <p>Drag & Drop to change logo</p>
                                        <div className='dashboard_main_projects_create_main_item_left_choose_container_right_content_bottom'>
                                            <p>Or</p>
                                            <div className="dashboard_main_projects_create_main_item_left_choose_container_right_content_bottom_choose">
                                                <p>Browse</p>
                                                <input type="file"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='dashboard_main_projects_create_main_item_left_common-item'>
                            <input type="text" required/>
                            <div className="dashboard_main_projects_create_main_item_left_common-item_label">
                                <p>Project Name <span style={{color: 'red'}}>*</span></p>
                            </div>
                        </div>
                        <div className='dashboard_main_projects_create_main_item_left_common-item'>
                            <input type="text" required/>
                            <div className="dashboard_main_projects_create_main_item_left_common-item_label">
                                <p>Website URL</p>
                            </div>
                        </div>
                        <div className='dashboard_main_projects_create_main_item_left_common-item'>
                            <input type="text" required/>
                            <div className="dashboard_main_projects_create_main_item_left_common-item_label">
                                <p>Location <span style={{color: 'red'}}>*</span></p>
                            </div>
                        </div>
                    </div>
                    <div className='dashboard_main_projects_create_main_item_right'>
                        <div style={itemStyle} className='dashboard_main_projects_create_main_item_right_common-item' ref={startCalendarRef}>
                            <input type="text" required onClick={() => setShowCalendar(!showCalendar)} value={moment(startingDate).format('ll') || ''} onChange={setStartingDate}/>
                            <div className="dashboard_main_projects_create_main_item_right_common-item_label">
                                <p>Project Starting Date <span style={{color: 'red'}}>*</span></p>
                            </div>
                            {calendar}
                        </div>
                        <div className='dashboard_main_projects_create_main_item_right_common-item'>
                            <input type="text" required/>
                            <div className="dashboard_main_projects_create_main_item_right_common-item_label">
                                <p>Project Type</p>
                            </div>
                        </div>
                        <div className='dashboard_main_projects_create_main_item_right_common-item' ref={rangeCalendarRef}>
                            <input type="text" required onClick={() => setShowRangeCalendar(!showRangeCalendar)} value={`${moment(startingDate).format('ll')} - ${moment(rangeDate).format('ll')}` || ''} onChange={setRangeDate}/>
                            <div className="dashboard_main_projects_create_main_item_right_common-item_label">
                                <p>Project Timeline <span style={{color: 'red'}}>*</span></p>
                            </div>
                            {rangeCalendar}
                        </div>
                        <div className='dashboard_main_projects_create_main_item_right_common-item textarea'>
                            <textarea name="" id="" cols="30" required/>
                            <div className="dashboard_main_projects_create_main_item_right_common-item_label">
                                <p>Description</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='dashboard_main_projects_create_bottom'>
                <div className="dashboard_main_projects_create_bottom_button" onClick={rippleClicked}>
                    <p>Next To Choose Category</p>
                </div>
            </div>
        </div>
    )
}

CreateProject.propTypes = {
    show: PropTypes.bool
}

export default withRouter(CreateProject);