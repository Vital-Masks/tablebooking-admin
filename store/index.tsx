import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from './themeSlice';

const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
});

export default configureStore({
    reducer: rootReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
