import React, { useEffect, useState } from 'react'
import { Container, Typography, Grid, makeStyles, Chip, Divider } from '@material-ui/core'
import { CharactersByID } from '../../core/services/charactersbyid.service'

const useStyles = makeStyles({
    media: {
      maxWidth: '100%'
    },
    chip: {
        marginRight: '5px',
        marginBottom: '5px'
    }
})

function Character (props) {
    const classes = useStyles()
    const { id } = props.match.params
    const [ character, setCharacter ] = useState({})
    async function fetchData () {
        const response = await CharactersByID(id)
        setCharacter(response.data.data.results[0])
    }
    useEffect(() => {
        fetchData()
    }, [id])
    return (
        <Container>
            <Grid container spacing={6} alignItems="center">
                <Grid item xs={6}>
                    <img
                        className={classes.media}
                        src={`${character.thumbnail && character.thumbnail.path}.${character.thumbnail && character.thumbnail.extension}`}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h3">{character.name}</Typography>
                    <Typography variant="subtitle1">{character.description}</Typography>
                    <Divider />
                    <Typography variant="h6">Series:</Typography>
                    {
                        character.series && 
                            character.series.items.map(serie => 
                                <Chip label={serie.name} className={classes.chip}  />
                            )
                    }
                </Grid>
            </Grid>
        </Container>
    )
}

export default Character