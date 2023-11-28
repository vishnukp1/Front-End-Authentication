import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../Reducers/loginReducer";


export const store = configureStore({
    reducer:{
      login:loginReducer,
    }
})