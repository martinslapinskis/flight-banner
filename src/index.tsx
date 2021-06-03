import React from 'react';
import {Provider} from 'react-redux';
import {store, persistor} from '@redux/core/store';
import {PersistGate} from 'redux-persist/es/integration/react';
import Navigation from './navigation';

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Navigation />
    </PersistGate>
  </Provider>
);

export default App;
