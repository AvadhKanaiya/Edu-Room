import { Button, DialogActions, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { useLocalContext } from '../context/context'
import { v4 as uuidV4 } from 'uuid'
import db from '../../lib/firebase'

const Form = () => {
    const [className, setClassName] = useState('')
    const [section, setSection] = useState('')
    const [room, setRoom] = useState('')
    const [subject, setSubject] = useState('')

    const { loggedInMail, setCreateClassDialog } = useLocalContext()
    const addClass = (e) => {
        e.preventDefault()
        const id = uuidV4()
        db.collection('CreatedClasses')
            .doc(loggedInMail)
            .collection('classes')
            .doc(id).set({
                owner: loggedInMail,
                className: className,
                section: section,
                room: room,
                subject: subject,
                id: id
            }).then(() => {
                setCreateClassDialog(false)
            })
    }
    return (
        <div className='form'>
            <p className='class__title'>Create Class</p>
            <div className='form__inputs'>
                <TextField id='filled-basic' label="Class Name(required)" className='form__input' variant='filled' value={className} onChange={(e) => setClassName(e.target.value)}></TextField>
                <TextField id='filled-basic' label="Section" className='form__input' variant='filled' value={section} onChange={(e) => setSection(e.target.value)}></TextField>
                <TextField id='filled-basic' label="Subject" className='form__input' variant='filled' value={subject} onChange={(e) => setSubject(e.target.value)}></TextField>
                <TextField id='filled-basic' label="Room" className='form__input' variant='filled' value={room} onChange={(e) => setRoom(e.target.value)}></TextField>
            </div>
            <DialogActions>
                <Button color='primary' onClick={addClass}>Create</Button>
            </DialogActions>
        </div>
    )
}

export default Form