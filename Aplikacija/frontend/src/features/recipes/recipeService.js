import axios from "axios";

const API_URL = "api/recipes/";

//Create new recipe
const createRecipe = async (recipeData, token) => {
  console.log(recipeData);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, recipeData, config);

  return response.data;
};

//Get recipes by ingerdients
const getRecipesByIngerdients = async (ingredients) => {
  const response = await axios.put(API_URL, ingredients);

  return response.data;
};

const getAllRecipes = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);

  return response.data;
};

//Get user's recipes
const getUserRecipes = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + id, config);

  return response.data;
};

//Update recipe
const updateRecipe = async (recipeData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    API_URL + recipeData._id,
    recipeData,
    config
  );

  if (response.data) {
    localStorage.setItem("recipe", JSON.stringify(response.data));
  }

  return response.data;
};

//Delete recipe
const deleteRecipe = async (recipeId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + recipeId, config);
  return response.data;
};

const recipeService = {
  createRecipe,
  getUserRecipes,
  getRecipesByIngerdients,
  getAllRecipes,
  updateRecipe,
  deleteRecipe,
};

export default recipeService;
