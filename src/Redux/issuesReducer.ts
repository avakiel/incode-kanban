/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./Store";
import { getRepoIssues } from "src/fetchClient";
import { IssuesType } from "src/Types/Types";


interface IssuesState {
  loading: boolean;
  error: string;
  activeRepo: { owner: string, repo: string } | null;
  sessionIssue: string | null;
}

const initialState: IssuesState = {
  loading: false,
  error: "",
  activeRepo: null,
  sessionIssue: null,
};

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
    setIssueError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setSessionIssues, setActiveRepo, setIssueError } = issuesSlice.actions;

export const selectFetchError = (state: RootState) => state.issues.error;
export const selectActiveRepo = (state: RootState) => state.issues.activeRepo;
export const selectSessionIssue = (state: RootState) => state.issues.sessionIssue;
export const selectIssuesLoader = (state: RootState) => state.issues.loading;

export default issuesSlice.reducer;
