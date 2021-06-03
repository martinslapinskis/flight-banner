import {AppRegistry} from 'react-native';
import App from './src';
import {name as appName} from './app.json';
import Config from 'react-native-config';
import {mockFetch} from './apiMocks';

if (Config.APP_ENV === 'DEV') {
  mockFetch();
}

AppRegistry.registerComponent(appName, () => App);
