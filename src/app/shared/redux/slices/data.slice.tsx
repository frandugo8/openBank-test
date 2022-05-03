import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  view: number
  hasError?: boolean
} = {
  view: 1,
}

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setNextView: (state) => {
      state.view = state.view + 1
    },
    setLastViewWithErrors: (state) => {
      state.view = 3
      state.hasError = true
    },
    resetView: (state) => {
      state.view = 1
    },
  }
})

export const { setNextView, setLastViewWithErrors, resetView } = dataSlice.actions


export default dataSlice.reducer