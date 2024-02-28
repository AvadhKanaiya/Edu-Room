import React from 'react'
import { useStyles } from './style'
import { AppBar, Avatar, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core'
import { Add, Apps } from '@material-ui/icons'
import { BsTelegram } from "react-icons/bs";
import { SiGooglekeep } from "react-icons/si";
import { CreateClass, JoinClass } from '..';
import { useLocalContext } from '../context/context';

const Header = ({ children }) => {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null);
    const { setCreateClassDialog, setJoinClassDialog, loggedInUser, logout } = useLocalContext();
    const handleCreateToggle = () => {
        handleClose()
        setCreateClassDialog(true);
    }
    const handleJoinToggle = () => {
        handleClose()
        setJoinClassDialog(true);
    }
    return (
        < div className={classes.root} >
            <AppBar className={classes.appBar} style={{ backgroundColor: "white", color: "black" }} position="static">
                <Toolbar className={classes.toolbar}>
                    <div className={classes.headerWrapper}>
                        {children}
                        {/* <img
                            src="./assets/logo7.png" width={"150px"} height={"85px"}
                            alt="Classroom"
                        /> */}
                        <Typography variant="h6" className={classes.title}>
                            Edu Room - Charusat
                        </Typography>
                    </div>
                    <div className={classes.header__wrapper__right}>
                        <Add onClick={handleClick} className={classes.icon} />
                        <a href='https://t.me/+_4OPpaYYHWI0ZTA1' style={{ fontSize: '25px', hover: 'color:blue' }} target='_blank' rel="noopener noreferrer"><BsTelegram className={classes.icon} fill='#34ACDE' /></a>
                        <a href='https://keep.google.com/' style={{ fontSize: '25px', hover: 'color:blue' }} target='_blank' rel="noopener noreferrer"><SiGooglekeep className={classes.icon} fill='#F4B400' /></a>
                        <a href='https://charusat.edu.in:912/eGovernance/' style={{ fontSize: '25px', hover: 'color:blue' }} target='_blank' rel="noopener noreferrer"><img src='./assets/charusat.jpg' alt='egovernance' width={'30px'} height={'30px'} className={classes.icon} /></a>
                        {/* <Apps className={classes.icon} /> */}
                        <Menu
                            id='simple-menu'
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleJoinToggle}>Join Class</MenuItem>
                            <MenuItem onClick={handleCreateToggle}>Create Class</MenuItem>
                        </Menu>
                        <div>
                            <Avatar src={loggedInUser?.photoURL} className={classes.icon} onClick={() => logout()} />
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
            <CreateClass />
            <JoinClass />
        </div>
    )
}

export default Header