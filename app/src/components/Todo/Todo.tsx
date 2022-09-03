import { memo, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userStore } from '../../redux/selectors'
import UserSlice from '../ForUsers/UserSlice'
import FlashSlice from '../Flash/FlashSlice'

import { v4 as uuidv4 } from 'uuid'

import { Container, Form } from 'react-bootstrap'
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';

import Column from './Column'
import AddButton from './AddButton'
import GoBack from './GoBack'

import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'

import clsx from 'clsx'

function Todo() {
    const [respon, setRespon] = useState(()=>{
        if(window.innerWidth < 500)
        {
            return true;
        }
        else
            return false
    }) 
    const user = useSelector(userStore)
    const dispatch = useDispatch()

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [columnColor, setColumnColor] = useState("#87ceeb")
    const [columnTopic, setColumnTopic] = useState('')

    function handleAddColumn()
    {
        if(columnTopic!=="")
        {
            dispatch(UserSlice.actions.handleAddColumn({user, columnColor, columnTopic}))
            setColumnTopic("")
            handleClose()
        }
    }

    function handleDragEnd(result:any)
    {
        const {destination, source, draggableId, type} = result
        if(!destination)
            return
        if(destination.droppableId === source.droppableId && destination.index === source.index)
            return
        //////////////////////////////////// draging task 
        if(type==="task")
        if(destination.droppableId === source.droppableId)
        {
            let sourceColumn:any
            let currentTaskList
            let dragingTask
            user.mainData.columns.map((column1:any)=>{
                if(column1._id === source.droppableId) 
                sourceColumn = column1
            })
            currentTaskList = JSON.parse(JSON.stringify(sourceColumn!.taskLists ))
            currentTaskList.map((task:any)=>{if(task._id === draggableId) {dragingTask=task;}})
            currentTaskList.splice(source.index,1)
            currentTaskList.splice(destination.index, 0, dragingTask)
            dispatch(UserSlice.actions.handleChangeOrderTaskInOneColumn({user, columnId:source.droppableId, currentTaskList}))
        }
        else
        {
            let sourceColumn:any
            let currentTaskList
            let destinationColumn:any
            let destinationTaskList
            let dragingTask
            user.mainData.columns.map((column1:any)=>{
                if(column1._id === source.droppableId) 
                sourceColumn = column1
                if(column1._id === destination.droppableId)
                destinationColumn = column1
            })
            currentTaskList = JSON.parse(JSON.stringify(sourceColumn!.taskLists ))
            currentTaskList.map((task:any)=>{if(task._id === draggableId) {dragingTask=task;}})
            currentTaskList.splice(source.index,1)

            destinationTaskList = JSON.parse(JSON.stringify(destinationColumn!.taskLists ))
            destinationTaskList.splice(destination.index, 0, dragingTask)

            dispatch(UserSlice.actions.handleChangeOrderTaskInTwoColumn({user, oldColumnId:source.droppableId,
                newColumnId:destination.droppableId, oldTaskList:currentTaskList, newTaskList:destinationTaskList}))
        }

        // Draging column
        if(type==="column")
        {
        let sourceColumn
        user.mainData.columns.map((column:any)=>{
            if(column._id === draggableId) 
            sourceColumn=column
        })
        let newColumns = JSON.parse(JSON.stringify(user.mainData.columns))
        newColumns.splice(source.index,1)
        newColumns.splice(destination.index, 0, sourceColumn)
        dispatch(UserSlice.actions.handleChangeOrderColumn({user, newColumns}))
        }
    }

    useEffect(()=>{
        dispatch(FlashSlice.actions.handleOpen({content:"Hold 5s on the list or task to move it", status:"success"}))
        function handleResize()
        {
            if(window.innerWidth < 500)
            {
                setRespon(true);
            }
            else
            setRespon(false);

        }
        window.addEventListener('resize',handleResize)
        return () => {
            window.removeEventListener('resize',handleResize)
        }
    },[])
    return (
        <>
            {
                <Container className="w-100 h-100 position-relative"  fluid>

                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId={uuidv4()} direction={!respon ? "horizontal":'vertical'} type="column">
                            {
                                (provided) => (
                                <Container ref={provided.innerRef}
                                {...provided.droppableProps} 
                                className={clsx("d-flex flex-wrap", {
                                    'flex-column align-items-center':respon
                                })}>


                                    {
                                        user.mainData.columns.length === 0 ?
                                        <h2>Nothing</h2> :
                                    user.mainData.columns.map((item: any, index:number) => {
                                        return (


                                                            <Column column={item} key={uuidv4()} index={index} />

                                        )
                                    })}


                                {provided.placeholder}
                                </Container>
                                )
                            }

                        </Droppable>


                    </DragDropContext>
                    
                    <GoBack></GoBack>
                    <AddButton main offcanvasShow={handleShow} />

                    <Offcanvas show={show} onHide={handleClose} placement='end' name='end'>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Add new todolist</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                        <Form onSubmit={(e)=>{e.preventDefault();}}>
                                <Form.Group className="mb-3" controlId="formColumn">
                                    <Form.Label>Todolist's topic:</Form.Label>
                                    <Form.Control value={columnTopic} onChange={(e)=>{setColumnTopic(e.target.value)}} type="text" placeholder="Enter Todolist's topic" />
                                    <br></br>
                                    <Form.Label>Todolist's color:</Form.Label>
                                    <Form.Control
                                    type="color"
                                    defaultValue={columnColor}
                                    title="Choose your color"
                                    onChange={(e)=>{setColumnColor(e.target.value)}}
                                    />
                                </Form.Group>
                                <Button onClick={()=>{handleAddColumn()}} variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Offcanvas.Body>
                    </Offcanvas>



                </Container>
            }
        </>
    )
}

export default memo(Todo)