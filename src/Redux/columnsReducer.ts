import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./Store";
import { IssuesType } from "src/Types/Types";

interface columnsState {
  todoColumn: IssuesType[],
  doneColumn: IssuesType[],
  inProgressColumn: IssuesType[],
  [key: string]: IssuesType[],
}

const initialState: columnsState = {
  todoColumn: [],
  doneColumn: [],
  inProgressColumn: [],
};

export const columnsSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {
    setTodo: (state, action: PayloadAction<IssuesType[]>) => {
      state.todoColumn = action.payload;
    },
    setSession: (state, action: PayloadAction<{todo: IssuesType[], done: IssuesType[], inProgress: IssuesType[]}>) => {
      state.doneColumn = action.payload.done;
      state.inProgressColumn = action.payload.inProgress;
      state.todoColumn = action.payload.todo;
    },
    dragAndDropIssue: (state, action: PayloadAction<{ issue: IssuesType, column: string }>) => {
      state[action.payload.column] = state[action.payload.column].filter((e) => e.id !== action.payload.issue.id);
    },
    reorder: (state, action: PayloadAction<{ issue: IssuesType, column: string, index: number }>) => {
      state[action.payload.column].splice(action.payload.index, 0, action.payload.issue);
    },
    cleanColumn: (state) => {
      state.doneColumn = [];
      state.inProgressColumn = [];
      state.todoColumn = [];
    }, 
  },
});

export const { setTodo, dragAndDropIssue, reorder, setSession, cleanColumn } = columnsSlice.actions;

export const selectTodoColunm = (state: RootState) => state.columns.todoColumn;
export const selectDoneColunm = (state: RootState) => state.columns.doneColumn;
export const selectInProgressColunm = (state: RootState) => state.columns.inProgressColumn;


export default columnsSlice.reducer;
