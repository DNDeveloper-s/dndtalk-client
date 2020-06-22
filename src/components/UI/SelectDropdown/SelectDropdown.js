import React, {createRef, useEffect, useRef, useState} from "react";
import * as PropTypes from 'prop-types';
import { FaAngleDown } from "react-icons/fa";

import SelectDropdownItem from "./SelectDropdownItem/SelectDropdownItem";
import { rippleClicked } from "../../../helpers";

let items = [
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5',
    'Item 6',
    'Item 7',
];

const SelectDropdown = props => {
    const [showDropdown, setShowDropdown] = useState(false);
    const selectDropdownRef = useRef();

    useEffect(() => {
        // Component mounted
        document.addEventListener('click', outsideClickHandler);

        return () => {
            document.removeEventListener('click', outsideClickHandler);
        }
    }, [])

    function outsideClickHandler(e) {
        const path = e.path || (e.composedPath && e.composedPath());
        if(!path.includes(selectDropdownRef.current)) {
            setShowDropdown(false);
        }
    }

    function toggleDropdown() {
        setShowDropdown(!showDropdown);
    }

    const [selectedItem, setSelectedItem] = useState(null);

    let itemsEl = items.map((item, ind) => {
        return (
            <SelectDropdownItem key={item} clicked={() => {
                setSelectedItem(item);
                toggleDropdown();
            }}>
                {item}
            </SelectDropdownItem>
        )
    });

    return (
        <div className='select_dropdown' ref={selectDropdownRef}>
            <div className="select_dropdown_header" onClick={(e) => {
                rippleClicked(e);
                toggleDropdown();
            }}>
                <div className="select_dropdown_header_title">
                    <p>{selectedItem || props.defaultItem || 'Select Item'}</p>
                </div>
                <div className="select_dropdown_header_icon">
                    <FaAngleDown />
                </div>
            </div>
            <div className={showDropdown ? 'select_dropdown_list active' : 'select_dropdown_list'}>
                {itemsEl}
                <SelectDropdownItem clicked={() => {
                    setSelectedItem(null);
                    toggleDropdown();
                }} itemColor='lightgrey' fontSize='11px'>
                    Reset
                </SelectDropdownItem>
            </div>
        </div>
    )
}

SelectDropdown.propTypes = {
    items: PropTypes.array,
    defaultItem: PropTypes.string
}

export default SelectDropdown;