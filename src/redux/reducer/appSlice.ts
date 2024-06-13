import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  favorites: any[] | null;
  fcm: string | null;
}

const initialState: AppState = {
  favorites: null,
  fcm: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<any>) {
      if (state.favorites === null) {
        state.favorites = [action.payload];
      } else {
        state.favorites.push(action.payload);
      }
    },
    setFcm(state, action: PayloadAction<string | null>) {
      state.fcm = action.payload;
    },
  },
});

export const { addFavorite,setFcm } = appSlice.actions;
export default appSlice.reducer;
