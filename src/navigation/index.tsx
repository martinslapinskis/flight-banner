import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainFlow from './main';

export default function App() {
  return (
    <NavigationContainer>
      <MainFlow />
    </NavigationContainer>
  );
}
