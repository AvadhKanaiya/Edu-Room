import React from 'react'
import { useLocalContext } from '../context/context'
import { Avatar, Button, Dialog, Slide, TextField } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import './style.css'
import { useState } from 'react'
import db from '../../lib/firebase'
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />
})

const JoinClass = () => {
    const { joinClassDialog, setJoinClassDialog, loggedInUser, logout } = useLocalContext()
    const [classCode, setClassCode] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState()
    const [joinedData, setJoinedData] = useState()
    const [classExists, setClassExists] = useState(false)

    const handleJoinSubmit = (e) => {
        e.preventDefault()
        db.collection('CreatedClasses')
            .doc(email)
            .collection('classes')
            .doc(classCode)
            .get().then((doc) => {
                if (doc.exists && doc.owner !== loggedInUser.email) {
                    setClassExists(true)
                    setJoinedData(doc.data())
                    setError(false)
                } else {
                    setError(true)
                    setClassExists(false)
                    return
                }
            })

        if (classExists === true) {
            db.collection('JoinedClasses')
                .doc(loggedInUser.email).collection('classes')
                .doc(classCode).set({
                    joinedData
                }).then(() => {
                    setJoinClassDialog(false)
                })
        }
    }
    return (
        <div>
            <Dialog fullScreen open={joinClassDialog} onClose={() => setJoinClassDialog(false)} TransitionComponent={Transition}>
                <div className='joinClass'>
                    <div className='joinClass__wrapper'>
                        <div className='joinClass__wrapper2' onClick={() => setJoinClassDialog(false)}>
                            <Close className='joinClass__svg' />
                            <div className='joinClass__topHead'>
                                Join Class
                            </div>
                        </div>
                        <Button className='joinClass__btn' variant='contained' color='primary' onClick={handleJoinSubmit}>Join</Button>
                    </div>
                    <div className='joinClass__form'>
                        <p className='joinClass__formText' style={{ fontWeight: 'bold' }}>
                            You are currently signed in as {loggedInUser.email}
                        </p>
                        <div className='joinClass__loginInfo'>
                            <div className='joinClass__classLeft'>
                                <Avatar src={loggedInUser.photoURL} />
                                <div className='joinClass__loginText'>
                                    <div className='joinClass__loginName'>{loggedInUser.displayName}</div>
                                    <div className='joinClass__loginEmail'>{loggedInUser.email}</div>
                                </div>
                            </div>
                            <Button variant='outlined' color='primary' onClick={() => logout()}>Logout</Button>
                        </div>
                    </div>
                    <div className='joinClass__form'>
                        <div style={{ fontSize: '1.25rem', color: '#3c4043' }} className='joinClass__formText'>
                            class code
                        </div>
                        <div className='joinClass__formText' style={{ color: '#3c4043', marginTop: '-5px' }}>
                            Ask your teacher for the class code, then enter it here.
                        </div>
                        <div className='joinClass__loginInfo'>
                            <TextField id='outlined-basic' label='Class Code' variant='outlined' value={classCode} onChange={(e) => setClassCode(e.target.value)} error={error} helperText={error && 'Class not found'} />
                            <TextField id='outlined-basic' label="Owner's emial" variant='outlined' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export default JoinClass