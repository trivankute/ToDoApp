import { memo } from "react";

import {Button} from 'react-bootstrap'

import {useDispatch} from 'react-redux'
import UserSlice from './UserSlice'
import FlashSlice from '../Flash/FlashSlice'

import {useNavigate} from 'react-router-dom'
function Logout()
{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = () => {
        dispatch(UserSlice.actions.handleLogout(""))
        localStorage.removeItem('todoapp');
        navigate('/')
        dispatch(FlashSlice.actions.handleOpen({content:"Congratulations! Logged out successfully", status:"success"}))
    }
    return (
        <Button variant='danger' onClick={handleLogout}>Log out</Button>
    )
}

export default memo(Logout)