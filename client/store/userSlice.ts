import  {createSlice}  from "@reduxjs/toolkit"

const initialState = {
    user: null,
    isLoggedIn: false,
    refreshToken:null
};


const userSlice = createSlice({
   name:"user",
   initialState,
   reducers:{
    login:(state,action)=>{
      state.user = action.payload;
      state.isLoggedIn = true;
      state.refreshToken=action.payload
    },
    update:(state,action)=>{
       state.user= action.payload
    },
    logout:(state,_action)=>{
      state.user = null,
      state.isLoggedIn=false
      state.refreshToken = null; 

    }
   }
})

export const { login, update, logout } = userSlice.actions;
export default userSlice.reducer