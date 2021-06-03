import {createStore, applyMiddleware} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import createSagaMiddleware from 'redux-saga';
import reducers from './rootReducers';
import rootSaga from './rootSaga';

// Persist data so would work offline
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['banner'],
};

const persistedReducer = persistReducer(persistConfig, reducers);
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

export const store = createStore(
  persistedReducer,
  applyMiddleware(...middleware),
);

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
