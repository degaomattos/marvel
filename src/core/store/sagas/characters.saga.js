import { takeEvery, call, put } from 'redux-saga/effects'
import { Characters } from '../../services/characters.service'
import { 
    CHARACTERS_REQUEST, 
    CHARACTERS_ERROR, 
    CHARACTERS_SUCCESS, 
    SEARCH_CHARACTERS_REQUEST, 
    SEARCH_CHARACTERS_SUCCESS, 
    SEARCH_CHARACTERS_ERROR 
} from './../constants/actionType.constant'

function* getCharacters (action) {
    try {
        const CHARACTERS = yield call(Characters, action.offset, action.nameStartsWith, action.limit)
        yield put({ type: CHARACTERS_SUCCESS,  payload: CHARACTERS.data.data.results })
    } catch (error) {
        yield put({ type: CHARACTERS_ERROR })
    }
}

function* searchCharacters (action) {
    try {
        const SEARCHCHARACTERS = yield call(Characters, action.offset, action.nameStartsWith, action.limit)
        yield put({ type: SEARCH_CHARACTERS_SUCCESS,  payload: SEARCHCHARACTERS.data.data.results })
    } catch (error) {
        yield put({ type: SEARCH_CHARACTERS_ERROR })
    }
}

function* charactersSaga(){
    yield takeEvery( CHARACTERS_REQUEST, getCharacters)
    yield takeEvery( SEARCH_CHARACTERS_REQUEST, searchCharacters)
}

export default charactersSaga