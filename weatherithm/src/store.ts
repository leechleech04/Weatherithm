import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

const x = createSlice({
  name: 'x',
  initialState: 0,
  reducers: {
    setX: (state, action: PayloadAction<number>) => action.payload,
  },
});

export const { setX } = x.actions;

const y = createSlice({
  name: 'y',
  initialState: 0,
  reducers: {
    setY: (state, action: PayloadAction<number>) => action.payload,
  },
});

export const { setY } = y.actions;

const kakao = createSlice({
  name: 'kakao',
  initialState: window.kakao,
  reducers: {
    setKakao: (state, action: PayloadAction<number>) => action.payload,
  },
});

export const { setKakao } = kakao.actions;

export default configureStore({
  reducer: {
    x: x.reducer,
    y: y.reducer,
    kakao: kakao.reducer,
  },
});
