import { configureStore, getDefaultMiddleware  } from '@reduxjs/toolkit';
import appointmentsReducer from './slices/appointmentsSlice';
import notificationsSlice from './slices/notificationsSlice.js'

 const store = configureStore({
  reducer: {
    appointments: appointmentsReducer,
    notifications:notificationsSlice
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;