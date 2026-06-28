import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
  ids: string[];
}

const saved = localStorage.getItem('favorites');
const initialState: FavoritesState = {
  ids: saved ? JSON.parse(saved) : [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<string>) {
      const idx = state.ids.indexOf(action.payload);
      if (idx >= 0) {
        state.ids.splice(idx, 1);
      } else {
        state.ids.push(action.payload);
      }
      localStorage.setItem('favorites', JSON.stringify(state.ids));
    },
    clearFavorites(state) {
      state.ids = [];
      localStorage.removeItem('favorites');
    },
  },
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
