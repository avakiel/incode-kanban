import { configureStore } from "@reduxjs/toolkit";
import issuesReducer from "./issuesReducer";
import columnsReducer from "./columnsReducer";
import terminalReducer from "./terminalReducer";

const store = configureStore({
  reducer: {
    issues: issuesReducer,
    columns: columnsReducer,
    terminal: terminalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
