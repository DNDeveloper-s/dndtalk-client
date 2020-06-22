import React from 'react';
import * as PropTypes from 'prop-types';

// Components Imports
import Loader from "../../../../UI/Loader/Loader";

const FetchingSome = (props) => (
    <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            ...props.styles
        }}>
        <p style={{marginBottom: '20px', fontSize: '15px', color:'#878787'}}>{props.children}</p>
        <Loader color={ props.color || '#878787'} />
    </div>
);

FetchingSome.propTypes = {
    color: PropTypes.string,
    styles: PropTypes.object
};

export default FetchingSome;