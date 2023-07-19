import axios from "axios";
const API_URL = "api/recipeLikes/";

//Add a rating
const createRating = async (ratingData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, ratingData, config);

  return response.data;
};
//Get recipe rating

const getRatings = async (recipeId) => {
  const response = await axios.get(API_URL + recipeId);
  return response.data;
};

//Deleet rating
const deleteRating = async (ratingId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + ratingId, config);
  return response.data;
};

const ratingService = {
  createRating,
  getRatings,
  deleteRating,
};

export default ratingService;
