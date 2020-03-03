import React from 'react'

import { AppBar, Toolbar } from '@material-ui/core'
import Logo from '../logo'

const Header = () => {
    return (
        <AppBar>
            <Toolbar variant='dense' style={{ display: 'flex', justifyContent: 'center'}}>
                <Logo />
            </Toolbar> 
        </AppBar>
    )
}

export default Header