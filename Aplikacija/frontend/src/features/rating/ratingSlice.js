import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ratingService from "./ratingService";

const initialState = {
  ratings: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Get recipe rating
export const getRatings = createAsyncThunk(
  "rating/get",
  async (recipeId, thunkAPI) => {
    try {
      return await ratingService.getRatings(recipeId);
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

//Create rating
export const createRating = createAsyncThunk(
  "rating/create",
  async (ratingData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ratingService.createRating(ratingData, token);
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

//Delete rating

export const deleteRating = createAsyncThunk(
  "rating/delete",
  async (ratingId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ratingService.deleteRating(ratingId, token);
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
export const ratingSlice = createSlice({
  name: "rating",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRating.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createRating.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log(action);
        state.ratings.push(action.payload);
      })
      .addCase(createRating.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getRatings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRatings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ratings = action.payload;
      })
      .addCase(getRatings.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteRating.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteRating.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ratings = state.ratings.filter(
          (rating) => rating._id !== action.payload.id
        );
      })
      .addCase(deleteRating.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});
export const { reset } = ratingSlice.actions;
export default ratingSlice.reducer;
