import Axios from 'axios'

export const Characters = (offset, nameStartsWith, limit) => {
    return Axios({
        method: 'GET',
        url: `https://gateway.marvel.com/v1/public/characters`,
        params: {
            ts: JSON.stringify(new Date()),
            apikey: '6aeddf0792f14178ca6bdb530bdab9a3',
            offset: offset,
            [nameStartsWith && 'nameStartsWith']: nameStartsWith,
            [limit && 'limit']: limit
        }
    })
    .then(response => {
        return response
    })
    .catch(err => {
        throw err
    })
}