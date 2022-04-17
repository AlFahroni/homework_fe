import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';

// export default configureStore({
//   reducer: {
//     auth: authReducer,
//   }
// });

const store = configureStore({
  reducer:{
    auth: authReducer,
  }
});

export type TRootState = ReturnType<typeof store.getState>

export default store;