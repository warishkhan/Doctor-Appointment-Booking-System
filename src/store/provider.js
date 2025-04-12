'use client';

import { Provider } from 'react-redux';
import store from './index'; // Adjust if your store is elsewhere

export default function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
