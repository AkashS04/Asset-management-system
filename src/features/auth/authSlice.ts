import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginAPI } from "../../services/auth/authAPI";

export const loginThunk = createAsyncThunk(
    'auth/login',
    async ({email,password}:{email:string,password:string})=>{
        const res = await LoginAPI(email,password)
        return res
    }
)
type authState={
    user:any|null;
    loading:boolean
}
const initialState:authState={
    user:null,
    loading:false
}
const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        logout(state){
            state.user=null
            localStorage.removeItem('accessToken')
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(loginThunk.pending,(state)=>{
            state.loading = true;
        })
        .addCase(loginThunk.fulfilled,(state,action)=>{
            state.loading=false;
            state.user=action.payload.users
        })
    }
})

export const {logout} = authSlice.actions;
export default authSlice.reducer