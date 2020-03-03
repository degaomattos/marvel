import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Container, CardHeader, Grid, Card, makeStyles, Typography } from '@material-ui/core'


const useStyles = makeStyles({
    media: {
      maxWidth: '100%'
    },
    card: {
        height: '300px'
    },
    title: {
        margin: '1em 0',
        fontSize: '25px',
        fontWeight: 600,
        position: 'relative',
        fontFamily: 'RobotoCondensed,Trebuchet MS,Helvetica,Arial,sans-serif',
        '&:before' : {
            backgroundColor: '#c6a972',
            content: "''",
            display: 'block',
            height: '2px' ,
            position: 'absolute', 
            transform: 'rotate(-45deg) skewX(45deg)',
            width: '20px',
            left: "41px",
            top: '-2px'
        },
        '&:after' : {
            backgroundColor: '#c6a972',
            content: "''",
            display: 'block',
            height: '2px' ,
            position: 'absolute', 
            transform: 'rotate(-45deg) skewX(45deg)',
            width: '20px',
            bottom: '-3px',
            left: '2px'
        },
    }
})

function Main() {
    const classes = useStyles()
    const [ characters, setCharacters ] = useState([])
    useEffect(() => {
        return Axios({
            method: 'GET',
            url: ` https://gateway.marvel.com/v1/public/characters?ts=${JSON.stringify(new Date())}&apikey=6aeddf0792f14178ca6bdb530bdab9a3` 
        })
        .then(response => {
            setCharacters(response.data.data.results)
        })
    }, [])
    return (
        <Container>
            <Typography className={classes.title}>PERSONAGENS</Typography>
            <Grid container spacing={2} alignItems="stretch">
                {
                    characters && characters.map(item => 
                        <Grid item xs={3}>
                            <Card className={classes.card}>
                                <CardHeader
                                    subheader={item.name}
                                />
                                <div>
                                    <img
                                        className={classes.media}
                                        src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                                    />
                                </div>
                            </Card> 
                        </Grid>
                    )
                }
            </Grid>
        </Container>
    )
}

export default Main
