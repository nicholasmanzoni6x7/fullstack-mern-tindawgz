import React from 'react'
import './Header.css'
import { IconButton } from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person'
import MessageIcon from '@material-ui/icons/Forum'


function Header() {
    return (
        <header className="header">
            <IconButton>
                <PersonIcon fontSize="large" className="header-icon" />
            </IconButton>
            <h2> TINDAWGZ</h2>
            <IconButton>
                <MessageIcon fontSize="large" className="header-icon" />
            </IconButton>
        </header>
    )
};

export default Header;