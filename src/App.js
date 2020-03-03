import React from 'react'
import './App.css'
import routes from './core/routes'
import { Switch, Route } from 'react-router-dom'
import Header from './components/header'
import { MuiThemeProvider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import muiTheme from './components/theme/muiTheme'

const useStyles = makeStyles({
  page: {
    paddingTop: '52px'
  }
})

function App() {
  const classes = useStyles()
  return (
    <MuiThemeProvider theme={muiTheme}>
      <Header />
      <div className={classes.page}>
        <Switch>
          {
            routes.map((route, k) => (
              <Route key={k} {...route}/>
            ))
          }
        </Switch>
      </div>
    </MuiThemeProvider>
  )
}

export default App
