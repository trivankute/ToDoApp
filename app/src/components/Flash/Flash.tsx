import {useContext, useState} from 'react'
import {Toast} from 'react-bootstrap'
import {flashStore} from '../../redux/selectors'
import {useDispatch, useSelector} from 'react-redux'
import FlashSlice from './FlashSlice'

export default function FlashBox()
{
    const dispatch = useDispatch()
    const flash = useSelector(flashStore)
    return (
        <>
        {flash.flashOpen && 
        <div style={{display:'flex', justifyContent: 'center', position:'absolute',
        zIndex:"2", top:'10px', left:'50%', transform:'translateX(-50%)'}}>

        <Toast onClose = {()=>{dispatch(FlashSlice.actions.handleClose("nothing"))}}
          className="d-inline-block m-1"
          bg={flash.flashStatus}
          style={{maxWidth:350, filter:"brightness(1.4)"}}
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Flash</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>
            {flash.flashContent}
          </Toast.Body>
        </Toast>
       </div>
        }

        </>
    )
}