import validator from "validator/es";
import React from 'react';
import axios from 'axios';
import DefaultImageAsset from '../assets/images/default.jpg';

export const validatePassword = function (val) {
    if(validator.isEmpty(val)) return {
            bool: false,
            message: 'Password cannot be empty.'
        }
    if(!validator.isLength(val, {min: 8, max: 60})) return {
            bool: false,
            message: 'Password must at least of 8 characters.'
        }
    if(!(validator.contains(val, '@') ||
        validator.contains(val, '!') ||
        validator.contains(val, '#') ||
        validator.contains(val, '$') ||
        validator.contains(val, '%') ||
        validator.contains(val, '^') ||
        validator.contains(val, '&') ||
        validator.contains(val, '*') ||
        validator.contains(val, '(') ||
        validator.contains(val, ')'))) return {
            bool: false,
            message: 'Password must contains at least one special character.'
        }
    return {
        bool: true
    }
}

export const validateEmail = function (val) {
    if(validator.isEmpty(val)) return {
            bool: false,
            message: 'Email field cannot be empty.'
        }
    if(!validator.isEmail(val)) return {
            bool: false,
            message: 'Email is invalid'
        }
    return {
        bool: true
    }
};

export const wait = async function (time) {
    return new Promise((res, rej) => {
        setTimeout(() => res(), time);
    });
};

export const rippleClicked = function (e) {
    let x = e.nativeEvent.offsetX;
    let y = e.nativeEvent.offsetY;

    let ripples = document.createElement('span');
    ripples.classList.add('ripple');
    ripples.style.left = x + 'px';
    ripples.style.top = y + 'px';
    e.target.appendChild(ripples);

    setTimeout(() => {
        ripples.remove();
    }, 1000)
};

export const DefaultImage = () => (
    <img src={DefaultImageAsset} alt="DND-talk"/>
);