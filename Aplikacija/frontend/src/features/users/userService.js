import axios from "axios";
const API_URL = "api/users/";

//Get all categories

const getUserById = async (userId) => {
  const response = await axios.get(API_URL + userId);
  return response.data;
};

const userService = {
  getUserById,
};

export default userService;
