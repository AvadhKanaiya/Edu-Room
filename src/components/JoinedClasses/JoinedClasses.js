import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'
import { Avatar, Button } from '@material-ui/core'
// import { FolderOpen, Style } from '@material-ui/icons'
import { BsWhatsapp } from "react-icons/bs";


const sendClassCode = (classCode) => {
    console.log(classCode);
}
const JoinedClasses = ({ classData }) => {
    return (
        <li className='joined__list'>
            <div className='joined__wrapper'>
                <div className='joined__container'>
                    <div className='joined__imgWrapper' />
                    <div className='joined__image' />
                    <div className='joined__content'>
                        <Link className='joined__title' to={`/${classData.id}`}>
                            <h2>{classData.className}</h2>
                        </Link>
                        <p className='joined__owner'>Created By:</p>
                        <p className='joined__owner'>{classData.owner}</p>
                    </div>
                </div>
                <Avatar className='joined__avatar' src={classData.owner.photourl} />
            </div>
            <div className='joined__bottom'>
                <p style={{ fontSize: '15px', marginTop: '5px', color: 'black', fontWeight: 'bold' }}>Share This Code On:</p>
                <a href={`https://api.whatsapp.com/send?text=Join the class for *${classData.subject}* subject %0A by using the class code: %0A*${classData.id}*`} target='_blank' style={{ textDecoration: 'none', marginTop: '3px', fontSize: '22px' }}><BsWhatsapp fill='#3CCF4E' /></a>
            </div>
        </li >
    )
}

export default JoinedClasses