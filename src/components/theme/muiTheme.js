import { createMuiTheme } from '@material-ui/core/styles'

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#202020',
      contrastText: "#fff"
    },
    secondary: {
      // boxHead: '#EDEDED',
      light: '#444854',
      main: '#1B1E24'
    }
  }
})

export default muiTheme
