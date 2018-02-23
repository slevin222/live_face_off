import types from './types';
import axios from 'axios';

export function signIn(){
    return async dispatch => {
        try {
            const resp = await axios.get('/auth/verify');
            console.log('axiossss sign ined',resp);

            if(resp.data.isLoggedIn){
                localStorage.setItem('token', 'hardCodedToken');
                dispatch({type: types.SIGN_IN})
            }
        } catch (err){
            console.log('signinerror',err.message)
        }
    }
}

export function signOut(){
    return async dispatch => {
        try {
            const resp = await axios.get('/auth/logout');
            console.log('axiossss signed out',resp);

            localStorage.removeItem('token');
            dispatch({type: types.SIGN_OUT})
        } catch (err){
            console.log('signOuterror',err.message)
        }
    }
}