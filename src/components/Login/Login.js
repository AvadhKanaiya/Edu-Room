import React from 'react'
import logo from '../../assets/logo7.png'
import { Button, Typography } from '@material-ui/core'
import './style.css'
import { useLocalContext } from '../context/context'
const Login = () => {
    const { login, loggedInUser } = useLocalContext()
    console.log(loggedInUser)
    return (
        <div className='login'>
            <Typography variant="h6" style={{ fontSize: '50px', marginBottom: '20px' }}>
                EDU Room - Charusat
            </Typography>
            <Button variant='contained' color='primary' onClick={() => login()}>LogIn Now</Button>
        </div>
    )
}

export default Login