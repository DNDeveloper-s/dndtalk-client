import React from 'react';
import * as PropTypes from 'prop-types';
import {DefaultImage} from "../../../../../../helpers";
import Button from "../../../../../UI/Button/Button";
import moment from 'moment';

// Components Imports


// Images Imports

const SearchItem = (props) => {

    return (
        <div className="search_box_container_item" onClick={() => props.clicked(props.item._id)}>
            <div className="search_box_container_item_header">
                <div className="search_box_container_item_header_user">
                    <div className="search_box_container_item_header_user_image">
                        {DefaultImage()}
                    </div>
                    <div className="search_box_container_item_header_user_title">
                        <p>{props.item.fullName}</p>
                        <div className="search_box_container_item_header_user_jobTitle">
                            <p>Web Developer</p>
                        </div>
                    </div>
                    <div className="search_box_container_item_header_user_activity">
                        <span>Last active:</span>
                        <span style={{color: props.item.activity.status === 'online' ? '#38c221' : '#878787'}}> {props.item.activity.status === 'online' ? 'online' : props.item.activity.lastOnline ? moment(new Date(props.item.activity.lastOnline)).startOf('second').fromNow() : 'a while ago'}</span>
                    </div>
                </div>
            </div>
            <div className='search_box_container_item_details'>
                <div className="search_box_container_item_details_category">
                    <span>Category: </span>
                    <span>People</span>
                </div>
                <div className='search_box_container_item_details_actions'>
                    <div className="search_box_container_item_details_actions_btn">
                        <Button clicked={() => null} styles={{background: props.item.isYourFriend ? '#3596f9' : '#fe9933'}}>{props.item.isYourFriend ? 'Send Message' : 'Add Friend'}</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

SearchItem.propTypes = {
    item: PropTypes.object,
};

export default SearchItem;