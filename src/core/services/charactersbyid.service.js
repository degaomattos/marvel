import Axios from 'axios'

export const CharactersByID = (id) => {
    return Axios({
        method: 'GET',
        url: `https://gateway.marvel.com/v1/public/characters/${id}`,
        params: {
            ts: JSON.stringify(new Date()),
            apikey: '6aeddf0792f14178ca6bdb530bdab9a3'
        }
    })
    .then(response => {
        return response
    })
    .catch(err => {
        throw err
    })
}