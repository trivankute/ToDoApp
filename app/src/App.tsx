import {Routes, Route} from 'react-router-dom'
import {Container} from 'react-bootstrap'

import Login from './components/ForUsers/Login'
import Register from './components/ForUsers/Register'
import Logout from './components/ForUsers/Logout'
import Home from './components/Home/Home'
import Flash from './components/Flash/Flash'
import Todo from './components/Todo/Todo'
import GetUser from './components/GetUser/GetUser'
import Error from './components/Error/Error'
import Loading from './components/Loading/Loading'

import {userStore} from './redux/selectors'
import {useSelector} from 'react-redux'

function App() {
  const user = useSelector(userStore)
  return (
    <Container fluid className="d-flex justify-content-center align-items-center" style={{backgroundColor: '#4c9aff', minHeight:'100vh'}}>
      <Flash></Flash>
      <Routes>
        <Route path='/' element={<GetUser/>}>
        {
          user.mainData ?
          <>
            <Route index element={<Home/>}/>
            <Route path='/logout' element={<Logout/>}/>
            <Route path='/todo' element={<Todo/>}/>
          </>
          :
          localStorage.getItem('todoapp') ?
          <>
            <Route index element={<Loading/>}/>
            <Route path='/logout' element={<Loading/>}/>
            <Route path='/todo' element={<Loading/>}/>
          </> 
          :
          <>
            <Route index element={<Home/>}/>
          </>
        }
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/*' element={<Error/>}/>
        </Route>
      </Routes>
    </Container>
  );
}

export default App;
