import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/theme/themeSlice';
import favoritesReducer from '../features/favorites/favoritesSlice';
import languageReducer from '../features/projects/languageSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    favorites: favoritesReducer,
    language: languageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
