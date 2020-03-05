import { CHARACTERS_SUCCESS, SEARCH_CHARACTERS_SUCCESS, CLEAR_SEARCH } from './../../constants/actionType.constant'

const initialState = {
    characters: []
}
export default function (state = initialState, action) {
    switch (action.type) {
        case CHARACTERS_SUCCESS: 
            return {
                ...state, 
                characters: [
                    ...state.characters,
                    ...action.payload
                ]
            }

        case SEARCH_CHARACTERS_SUCCESS: 
            return {
                ...state, 
                characters: action.payload
            }
        case CLEAR_SEARCH: 
            return {
                ...initialState
            }
        default:
            return state
    }
}
  