import {UserActionTypes} from './user.types';

const INITIAL_STATE = {
    userFromReducer : null
};

const userReducer = (state = INITIAL_STATE, action) => { //pasing the inital state
    switch (action.type) {
        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                userFromReducer: action.payload
            }
        default :
            return state;
    }
};

export default userReducer;