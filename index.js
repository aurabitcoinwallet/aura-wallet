/**
 * @format
 */

// Secure CSPRNG polyfill — must load before any crypto use (BIP39 mnemonic gen).
import 'react-native-get-random-values';
import './src/polyfills/textEncoding';
import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
