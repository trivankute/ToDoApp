import { memo } from 'react'
import {useNavigate} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import {useSelector} from 'react-redux'
import {userStore} from '../../redux/selectors'


function Home () {
    const navigate = useNavigate()
    const user = useSelector(userStore)
    return (
        <>
        <div className="d-flex flex-column align-items-center">
        <h1>HOME</h1>   
        {!localStorage.getItem('todoapp')?
        <>
        <Button onClick={ ()=>{navigate('/login'); }} style={{marginBottom:"10px"}}>Login</Button>
        <Button onClick={()=>{navigate('/register')}} className="bg-success">Register</Button>
        </>
        :
        <>
        <h2>Hi {user.mainData.username}</h2>
        <Button onClick={()=>{navigate('/logout')}} className="bg-danger">Logout</Button>
        <Button onClick={()=>{navigate('/todo')}} className="bg-primary mt-3" >Your To do list</Button>
        </>
        }
        </div>
        </>
    )
}

export default memo(Home)