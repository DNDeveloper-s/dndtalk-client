import React from "react";
import classes from './Loader.module.scss';
import * as PropTypes from 'prop-types';

const Loader = props => {
    let style = {
        backgroundColor: props.color || '#fff'
    }

    return (
        <div className={classes['lds-ellipsis']}>
            <div style={style} />
            <div style={style} />
            <div style={style} />
            <div style={style} />
        </div>
    )
}

Loader.propTypes = {
    color: PropTypes.string
}

export default Loader;