import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import profileSlice from './profileSlice'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['authDetails']
}

const rootReducer = combineReducers({
    authDetails: authSlice,
    profile: profileSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,  // Avoids warnings related to redux-persist
        }),
})

export const persistor = persistStore(store)