import {memo} from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'

import clsx from 'clsx'
import styles from './Todo.module.css'

import {useNavigate} from 'react-router-dom'

function GoBack()
{
    const navigate = useNavigate()
    return (
        <>
        <div className={clsx(styles.GoBack, "bg-secondary",{
        })}
        style={{cursor:'pointer', position:'fixed'
        , width:200, height:50,
        borderBottomLeftRadius:8, borderTopLeftRadius:8}}
        >
            <FontAwesomeIcon  icon={faArrowLeft as IconProp} 
            style={{marginRight:15, marginLeft:15,color:'white', width:25, height:40 }}
            />
            <div onClick = {()=>{navigate('/')}} style={{width:200, display:'block', paddingRight:15, fontSize:18, color:'white',
        fontWeight:600, opacity:0.8}}>
                Go back home
            </div>
        </div>
        </>
    )
}

export default memo(GoBack)