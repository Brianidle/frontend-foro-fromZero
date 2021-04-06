import {CHANGUE_TOKEN} from './actionTypes';

export const doChangueToken = (token) => {
    return {
        type: CHANGUE_TOKEN,
        newToken:token
    };
};