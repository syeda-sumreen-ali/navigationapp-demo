import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  takePicture: 0,
  showNavigation: 0
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setRdxTakePicture: (state, action) => {
      state.takePicture = action.payload;
    },
    setRdxShowNavigation: (state, action) => {
      state.showNavigation = action.payload;
    },
    getRdxTakePicture: state => {
      return state.takePicture;
    },
    getRdxShowNavigation: state => {
      return state.showNavigation;
    }
  }
});

export const { setRdxTakePicture, setRdxShowNavigation, getRdxTakePicture, getRdxShowNavigation } = appSlice.actions;
export default appSlice.reducer;
