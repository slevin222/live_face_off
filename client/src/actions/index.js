import types from './types';
import axios from 'axios';

export function signIn() {
    return async dispatch => {
        try {
            const resp = await axios.get('/auth/verify');
            console.log('axiossss sign ined', resp);

            if (resp.data.isLoggedIn) {
                localStorage.setItem('token', resp.data.token);
                dispatch({ type: types.SIGN_IN })
            }
        } catch (err) {
            console.log('signinerror', err.message)
        }
    }
}

export function signOut() {
    return async dispatch => {
        try {
            const resp = await axios.get('/auth/logout');
            console.log('axiossss signed out', resp);

            localStorage.removeItem('token');
            sessionStorage.clear();
            dispatch({ type: types.SIGN_OUT })
        } catch (err) {
            console.log('signOuterror', err.message)
        }
    }
}

export function setFinalScore(finalScore) {
    return {
        payload: finalScore,
        type: types.SET_FINAL_SCORE
    }
}