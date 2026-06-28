import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Language } from '../../types';

interface LanguageState {
  lang: Language;
}

const savedLang = (localStorage.getItem('language') as Language) || 'en';

const initialState: LanguageState = {
  lang: savedLang,
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<Language>) {
      state.lang = action.payload;
      localStorage.setItem('language', action.payload);
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
