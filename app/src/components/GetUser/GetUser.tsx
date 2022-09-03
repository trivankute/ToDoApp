import {memo, useEffect} from 'react'
import {Outlet} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import UserSlice,{axiosGetUser} from '../ForUsers/UserSlice'

function GetUser()
{
    const dispatch = useDispatch<any>()
    useEffect(()=>{
        if(localStorage.getItem('todoapp'))
        dispatch(axiosGetUser(localStorage.getItem('todoapp')|| ""))
        else
        dispatch(UserSlice.actions.handleUserIfNoLocalStorage(""))

    },[])
    return (
        <>
            <Outlet/>
        </>
    )
}   

export default memo(GetUser)