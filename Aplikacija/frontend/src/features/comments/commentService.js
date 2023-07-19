import axios from "axios";

const API_URL = "api/comments/";

//Get recipe comments
const getComments = async (recipeId) => {
  const response = await axios.get(API_URL + recipeId);

  return response.data;
};

//Create new comment
const createComment = async (commentData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, commentData, config);

  return response.data;
};

//Delete comment
const deleteComment = async (commentId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + commentId, config);
  return response.data;
};

//Update recipe
const updateComment = async (commentData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log(commentData);
  const response = await axios.put(
    API_URL + commentData._id,
    commentData,
    config
  );

  if (response.data) {
    localStorage.setItem("comment", JSON.stringify(response.data));
  }

  return response.data;
};

const commentService = {
  getComments,
  deleteComment,
  createComment,
  updateComment,
};

export default commentService;
