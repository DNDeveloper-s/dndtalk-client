import React from 'react';

// Classes Imports
import classes from './NotificationIcon.module.scss';

// Images Imports

const NotificationIcon = (props) => {
    let style = {};

    if(props.color) {
        style = {
            before: {
                border: '1px solid ' + props.color,
                background: props.color
            },
            after: {
                boxShadow: '0 0 5px ' + props.color,
            }
        }
    }

    return (
        <div className={classes.NotificationIcon}>
            <div style={style.before} className={classes.Before} />
            <div style={style.after} className={classes.After} />
        </div>
    );
};

export default NotificationIcon;