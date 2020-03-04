import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Container, CardHeader, Grid, Card, makeStyles, Typography, CardActionArea } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { Characters } from '../../core/services/characters.service'
import { Scrollbars } from 'react-custom-scrollbars'


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
    const [ characters, setCharacters ] = useState([])
    const [ offset, setOffset ] = useState(0)
    const [ size, setSize ] = useState(0)
    const history = useHistory()
    async function fetchData () {
        const response = await Characters(offset)
        setCharacters([
            ...characters,
            ...response.data.data.results
        ])
        setSize(response.data.data.total)
    }
    useEffect(() => {
        fetchData()
    }, [offset])

    function handleScroll(values){
        const { scrollTop, scrollHeight, clientHeight } = values  
        if(scrollTop + clientHeight == scrollHeight && offset < size) {
            setOffset(offset + 20)
        }
    }
    return (
        <Container>
            <Typography className={classes.title}>PERSONAGENS</Typography>
                <Scrollbars
                    renderTrackHorizontal={props => <div {...props} className="track-horizontal" style={{display:"none"}}/>}
                    renderThumbHorizontal={props => <div {...props} className="thumb-horizontal" style={{display:"none"}}/>}
                    autoHeight 
                    autoHeightMin={window.innerHeight - 160 }
                    onScrollFrame={handleScroll}
                >
                    <Grid container spacing={2} alignItems="stretch">
                        {
                            characters && characters.map(item => 
                                <Grid item xs={3}>
                                    <Card className={classes.card}>
                                        <CardActionArea onClick={() => history.push(`/character/${item.id}`)}>
                                        <CardHeader
                                            subheader={item.name}
                                        />
                                        <div>
                                            <img
                                                className={classes.media}
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

export default Main
