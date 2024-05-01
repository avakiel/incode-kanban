/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./Store";
import { getRepoIssues } from "src/fetchClient";
import { IssuesType } from "src/Types/Types";


interface IssuesState {
  issues: IssuesType[];
  loading: boolean;
  error: string;
  activeRepo: { owner: string, repo: string } | null;
  sessionIssue: string | null;
}

const initialState: IssuesState = {
  issues: [],
  loading: false,
  error: "",
  activeRepo: null,
  sessionIssue: null,
};

export const fetchIssues = createAsyncThunk(
  "get/issues",
  async (params: { owner: string, repo: string }) => {
    const response = await getRepoIssues(params.owner, params.repo);
    return response;
  }
);

export const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {
    setSessionIssues: (state, action) => {
      state.sessionIssue = action.payload;
    },
    setActiveRepo: (state, action) => {
      state.activeRepo = action.payload;
    },
    cleanIssues: (state) => {
      state.issues = [];
      state.sessionIssue = null;
    },
    setIssueError: (state, action) => {
      state.error = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchIssues.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIssues.fulfilled, (state, action) => {
        state.issues = action.payload;
        state.loading = false;
      })
      .addCase(fetchIssues.rejected, (state, action) => {
        state.error = action.error.message || 'An unknown error occurred';
        state.loading = false;
      })
  },
});

export const { setSessionIssues, cleanIssues, setActiveRepo, setIssueError } = issuesSlice.actions;

export const selectFetchError = (state: RootState) => state.issues.error;
export const selectActiveRepo = (state: RootState) => state.issues.activeRepo;
export const selectSessionIssue = (state: RootState) => state.issues.sessionIssue;
export const selectIssues = (state: RootState) => state.issues.issues;
export const selectIssuesLoader = (state: RootState) => state.issues.loading;

export default issuesSlice.reducer;
