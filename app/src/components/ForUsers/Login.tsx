import { memo,useState } from "react";


import {Card, Form, Button} from 'react-bootstrap'


import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import FlashSlice from '../Flash/FlashSlice'
import UserSlice from '../ForUsers/UserSlice'

import axios from 'axios'
import url from '../../serverUrl'

function Login()
{
    const dispatch = useDispatch()
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()
    const handleLogin = async () => {
        try{
            await axios.post(`${url}login`,{username:username,password:password},{withCredentials: true})
            .then((res)=>{
                if(res.data.state==="success")
                {
                dispatch(FlashSlice.actions.handleOpen({content:"Congratulations! Logged in successfully", status:"success"}))
                // setUser(res.data.user)
                dispatch(UserSlice.actions.handleLogin(res.data.user))
                localStorage.setItem('todoapp',res.data.user._id)
                setUsername("")
                setPassword("")
                navigate('/')    
                }
                else
                {
                    dispatch(FlashSlice.actions.handleOpen({content:res.data.message, status:"danger"}))
                    setPassword("")
                }
            })
        }
        catch(e)
        {
            dispatch(FlashSlice.actions.handleOpen({content:"Username or password was not correct.", status:"danger"}))
            setPassword("")
        }
    }
    const [validated, setValidated] = useState(false);

        const handleSubmit = (event:any) => {
          const form = event.currentTarget;
          event.preventDefault();
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
      
          setValidated(true);
        };
    return (

        <Card style={{ width: '18rem' }}>
        <Card.Body >
            <Card.Title className="text-center">
                Login form
            </Card.Title>
            <Form noValidate validated={validated} onSubmit={handleSubmit} className="w-100 d-flex flex-column align-items-center">
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username:</Form.Label>
                <Form.Control required type="username" placeholder="Enter username" value={username} onChange={(e)=>{setUsername(e.target.value)}} />
                <Form.Control.Feedback>OK!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                Please choose a username.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control required type="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                <Form.Control.Feedback>OK!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                Please choose a password.
                </Form.Control.Feedback>
            </Form.Group>
            <div className='w-100 d-flex justify-content-between'>
            <Button variant="primary" type="submit" onClick={handleLogin}>
                Submit
            </Button>
            <Button variant="secondary" type="submit" onClick={()=>{navigate('/')}}>
                Back
            </Button>
            </div>
            </Form>
        </Card.Body>
        </Card>
    )
}

export default memo(Login)