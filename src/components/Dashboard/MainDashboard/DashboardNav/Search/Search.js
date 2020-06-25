import React, {useEffect, useRef, useState} from 'react';
import { FiSearch } from "react-icons/fi";
import axios from "../../../../../axios-dashboard";
import {withRouter} from 'react-router-dom';

// Redux Imports
import {selectToken} from "../../../../../features/auth/authSlice";
import {useSelector} from "react-redux";

// Components Imports
import SelectDropdown from "../../../../UI/SelectDropdown/SelectDropdown";
import SearchHeaderItem from "./SearchHeaderItem/SearchHeaderItem";
import SearchItem from "./SearchItem/SearchItem";

const searchHeaderItems = [
    'All',
    'People',
    'Teams',
    'Projects',
    'Tasks',
    'Invoices'
];

const Search = (props) => {
    const token = useSelector(selectToken);
    const inputRef = useRef();
    const [value, setValue] = useState('');
    const [showSearchBox, setShowSearchBox] = useState(false);
    const [filter, setFilter] = useState('All');
    const [searchedItems, setSearchedItems] = useState(null);

    function clickedOutSide(e) {
        const path = e.path || (e.composedPath && e.composedPath());
        if(!path.includes(inputRef.current)) {
            closeSearchBox();
        }
    }

    function closeSearchBox() {
        setShowSearchBox(false);
        document.removeEventListener('click', clickedOutSide);
    }

    async function inputChanged(e) {
        setValue(e.target.value);
        if(e.target.value.trim().length > 0) {
            const res = await axios.get('/search?searchQuery=' + e.target.value, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            setSearchedItems(res.data.users);
        }
    }

    function goToProfile(userId) {
        closeSearchBox();
        props.history.push('/dashboard/profile?userId=' + userId);
    }

    const headerItems = searchHeaderItems.map(item => {
        return (
            <SearchHeaderItem
                key={item}
                active={filter === item}
                clicked={() => setFilter(item)}
            >
                <p>{item}</p>
            </SearchHeaderItem>
        )
    });

    let searchItems = null;
    if(searchedItems) {
        searchItems = searchedItems.map((item, ind) => {
            return (
                <SearchItem
                    key={ind}
                    item={item}
                    clicked={(userId) => goToProfile(userId)}
                />
            )
        })
    }

    return (
        <div className='dashboard_main_nav_input' ref={inputRef}>
            <input type="text" placeholder='Search' value={value} onChange={inputChanged} onFocus={() => {
                setShowSearchBox(true);
                document.addEventListener('click', clickedOutSide);
            }}/>
            <div className='dashboard_main_nav_input_icon'>
                <FiSearch />
            </div>

            {showSearchBox ? <div className='search_box'>
                <div className="search_box_header">
                    {headerItems}
                    <SearchHeaderItem>
                        <SelectDropdown defaultItem='More Filters' />
                    </SearchHeaderItem>
                </div>
                <div className='search_box_container'>
                    {searchItems}
                </div>
            </div> : null}
        </div>
    );
};

export default withRouter(Search);