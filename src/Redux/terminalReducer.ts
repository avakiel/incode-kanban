import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './Store'

export interface TerminalState {
  actions: string
}

const initialState: TerminalState = {
  actions: '',
}

export const terminalSlice = createSlice({
  name: 'terminal',
  initialState,
  reducers: {
    setTerminalData: (state, action) => {
      state.actions = action.payload
    },
  },
})

export const { setTerminalData } = terminalSlice.actions

export const selectTerminalData = (state: RootState) => state.terminal.actions

export default terminalSlice.reducer
