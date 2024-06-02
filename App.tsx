import React from 'react';

import MainTabNavigator from './src/navigators/MainNavigator';
import {Provider} from 'react-redux';
import {store} from './src/services/store';

const App = () => {
  return (
    <Provider store={store}>
      <MainTabNavigator />
    </Provider>
  );
};

export default App;
