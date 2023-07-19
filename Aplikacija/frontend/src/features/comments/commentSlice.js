import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import commentService from "./commentService";

const initialState = {
  comments: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getComments = createAsyncThunk(
  "comments/getComments",
  async (recipeId, thunkAPI) => {
    try {
      return await commentService.getComments(recipeId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Create a comment
export const createComment = createAsyncThunk(
  "comment/create",
  async (commentData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await commentService.createComment(commentData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Delete comment
export const deleteComment = createAsyncThunk(
  "comment/delete",
  async (comment, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await commentService.deleteComment(comment._id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateComment = createAsyncThunk(
  "comment/updateComment",
  async (commentData, thunkAPI) => {
    try {
      console.log(commentData);
      const token = thunkAPI.getState().auth.user.token;
      return await commentService.updateComment(commentData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const recipeId = action.meta.arg;
        state.comments[recipeId] = action.payload;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const newComment = action.payload;
        const recipeId = newComment.recipeId;
        state.comments[recipeId] = [...state.comments[recipeId], newComment];
      })
      .addCase(createComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action);
        state.isSuccess = true;
        const recipeId = action.meta.arg.recipeId;
        const recipeComments = state.comments[recipeId];
        if (recipeComments) {
          state.comments[recipeId] = recipeComments.filter(
            (comment) => comment._id !== action.payload.id
          );
        }
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log(action.payload);

        const commentsArray = Object.values(state.comments);
        const updatedCommentIndex = commentsArray.findIndex(
          (comment) => comment._id === action.payload.id
        );

        if (updatedCommentIndex !== -1) {
          const recipeId = commentsArray[updatedCommentIndex].recipeId;
          const recipeComments = state.comments[recipeId];

          if (recipeComments) {
            const updatedComments = recipeComments.map((comment, index) => {
              if (index === updatedCommentIndex) {
                return action.payload;
              }
              return comment;
            });

            state.comments[recipeId] = updatedComments;
          }
        }
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        state.recipes = null;
      });
  },
});

export const { reset } = commentSlice.actions;
export default commentSlice.reducer;
