import { combineReducers } from 'redux'
import characters from './characters/characters.reducer'

const reducers = combineReducers({
    characters
})

export default reducers
