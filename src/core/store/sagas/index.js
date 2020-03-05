import { all } from 'redux-saga/effects'
import charactersSaga from './characters.saga'

export default function* rootSaga() {
    yield all([
        charactersSaga()
    ])
}