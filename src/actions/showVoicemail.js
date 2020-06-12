import { RECEIVE_POSTS } from '../actions'

const initialState = {
    list: []
}

export function showVoicemail(state = initialState, action) {
    
    switch (action.type) {
        case RECEIVE_POSTS:
            return Object.assign({}, state, {list: action.payload})
        default:
            return state 
    }
    
}