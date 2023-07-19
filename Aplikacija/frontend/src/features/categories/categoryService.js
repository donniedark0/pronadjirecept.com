import axios from "axios";
const API_URL = "api/category/";

//Get all categories

const getCategories = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const deleteCategory = async (categoryId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + categoryId, config);
  return response.data;
};

//Create new category
const createCategory = async (categoryData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, categoryData, config);

  return response.data;
};

const categoryService = {
  getCategories,
  createCategory,
  deleteCategory,
};

export default categoryService;
