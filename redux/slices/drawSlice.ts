import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ISliceState {
  isDrawing: boolean;
  drawMode?: 'rectangle' | 'polyline' | 'polygon' | 'marker' | 'circle';
  bounds?: { top: number; bottom: number; left: number; right: number };
}

const initialState: ISliceState = {
  isDrawing: false,
  drawMode: undefined,
  bounds: undefined,
};

export const drawSlice = createSlice({
  name: 'draw',
  initialState,
  reducers: {
    setIsDrawing: (state, action: PayloadAction<boolean>) => {
      state.isDrawing = action.payload;
    },
    setDrawMode: (state, action: PayloadAction<'rectangle' | 'polyline' | 'polygon' | 'marker' | 'circle' | undefined>) => {
      state.drawMode = action.payload;
    },
    setBounds: (state, action: PayloadAction<{ top: number; bottom: number; left: number; right: number }>) => {
      state.bounds = action.payload;
    },
    stopDrawing: (state) => {
      state.isDrawing = false;
      state.drawMode = undefined;
    },
  },
});

export const { setIsDrawing, setDrawMode, setBounds, stopDrawing } = drawSlice.actions;

export default drawSlice.reducer;
