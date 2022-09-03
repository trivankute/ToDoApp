import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

import axios from 'axios'

import url from '../../serverUrl'

import {v4} from 'uuid'
const UserSlice = createSlice({
    name:"UserSlice",
    initialState:{
        loading:false,
        mainData:""
    },
    reducers:{
        handleLogin: (state,action) => {
            state.mainData = action.payload
        },
        handleRegister: (state,action) => {
            state.mainData = action.payload
        },
        handleLogout: (state,action) => {
            state.mainData = action.payload
        },
        handleAddTodo: (state,action) => {
            const {user, columnId,taskTopic,taskContent,taskTopicColor,taskContentColor} = action.payload
            const newUser = JSON.parse(JSON.stringify(user))
            const newId = v4()
            newUser.mainData.columns.map((item:any)=>{
                if(columnId===item._id)
                {
                    item.taskLists.push(
                        {
                        topic:taskTopic,
                        content:taskContent,
                        topicColor:taskTopicColor,
                        contentColor:taskContentColor,
                        _id:newId
                        }
                    )
                }
            })
            state.mainData = newUser.mainData
            axios.post(`${url}todos/updateTodo`, {userId:user.mainData._id, newColumns:newUser.mainData.columns}, { withCredentials: true})
        },
        handleDeleteTodo: (state,action) => {
            const {user, columnId, taskId} = action.payload
            const newUser = JSON.parse(JSON.stringify(user))
            newUser.mainData.columns.map((item:any)=>{
                if(columnId===item._id)
                {
                    item.taskLists = item.taskLists.filter((item1:any)=> item1._id !== taskId)
                }
            })
            state.mainData = newUser.mainData
            axios.post(`${url}todos/updateTodo`, {userId:user.mainData._id, newColumns:newUser.mainData.columns}, { withCredentials: true})
        },
        handleAddColumn: (state,action) => {
            const {user, columnColor, columnTopic} = action.payload
            const newUser = JSON.parse(JSON.stringify(user))
            const newId = v4()
            newUser.mainData.columns.push({
                columnColor: columnColor,
                taskLists: [],
                topic: columnTopic,
                _id: newId
            }
            )
            state.mainData = newUser.mainData
            axios.post(`${url}todos/updateTodo`, {userId:user.mainData._id, newColumns:newUser.mainData.columns}, { withCredentials: true})
        },
        handleDeleteColumn: (state,action)=>{
            const {user, columnId} = action.payload
            const newUser = JSON.parse(JSON.stringify(user))
            newUser.mainData.columns = newUser.mainData.columns.filter((item:any)=>item._id!==columnId)
            state.mainData = newUser.mainData
            axios.post(`${url}todos/updateTodo`, {userId:user.mainData._id, newColumns:newUser.mainData.columns}, { withCredentials: true})
        },
        handleChangeOrderTaskInOneColumn: (state,action)=>{
            const {user, columnId, currentTaskList} = action.payload
            const newUser = JSON.parse(JSON.stringify(user))
            newUser.mainData.columns.map((item:any)=>{
                if(item._id===columnId)
                item.taskLists = currentTaskList
            })
            state.mainData = newUser.mainData
            axios.post(`${url}todos/updateTodo`, {userId:user.mainData._id, newColumns:newUser.mainData.columns}, { withCredentials: true})
        },
        handleChangeOrderColumn: (state,action)=>{
            const {user, newColumns} = action.payload
            const newUser = JSON.parse(JSON.stringify(user))
            newUser.mainData.columns = newColumns
            state.mainData = newUser.mainData
            axios.post(`${url}todos/updateTodo`, {userId:user.mainData._id, newColumns}, { withCredentials: true})
        },
        handleChangeOrderTaskInTwoColumn: (state,action)=>{
            const {user, oldColumnId,newColumnId, oldTaskList, newTaskList} = action.payload
            const newUser = JSON.parse(JSON.stringify(user))
            newUser.mainData.columns.map((item:any)=>{
                if(item._id===oldColumnId)
                item.taskLists = oldTaskList
                if(item._id===newColumnId)
                item.taskLists = newTaskList
            })
            state.mainData = newUser.mainData
            axios.post(`${url}todos/updateTodo`, {userId:user.mainData._id, newColumns:newUser.mainData.columns}, { withCredentials: true})
        },
        handleUpdateColumn: (state,action)=>{
            const {user, columnId, newTopic, newColor} = action.payload
            const newUser = JSON.parse(JSON.stringify(user))
            newUser.mainData.columns.map((item:any)=>{
                if(item._id===columnId)
                {
                    item.topic = newTopic
                    item.columnColor = newColor
                }
            })
            state.mainData = newUser.mainData
            axios.post(`${url}todos/updateTodo`, {userId:user.mainData._id, newColumns:newUser.mainData.columns}, { withCredentials: true})
        },
        handleUpdateTask: (state,action)=>{
            const {user, columnId,taskId, newTaskTopic, newTaskContent, newTopicColor, newContentColor} = action.payload
            const newUser = JSON.parse(JSON.stringify(user))
            newUser.mainData.columns.map((item:any)=>{
                if(item._id===columnId)
                {
                    item.taskLists.map((task:any)=>{
                        if(task._id === taskId)
                        {
                            task.topic = newTaskTopic
                            task.content = newTaskContent
                            task.topicColor = newTopicColor
                            task.contentColor = newContentColor
                        }
                    })
                }
            })
            state.mainData = newUser.mainData
            axios.post(`${url}todos/updateTodo`, {userId:user.mainData._id, newColumns:newUser.mainData.columns}, { withCredentials: true})
        },
        handleUserIfNoLocalStorage: (state, action) => {
            state.mainData = ""
        }
    }
    ,
    extraReducers(builder) {
        builder
        .addCase(axiosGetUser.pending,(state,action) => {
            state.loading = true
        } )
        .addCase(axiosGetUser.fulfilled, (state,action) => {
            state.loading = false
            const {user} = action.payload.data
            state.mainData = user
        })
    },
})

export const axiosGetUser = createAsyncThunk('axiosGetUser', async (userId:String) => {
    const res = await axios.post(url, {id:userId}, { withCredentials: true})
    return res
})


export default UserSlice