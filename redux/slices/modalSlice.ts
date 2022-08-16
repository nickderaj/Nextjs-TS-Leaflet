import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ISliceState {
  sampleModalOpen: boolean;
}

const initialState: ISliceState = {
  sampleModalOpen: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setSampleModalOpen: (state, action: PayloadAction<boolean>) => {
      state.sampleModalOpen = action.payload;
    },
    closeAllModals: (state) => {
      state.sampleModalOpen = false;
    },
  },
});

export const { setSampleModalOpen, closeAllModals } = modalSlice.actions;

export default modalSlice.reducer;
