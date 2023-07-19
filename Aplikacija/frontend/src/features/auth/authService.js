import axios from "axios";

const API_URL = "/api/users/";

//Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

//Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const updateUser = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log(userData);
  const response = await axios.put(API_URL + userData.id, userData, config);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
};

const authService = {
  register,
  login,
  logout,
  updateUser,
};

export default authService;
