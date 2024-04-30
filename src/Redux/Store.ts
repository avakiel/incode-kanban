import { configureStore } from "@reduxjs/toolkit";
import issuesReducer from "./issuesReducer";
import columnsReducer from "./columnsReducer";

const store = configureStore({
  reducer: {
    issues: issuesReducer,
    columns: columnsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
