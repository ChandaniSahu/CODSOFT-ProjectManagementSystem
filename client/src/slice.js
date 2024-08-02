

import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    detail : { userID:'' , prjID:''  }

}

const slice = createSlice({
    name : 'Details' ,
    initialState ,
    reducers : {
        addUserID : (state,action) =>{
          state.detail.userID = action.payload ;
        },
        addPrjID : (state,action) =>{
          state.detail.prjID = action.payload ;
        },
        
        flush : (state,action)=>{
          return initialState ;
        },
        
    }
})

export const {addUserID ,addPrjID, flush} = slice.actions ;
export default slice.reducer ;

