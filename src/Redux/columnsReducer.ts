import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./Store";
import { IssuesType } from "src/Types/Types";
import { getRepoIssues } from "src/fetchClient";

interface Columns {
  todoColumn: IssuesType[],
  doneColumn: IssuesType[],
  inProgressColumn: IssuesType[],
  [key: string]: IssuesType[] | string,
}

const initialState: Columns = {
  todoColumn: [],
  doneColumn: [],
  inProgressColumn: [],
  loading: 'false',
};

export const fetchExtraIssues = createAsyncThunk(
  "get/extraIssues",
  async (params: { owner: string, repo: string, per_page: string, page: string }) => {
    const response = await getRepoIssues(params.owner, params.repo, params.per_page, params.page);
    return response;
  }
);

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
      if (Array.isArray(state[action.payload.column])) {
        state[action.payload.column] = (state[action.payload.column] as IssuesType[]).filter((e) => e.id !== action.payload.issue.id);
      }
    },
    reorder: (state, action: PayloadAction<{ issue: IssuesType, column: string, index: number }>) => {
      if (Array.isArray(state[action.payload.column])) {
        (state[action.payload.column] as IssuesType[]).splice(action.payload.index, 0, action.payload.issue);
      }
    },
    cleanColumn: (state) => {
      state.doneColumn = [];
      state.inProgressColumn = [];
      state.todoColumn = [];
    }, 
  },
  extraReducers(builder) {
    builder
    .addCase(fetchExtraIssues.pending, (state) => {
      state.loading = 'true';
    })
    .addCase(fetchExtraIssues.fulfilled, (state, action) => {
      state.todoColumn = [...state.todoColumn, ...action.payload];
      state.loading = 'false';
    })
    .addCase(fetchExtraIssues.rejected, (state) => {
      state.loading = 'false';
    });
  },
});

export const { setTodo, dragAndDropIssue, reorder, setSession, cleanColumn } = columnsSlice.actions;

export const selectTodoColunm: (state: RootState) => IssuesType[] = (state: RootState) => state.columns.todoColumn;
export const selectDoneColunm = (state: RootState) => state.columns.doneColumn;
export const selectInProgressColunm = (state: RootState) => state.columns.inProgressColumn;
export const selectLoading = (state: RootState) => state.columns.loading;


export default columnsSlice.reducer;
