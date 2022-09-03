import {configureStore} from '@reduxjs/toolkit'

import UserSlice from '../components/ForUsers/UserSlice'
import FlashSlice from '../components/Flash/FlashSlice'

const store = configureStore({
    reducer:{
        user:UserSlice.reducer,
        flash:FlashSlice.reducer
    }
})

export default store