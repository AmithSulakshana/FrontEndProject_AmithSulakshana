import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userName:'',
    userRole:'',
    authStatus:false
}

const userSlice = createSlice({
     name:'user',
     initialState,
     reducers:{
        loginSuccess: (state, action) => {
            state.authStatus = true;
            state.userName = action.payload.userName;
            state.userRole = action.payload.userRole;
        },

        loginFail: (state, action) => {
            state.authStatus = false;
            state.userName = '';
            state.userRole ='';
        }
     }
})

export const { loginSuccess,loginFail } = userSlice.actions;
export default userSlice.reducer