import {memo, useState} from 'react'
import CloseButton from 'react-bootstrap/CloseButton';
import clsx from 'clsx'
import styles from './Todo.module.css'
import {useDispatch, useSelector} from 'react-redux'
import UserSlice from '../ForUsers/UserSlice'
import {userStore} from '../../redux/selectors'
import {Modal, Button, Form, Container} from 'react-bootstrap'

import { Draggable} from 'react-beautiful-dnd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {faWrench} from '@fortawesome/free-solid-svg-icons'

function Task({task, index, columnId}:{ task:any,index:number, columnId:String})
{
    const dispatch = useDispatch()
    const user = useSelector(userStore)
    function handleDeleteTask()
    {
        dispatch(UserSlice.actions.handleDeleteTodo({user, columnId, taskId:task._id}))
    }

    const [forUpdateTaskTopic, setForUpdateTaskTopic] = useState(task.topic)
    const [forUpdateTaskContent, setForUpdateTaskContent] = useState(task.content)
    const [forUpdateTopicColor, setForUpdateTopicColor] = useState(task.topicColor)
    const [forUpdateContentColor, setForUpdateContentColor] = useState(task.contentColor)
    
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);
    function handleUpdateTask()
    {
        dispatch(UserSlice.actions.handleUpdateTask({user, columnId, taskId:task._id, newTaskTopic:forUpdateTaskTopic
            , newTaskContent:forUpdateTaskContent, newTopicColor:forUpdateTopicColor, newContentColor:forUpdateContentColor }))
    }
    return (
        <>
        
                <Modal show={showModal} onHide={handleCloseModal}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Update task</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form onSubmit={(e)=>{e.preventDefault()}}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail2">
                                            <Form.Label>Task's topic:</Form.Label>
                                            <Form.Control value={forUpdateTaskTopic} onChange={(e)=>{setForUpdateTaskTopic(e.target.value)}} type="text" />
                                            <br></br>
                                            <Form.Label>Task's topic color:</Form.Label>
                                            <Form.Control
                                            type="color"
                                            // id="exampleColorInput"
                                            defaultValue={forUpdateTopicColor}
                                            title="Choose your color"
                                            onChange={(e)=>{setForUpdateTopicColor(e.target.value)}}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Task's content:</Form.Label>
                                            <Form.Control value={forUpdateTaskContent} onChange={(e)=>{setForUpdateTaskContent(e.target.value)}} type="text" placeholder="Dontent" />
                                            <br></br>
                                            <Form.Label>Task's content color:</Form.Label>
                                            <Form.Control
                                            type="color"
                                            // id="exampleColorInput"
                                            defaultValue={forUpdateContentColor}
                                            title="Choose your color"
                                            onChange={(e)=>{setForUpdateContentColor(e.target.value)}}
                                            />
                                        </Form.Group>
                                        <Button onClick={()=>{handleUpdateTask()}} variant="primary" type="submit">
                                            Update
                                        </Button>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleCloseModal}>
                                        Close
                                    </Button>
                                </Modal.Footer>
                            </Modal>
            <Draggable key={task._id} draggableId={task._id} index={index}>
                {
                    (provided, snapshot) => (
                        <Container
                        {...provided.draggableProps} 
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className={clsx(snapshot.isDragging?styles.container_task_dragging:"", 'mb-3 mt-3')}
                        >
                                        <div className={clsx(styles.Box_topic
                                        ,"d-flex flex-column justify-content-between align-items-center")} >
                                            <div className='w-100 h-100 d-flex justify-content-between align-items-center' style={{backgroundColor:task.topicColor, maxWidth:280}}>
                                                <div className={clsx(styles.Box_topic_content_task,)}
                                                style={{padding:8, maxWidth:200, wordWrap:'break-word'}}>{task.topic}</div>
                                                <div style={{padding:8}} className="d-flex">
                                                <FontAwesomeIcon onClick={()=>{setShowModal(true)}}  className="primary text-primary" icon={faWrench as IconProp} style={{paddingLeft:10,paddingRight:5,paddingTop:3, cursor:'pointer'}}/>
                                                <CloseButton onClick={handleDeleteTask}/>
                                                </div>
                                            </div>

                                            <span className={clsx(styles.Box_topic_content_task,
                                                'w-100 h-100 d-flex justify-content-center align-items-center')
                                                } style={{backgroundColor:task.contentColor, padding:8,maxWidth:300, wordWrap:'break-word'}}>{task.content}</span>

                                           

                                        </div>
                        </Container>
                    )
                }
            </Draggable>
        </>
    )
}

export default memo(Task)