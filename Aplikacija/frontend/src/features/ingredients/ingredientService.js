import axios from "axios";

const API_URL = "api/ingredients/";

//Get ingredients by category
const getIngredients = async (categoryId) => {
  const response = await axios.get(API_URL + categoryId);
  return response.data;
};

const getRecipeIngredients = async (recipeIngredients) => {
  const response = await axios.get(API_URL, recipeIngredients);
  return response.data;
};

//Create new ingredient
const createIngredient = async (ingredientData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, ingredientData, config);

  return response.data;
};

//Delete ingredient
const deleteIngredient = async (ingredientId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + ingredientId, config);
  return response.data;
};

const ingredientService = {
  getIngredients,
  createIngredient,
  deleteIngredient,
  getRecipeIngredients,
};

export default ingredientService;
