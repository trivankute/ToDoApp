import {memo,useState} from 'react'
import CloseButton from 'react-bootstrap/CloseButton';
import styles from './Todo.module.css'
import Task from './Task'
import clsx from 'clsx'
import {v4} from 'uuid'

import { Modal, Form, Button, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import UserSlice from '../ForUsers/UserSlice'
import { userStore } from '../../redux/selectors'

import { Droppable, Draggable} from 'react-beautiful-dnd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {faWrench, faArrowsUpDown} from '@fortawesome/free-solid-svg-icons'

function Column({column, index}:{column:any, index:number})
{
    const dispatch = useDispatch<any>()
    const user = useSelector(userStore)
    const [taskTopicColor, setTaskTopicColor] = useState("#87ceeb")
    const [taskContentColor, setTaskContentColor] = useState("#87ceeb")
    const [taskTopic, setTaskTopic] = useState('')
    const [taskContent, setTaskContent] = useState('')

    
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);

    
    function handleSubmitTask()
    {
        if(taskTopic !== "" && taskContent !== "")
        {
            dispatch(UserSlice.actions.handleAddTodo({taskTopicColor,taskContentColor,taskTopic,taskContent,user,columnId:column._id}))
            setTaskTopic("")
            setTaskContent("")
        }
    }

    function handleDeleteColumn()
    {
        dispatch(UserSlice.actions.handleDeleteColumn({user, columnId:column._id}))
    }

    
    const [showUpdateColumnModal, setShowUpdateColumnModal] = useState(false);
    const handleCloseUpdateColumnModal = () => setShowUpdateColumnModal(false);
    const [forUpdateTopic, setForUpdateTopic] = useState(column.topic)
    const [forUpdateColor, setForUpdateColor] = useState(column.columnColor)
    function handleUpdateTodolist()
    {
        dispatch(UserSlice.actions.handleUpdateColumn({user, columnId:column._id, newTopic:forUpdateTopic, newColor:forUpdateColor}))
    }

    const [expand, setExpand] = useState(true)


    return (
        <>
            

            <Draggable key={column._id} draggableId={column._id} index={index}>
                                {
                                    (provided, snapshot)=>(
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps} 
                                            {...provided.dragHandleProps}>

            <Modal show={showModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add new task</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={(e)=>{e.preventDefault()}}>
                                <Form.Group className="mb-3" controlId="formBasicEmail2">
                                    <Form.Label>Task's topic:</Form.Label>
                                    <Form.Control value={taskTopic} onChange={(e)=>{setTaskTopic(e.target.value)}} type="text" placeholder="Enter Task's topic" />
                                    <br></br>
                                    <Form.Label>Task's topic color:</Form.Label>
                                    <Form.Control
                                    type="color"
                                    // id="exampleColorInput"
                                    defaultValue={taskTopicColor}
                                    title="Choose your color"
                                    onChange={(e)=>{setTaskTopicColor(e.target.value)}}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Task's content:</Form.Label>
                                    <Form.Control value={taskContent} onChange={(e)=>{setTaskContent(e.target.value)}} type="text" placeholder="Dontent" />
                                    <br></br>
                                    <Form.Label>Task's content color:</Form.Label>
                                    <Form.Control
                                    type="color"
                                    // id="exampleColorInput"
                                    defaultValue={taskContentColor}
                                    title="Choose your color"
                                    onChange={(e)=>{setTaskContentColor(e.target.value)}}
                                    />
                                </Form.Group>
                                <Button onClick={()=>{handleSubmitTask()}} variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={showUpdateColumnModal} onHide={handleCloseUpdateColumnModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Update TodoList</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={(e)=>{e.preventDefault()}}>
                                <Form.Group className="mb-3" controlId="formBasicEmail2">
                                    <Form.Label>TodoList's topic:</Form.Label>
                                    <Form.Control value={forUpdateTopic} onChange={(e)=>{setForUpdateTopic(e.target.value)}}  type="text"/>
                                    <br></br>
                                    <Form.Label>TodoList's topic color:</Form.Label>
                                    <Form.Control
                                    type="color"
                                    defaultValue={forUpdateColor}
                                    title="Choose your color"
                                    onChange={(e)=>{setForUpdateColor(e.target.value)}}
                                    />
                                </Form.Group>
                                <Button onClick={()=>{handleUpdateTodolist()}} variant="primary" type="submit">
                                    Update
                                </Button>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseUpdateColumnModal}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>

            <div className={clsx(styles.Box,
                "mt-3 ms-3 mb-3 me-3 d-flex flex-column justify-content-center align-items-center", {
                    [styles.container_column_dragging]:snapshot.isDragging
                })}>

                <div className="h-100 w-100" style={{marginLeft:'auto', top:0}}>
                <CloseButton onClick={handleDeleteColumn} />
                <FontAwesomeIcon onClick={()=>{setShowUpdateColumnModal(true)}} className="primary text-primary" icon={faWrench as IconProp} style={{paddingLeft:10,paddingBottom:2, cursor:'pointer'}}/>
                <FontAwesomeIcon onClick={()=>{setExpand(prev=>!prev)}} className="primary text-primary" icon={faArrowsUpDown as IconProp} style={{paddingRight:10,paddingTop:2, cursor:'pointer', float:'right'}}/>
                </div>

                <div className={clsx(styles.Box_topic
                ,"d-flex justify-content-between align-items-center")} style={{backgroundColor:column.columnColor}}>
                    <span 
                className={clsx(styles.Box_topic_content_column, 'w-100 h-100')
                } style={{padding:8,wordWrap:"break-word"}}>Topic: {column.topic}</span>
                </div>

                    <Droppable droppableId={column._id} type="task" >
                        {
                            (provided, snapshot) => (
                                <>
                            <Container
                            ref={provided.innerRef}
                            {...provided.droppableProps} 
                            style={{minHeight:100,}}
                            className={clsx("d-flex flex-column mt-3 mb-3", {
                                [styles.container_task_dropPlace]: snapshot.isDraggingOver,
                                'd-none':!expand
                            })}>

                                {column.taskLists.map((item:any, index:number)=>{
                                    return (
                                                    <Task task={item} index={index} key={v4()} columnId={column._id}/>
                                    )
                                })}

                            {provided.placeholder}
                            </Container>
                                {!expand&&<h5>Click the icon on the top-right to open</h5>}
                                </>
                            )
                        }

                    </Droppable>


                <div className={clsx("d-flex justify-content-center align-items-center bg-primary mt-3"
                    ,styles.AddButton)}>
                <span style={{fontSize:40,color:"white", fontWeight:600, marginBottom:10}} onClick={()=>{setShowModal(true)}}>
                    +    
                </span>   
        </div>
            </div>

            
            </div>
                                                    )
                                                }
                                            </Draggable>
        </>
    )
}

export default memo(Column)