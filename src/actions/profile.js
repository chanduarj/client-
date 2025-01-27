import axios from 'axios';
import {setAlert} from './alert';

import {
    GET_PROFILE, PROFILE_ERROR
} from './types'

//Get Current users Profile

export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('api/profile/me');

        dispatch ({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}

export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const res = await axios.post('api/profile', formData, config);

        dispatch ({
            type: GET_PROFILE,
            payload: res.data
        });
        dispatch (setAlert(edit ? 'Profile Updated': 'Profile Created', 'success'));

        if(!edit) {
            history.push('/dashboard');
        }

    } catch (error) {
        const errors = error.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}