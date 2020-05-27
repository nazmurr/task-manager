import {
    SIGN_UP, 
    SIGN_IN, 
    SIGN_OUT, 
    CLEAR_USER_ERROR, 
    CLEAR_AUTH, 
    GET_USER_PROFILE,
    UPDATE_USER_PROFILE,
    UPLOAD_USER_AVATAR
} from '../actions/types';

const INITIAL_STATE = {
    isSignedIn: null,
    authCheck: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_UP:
            if(action.payload.error) return {...state, error: action.payload.error};
            sessionStorage.setItem('tmToken', action.payload.token);
            sessionStorage.setItem('tmUserName', action.payload.user.name);
            return {...state, isSignedIn: true, authCheck: true, user: action.payload.user, token: action.payload.token, error: null};
            
        case SIGN_IN:
            if(action.payload.error) return {...state, error: action.payload.error};
            sessionStorage.setItem('tmToken', action.payload.token);
            sessionStorage.setItem('tmUserName', action.payload.user.name);
            return {...state, isSignedIn: true, authCheck: true, user: action.payload.user, token: action.payload.token, error: null};

        case GET_USER_PROFILE:
            return {...state, isSignedIn: true, authCheck: true, user: action.payload, error: null};
        
        case UPDATE_USER_PROFILE:
            if(action.payload.error) return {...state, error: action.payload.error};
            return {...state, isSignedIn: true, authCheck: true, user: action.payload, error: null};
        
        case UPLOAD_USER_AVATAR:
            if(action.payload.error) return {...state, error: action.payload.error};
            return {...state, isSignedIn: true, authCheck: true, error: null};
    
        case SIGN_OUT:
            return {...state, isSignedIn: false, authCheck: true, user: null, token: null, error: null};

        case CLEAR_USER_ERROR:
            return {...state, error: null};

        case CLEAR_AUTH:
            sessionStorage.removeItem('tmToken');
            sessionStorage.removeItem('tmUserName');
            return {...state, isSignedIn: false, authCheck: true, user: null, token: null, error: null};

        default:
            return state;
    }
}