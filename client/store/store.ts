import { configureStore ,combineReducers} from "@reduxjs/toolkit";
import userSlice from "./userSlice"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from 'redux-persist';


const persistConfig  = {
    key: 'root',
    storage:AsyncStorage,

}

const rootReducer = combineReducers({user:userSlice})
const persistedReducer  = persistReducer(persistConfig,rootReducer)
 
export const store = configureStore({
    reducer:persistedReducer,
    middleware:getDefaultMiddleware =>
    getDefaultMiddleware({
          serializableCheck: false, 
    }),
})


export const persistor = persistStore(store);


