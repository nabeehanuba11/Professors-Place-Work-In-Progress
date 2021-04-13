import {
    ADD_PROFILE,
    SAVE_PROFILE,
    CLEAR_PROFILE,
    DELETE_PROFILE,
    UPDATE_PROFILE,
    SET_CURRENT_PROFILE,
} from './actions'

export default(state, action) => {
    switch(action.type){
        case ADD_PROFILE:
            return{
                ...state,
                profile: [...state.profile, action.payload]
            }
        case SAVE_PROFILE:
            return{
                ...state,
                profile: action.payload,
                loading: false
                
            }
        case DELETE_PROFILE:
            return{
                ...state,
                profile: state.profile.filter(
                    profile => profile._id !== action.payload
                ),
                loading: false
                }
        case SET_CURRENT_PROFILE:
            return{
                ...state,
                current: action.payload,
                loading: false
            }
        case UPDATE_PROFILE:
            return{
                ...state,
                profile: state.profile.map(profile=>
                    profile._id === action.payload._id ? action.payload: profile),
                loading: false
            }
        case CLEAR_PROFILE:
            return{
                ...state,
                current: null
            }
            default:
                return state
    }
}