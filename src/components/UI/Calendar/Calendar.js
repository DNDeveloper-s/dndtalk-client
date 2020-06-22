import React, {useEffect, useRef, useState} from "react";
import * as PropTypes from 'prop-types';

// Third Party Components
// import SimpleReactCalendar from 'simple-react-calendar';
import CalendarCo from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

const Calendar = props => {
    const [value, setValue] = useState(props.startDate || new Date());

    return (
        <CalendarCo
            onChange={(e) => {
                if(props.changed) {
                    props.changed(e);
                }
                setValue(e);
            }}
            value={value}
            selectRange={props.selectRange || false}
        />
    )
}

Calendar.propTypes = {
    selectRange: PropTypes.bool,
    startDate: PropTypes.instanceOf(Date),
    changed: PropTypes.func,
}

export default Calendar;