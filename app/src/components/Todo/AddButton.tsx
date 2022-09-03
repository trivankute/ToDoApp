import {memo} from 'react'
import clsx from 'clsx'
import styles from './Todo.module.css'

function AddButton({offcanvasShow, main}:{offcanvasShow:any, main:boolean})
{
    return (
        <div className={clsx("position-fixed d-flex justify-content-center align-items-center bg-primary"
        ,styles.AddButton, {
            'bg-success':main
        })} onClick ={offcanvasShow}>
                <span style={{fontSize:40,color:"white", fontWeight:600}}>
                    +    
                </span>   
        </div>
    )
}

export default memo(AddButton)