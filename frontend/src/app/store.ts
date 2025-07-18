import {configureStore} from "@reduxjs/toolkit"
import { authApi } from "../feature/auth/authApi";
import authReducer from "../feature/auth/authSlice";
import { cartApi } from "@/feature/cart/cartApi";


export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [cartApi.reducerPath]: cartApi.reducer,
        auth: authReducer,
        // future: productApi.reducer, cartApi.reducer etc.
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware, cartApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;