import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './core/RootSaga';
import { Application } from './reducers/Application';
import { Routing } from './reducers/Routing';
import { Authentication } from './reducers/Authentication';
import { UserProfile } from './reducers/UserProfile';
import { CarrierProfile } from './reducers/CarrierProfile';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    Application: Application.reducer,
    Authentication: Authentication.reducer,
    Routing: Routing.reducer,
    UserProfile: UserProfile.reducer,
    CarrierProfile: CarrierProfile.reducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
