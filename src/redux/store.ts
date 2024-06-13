import {combineReducers, configureStore} from '@reduxjs/toolkit';
import appReducer from './reducer/appSlice';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'SAMTECH',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  auth: appReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);

export default store;
