import {createSlice} from '@reduxjs/toolkit'

const FlashSlice = createSlice({
    name:"FlashSlice",
    initialState:{
        flashOpen:false,
        flashContent:"",
        flashStatus:"success"
    },
    reducers:{
        handleOpen: (state, action) => {
            const {content, status} = action.payload
            state.flashOpen = true
            state.flashContent = content
            state.flashStatus = status
        },
        handleClose: (state, action) => {
            state.flashOpen = false
        }
    }
})

export default FlashSlice