import {  CHARACTERS_REQUEST, SEARCH_CHARACTERS_REQUEST, CLEAR_SEARCH} from './../constants/actionType.constant'

export function charactersRequest (offset, nameStartsWith, limit) {
    return {
        offset,
        nameStartsWith,
        limit,
        type: CHARACTERS_REQUEST
    }
}

export function searchCharactersRequest (offset, nameStartsWith, limit) {
    return {
        offset,
        nameStartsWith,
        limit,
        type: SEARCH_CHARACTERS_REQUEST
    }
}

export function clearSearch() {
    return {
        type: CLEAR_SEARCH
    }
}