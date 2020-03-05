import React, { useEffect, useState } from 'react'
import { Container, Typography, Grid, makeStyles, Chip, Divider, Breadcrumbs, Link, IconButton, TextField } from '@material-ui/core'
import { CharactersByID } from '../../core/services/charactersbyid.service'
import { Scrollbars } from 'react-custom-scrollbars'
import { Edit, Done } from '@material-ui/icons'

const useStyles = makeStyles({
    media: {
      maxWidth: '100%'
    },
    chip: {
        marginRight: '5px',
        marginBottom: '5px'
    },
    breadcrumbs: {
        padding: '20px 0'
    },
    headContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})

function Character (props) {
    const classes = useStyles()
    const { id } = props.match.params
    const [ character, setCharacter ] = useState({})
    const [ isEdit, setEdit ] = useState(false)
    const [ tmpName, setTmpName ] = useState()
    const [ tmpDesc, setTmpDesc] = useState()
    
    useEffect(() => {
        async function fetchData () {
            const response = await CharactersByID(id)
            setCharacter(response.data.data.results[0])
            setTmpDesc(response.data.data.results[0].description)
            setTmpName(response.data.data.results[0].name)
        }
        fetchData()
    }, [id])

    function handleForm() { 
        setCharacter({
            ...character,
            name: tmpName,
            description: tmpDesc
        })
        setEdit(!isEdit)
    }
    return (
        <Container>
            <div className={classes.headContent}>
                <Breadcrumbs className={classes.breadcrumbs}>
                    <Link href="/" >
                        Home
                    </Link>
                    <Typography>Personagem</Typography>
                    <Typography>{character.name}</Typography>
                </Breadcrumbs>
                <>
                    {
                        !isEdit ?
                        <IconButton onClick={() => setEdit(!isEdit)}>
                            <Edit />
                        </IconButton>
                        :
                        <IconButton onClick={handleForm}>
                            <Done />
                        </IconButton>
                    }
                    
                </>
            </div>
            <Scrollbars
                renderTrackHorizontal={props => <div {...props} className="track-horizontal" style={{display:"none"}}/>}
                renderThumbHorizontal={props => <div {...props} className="thumb-horizontal" style={{display:"none"}}/>}
                autoHeight 
                autoHeightMin={window.innerHeight - 150 }
            >
                <Grid container spacing={6} alignItems="center">
                    <Grid item xs={6}>
                        <img
                            className={classes.media}
                            alt=""
                            src={`${character.thumbnail && character.thumbnail.path}.${character.thumbnail && character.thumbnail.extension}`}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        {
                            !isEdit ?
                            <>
                                <Typography variant="h3">{character.name}</Typography>
                                <Typography variant="subtitle1">{character.description}</Typography>
                            </>
                            :
                            <>
                                <TextField 
                                    label="Nome" 
                                    fullWidth 
                                    onChange={(evt) => setTmpName(evt.target.value)} 
                                    defaultValue={character.name} 
                                />
                                <TextField 
                                    label="Descrição" 
                                    fullWidth onChange={(evt) => setTmpDesc(evt.target.value)} 
                                    defaultValue={character.description} 
                                    multiline
                                /> 
                            </>
                        }
                        
                        <Divider />
                        <Typography variant="h6">Series:</Typography>
                        {
                            character.series && 
                                character.series.items.map((serie, k) => 
                                    <Chip key={k} label={serie.name} className={classes.chip}  />
                                )
                        }
                    </Grid>
                </Grid>
            </Scrollbars>
        </Container>
    )
}

export default Character