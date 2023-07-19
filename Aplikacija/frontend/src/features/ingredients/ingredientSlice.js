import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ingredientService from "./ingredientService";

const initialState = {
  ingredients: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getIngredients = createAsyncThunk(
  "ingredients/getByCategory",
  async (categoryId, thunkAPI) => {
    try {
      return await ingredientService.getIngredients(categoryId);
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

export const getRecipeIngredients = createAsyncThunk(
  "ingredients/getRecipeIngredients",
  async (recipeIngredients, thunkAPI) => {
    try {
      return await ingredientService.getRecipeIngredients(recipeIngredients);
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

//Create ingredient
export const createIngredient = createAsyncThunk(
  "ingredient/create",
  async (ingredientData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ingredientService.createIngredient(ingredientData, token);
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

//Delete ingredient
export const deleteIngredient = createAsyncThunk(
  "ingredient/delete",
  async (ing, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ingredientService.deleteIngredient(ing._id, token);
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

export const ingredientSlice = createSlice({
  name: "ingredient",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const categoryId = action.meta.arg;
        state.ingredients[categoryId] = action.payload;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getRecipeIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRecipeIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ingredients = action.payload;
      })
      .addCase(getRecipeIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createIngredient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createIngredient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const newIngredient = action.payload;
        const categoryId = newIngredient.categoryId;
        state.ingredients[categoryId] = [
          ...state.ingredients[categoryId],
          newIngredient,
        ];
      })
      .addCase(createIngredient.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteIngredient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteIngredient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const categoryId = action.meta.arg.categoryId;
        const categoryIngredients = state.ingredients[categoryId];
        if (categoryIngredients) {
          state.ingredients[categoryId] = categoryIngredients.filter(
            (ingredient) => ingredient._id !== action.payload.id
          );
        }
      })
      .addCase(deleteIngredient.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = ingredientSlice.actions;
export default ingredientSlice.reducer;
