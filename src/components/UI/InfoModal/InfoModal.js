import React, {useEffect, useRef, useState} from 'react';
import * as PropTypes from 'prop-types';
import {createPortal} from "react-dom";

const InfoModal = props => {
    const [show, setShow] = useState(props.show);
    const infoModalRef = useRef();

    useEffect(() => {
        document.addEventListener('click', clickOutOfTarget);

        return () => {
            document.removeEventListener('click', clickOutOfTarget);
        }
    }, [])

    useEffect(() => {
        props.showState(props.show);
        setShow(props.show);
    }, [props.show]);

    function clickOutOfTarget(e) {
        const path = e.path || (e.composedPath && e.composedPath());
        if(!path.includes(infoModalRef.current)) {
            setShow(false);
            props.showState(false);
        }
    }

    return createPortal(
        <div className={props.show && show ? 'info_modal show' : 'info_modal hide'} ref={infoModalRef}>
            {props.children}
        </div>,
        document.getElementById('root_modal')
    )
}

InfoModal.propTypes = {
    showState: PropTypes.func,
    show: PropTypes.bool
}

export default InfoModal;