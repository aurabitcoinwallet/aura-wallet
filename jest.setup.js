/* global jest */

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest'),
);

jest.mock('react-native-tcp-socket', () => ({
  __esModule: true,
  default: {
    connect: jest.fn(),
    createConnection: jest.fn(),
  },
}));

jest.mock('react-native-haptic-feedback', () => ({
  __esModule: true,
  default: { trigger: jest.fn() },
}));

jest.mock('@react-native-vector-icons/ionicons', () => 'Ionicons');
jest.mock('@react-native-vector-icons/material-icons', () => 'MaterialIcons');
jest.mock('@react-native-vector-icons/material-design-icons', () => 'MaterialDesignIcons');
jest.mock('@react-native-menu/menu', () => ({ MenuView: 'MenuView' }));
