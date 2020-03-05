import React, { useEffect, useState } from 'react'
import { Container, CardHeader, Grid, Card, makeStyles, Typography, CardActionArea, TextField, Button, Chip } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { Scrollbars } from 'react-custom-scrollbars'
import { connect } from 'react-redux'
import { charactersRequest, searchCharactersRequest, clearSearch } from '../../core/store/actions/characters.action'


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

function Main(props) {
    const classes = useStyles()
    //const [ characters, setCharacters ] = useState([])
    const [ offset, setOffset ] = useState(0)
    //const [ size, setSize ] = useState(0)
    const [ search, setSearch ] = useState('')
    const [ term, setTerm ] = useState()
    const history = useHistory()
    const { characters } = props 

    function searchData () {
        props.searchCharactersRequest(0, search, 100)
        setTerm(search)
    }
    useEffect(() => {
        props.charactersRequest(offset)
    }, [ offset && term ])

    function handleScroll(values){
        const { scrollTop, scrollHeight, clientHeight } = values  
        if(scrollTop + clientHeight === scrollHeight && !term) {
            setOffset(offset + 20)
        }
    }

    function clearSearch () {
        props.clearSearch()
        setTerm()
        setTimeout(() => {
            if(offset === 0){
                props.charactersRequest(offset)
            }
            else {
                setOffset(0)
            }
        }, 500)
    }
    return (
        <Container>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={3}>
                    <Typography className={classes.title}>PERSONAGENS</Typography>
                </Grid>
                <Grid item xs={7}>
                    <TextField
                        label="Encontrar Personagem"
                        fullWidth
                        onChange={(evt) => setSearch(evt.target.value)}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Button 
                        color="primary" 
                        variant="contained" 
                        fullWidth 
                        onClick={searchData}
                        disabled={!search}
                    >Pesquisar</Button>
                </Grid>
            </Grid>
            <Scrollbars
                renderTrackHorizontal={props => <div {...props} className="track-horizontal" style={{display:"none"}}/>}
                renderThumbHorizontal={props => <div {...props} className="thumb-horizontal" style={{display:"none"}}/>}
                autoHeight 
                autoHeightMin={window.innerHeight - 180 }
                onScrollFrame={handleScroll}
            >
                <Grid container spacing={2} alignItems="stretch">
                    <Grid item xs={12}>
                        {
                            term && 
                            <>
                                <Typography>Termo pesquisado:</Typography>
                                <Chip label={term} onDelete={clearSearch}/>
                            </>
                        }
                    </Grid>
                    {
                        characters && characters.map((item, k) => 
                            <Grid item xs={3} key={k}>
                                <Card className={classes.card}>
                                    <CardActionArea onClick={() => history.push(`/character/${item.id}`)}>
                                    <CardHeader
                                        subheader={item.name}
                                    />
                                    <div>
                                        <img
                                            className={classes.media}
                                            alt=""
                                            src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                                        />
                                    </div>
                                    </CardActionArea>
                                </Card> 
                            </Grid>
                        )
                    }
                </Grid>
            </Scrollbars>
        </Container>
    )
}

const mapStateToProps = (state) => ({
    characters: state.characters.characters
})

const mapDispatchToProps = (dispatch) => {
    return {
        charactersRequest: (offset, nameStartsWith, limit) => {
            dispatch(charactersRequest(offset, nameStartsWith, limit))
        },
        searchCharactersRequest: (offset, nameStartsWith, limit) => {
            dispatch(searchCharactersRequest(offset, nameStartsWith, limit))
        },
        clearSearch: () => {
            dispatch(clearSearch())
        }
    }
}

const ConnectedMain = connect(mapStateToProps, mapDispatchToProps)(Main)

export default ConnectedMain
