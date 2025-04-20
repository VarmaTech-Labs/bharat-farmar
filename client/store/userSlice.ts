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
    loginSuccess:(state,action)=>{
      state.user = action.payload.user;
      state.isLoggedIn = true;
      state.refreshToken=action.payload.refreshToken
    },
    userUpdate:(state,action)=>{
       state.user= action.payload
    },
    logout:(state,_action)=>{
      state.user = null,
      state.isLoggedIn=false
      state.refreshToken = null; 

    }
   }
})

export const { loginSuccess, userUpdate, logout } = userSlice.actions;
export default userSlice.reducer