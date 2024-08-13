import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from './themeSlice';
import restaurantSlice from './restaurantSlice';

const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    restaurantConfig: restaurantSlice,
});

export default configureStore({
    reducer: rootReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
