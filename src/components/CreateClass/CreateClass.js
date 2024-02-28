import { Button, Checkbox, Dialog, DialogActions, DialogContent } from '@material-ui/core'
import { useLocalContext } from '../context/context'
import { useState } from 'react'
import './style.css'
import Form from './Form'

const CreateClass = () => {
    const { createClassDialog, setCreateClassDialog } = useLocalContext()
    const [check, setChecked] = useState(false)
    const [showForm, setShowForm] = useState(false)
    return (
        <>
            {createClassDialog && (
                <div>
                    <Dialog
                        onClose={() => setCreateClassDialog(false)}
                        aria-labelledby='customized-dialog-title'
                        open={createClassDialog}
                        maxWidth={showForm ? 'lg' : 'xs'}
                    >
                        {showForm ? (
                            <Form />
                        ) : (
                            <>
                                <div className='class__title'>
                                    Using Edu Event Room at a college with studnts?
                                </div>
                                <DialogContent className='class__content'>
                                    <p className='class__text'>
                                        <p>If so ,your college must sign up for a free</p>
                                        <a href='/help' className='class__link'>G suite for education</a>
                                        account before you can use Edu Event Room
                                        <a href='/learn' className='class__link2'>Learn More..</a>
                                    </p>
                                    <p>
                                        G suite for Education lets colleges decide which service their student can use, and provides additional
                                        <a href='privacy' className='class__link2 class__link'>Privacy And Security</a>
                                        Protection that are important in a college setting. Students cannot use Edu Event Room at a school with personal accounts.
                                    </p>
                                    <div className='class__checkboxWrapper'>
                                        <Checkbox color='primary' onChange={() => setChecked(!check)} ></Checkbox>
                                        <p>I've read and understood the above notice, and I'm not using Edu Event Room at college with students</p>
                                    </div>
                                </DialogContent>
                                <DialogActions>
                                    <Button autoFocus onClick={() => setCreateClassDialog(false)}>Close</Button>

                                    <Button autoFocus color='primary' disabled={!check} onClick={() => setShowForm(true)}>Continue</Button>
                                </DialogActions>
                            </>
                        )}

                    </Dialog>
                </div>
            )}

        </>
    )
}

export default CreateClass