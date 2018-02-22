import types from './types';

export function signIn(){
    return {
        type: types.SIGN_IN
    }
}

export function signOut(){
    return {
        type: types.SIGN_OUT
    }
}