import { configureStore } from '@reduxjs/toolkit';
import sliceReducers from './slices/slices';

const store = configureStore({
  reducer: sliceReducers,
});

export default store;
