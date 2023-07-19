import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../features/users/userSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import "../components/Recipe.css";
import {
  deleteComment,
  updateComment,
} from "../features/comments/commentSlice";
import "../components/Profile.css";
import { MdDeleteForever } from "react-icons/md";

function CommentItem({ comment }) {
  const [commenter, setCommenter] = useState(null);
  const [commentVal, setCommentVal] = useState(comment.comment);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(`api/users/${comment.userId}`);
        setCommenter(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    getUserById();
  }, [comment]);

  const handleEditComment = (e) => {
    setCommentVal(e.target.value);
  };

  const handleComment = () => {
    const editedComment = {
      ...comment,
      comment: commentVal,
    };
    console.log(editedComment);
    dispatch(updateComment(editedComment));
  };

  return (
    <div className="comment">
      <img src={commenter?.imagePath} alt="" className="comment-photo" />
      <div className="styletext leftcomment">
        <h4 className="comment-user">{commenter?.name}</h4>
        <div className="comment-value">{comment.comment}</div>
      </div>
      <div className="styletext lefttwocomment">
        {(user?._id === comment.userId ||
          user?.email === "admin@admin.com") && (
          <button
            onClick={() => dispatch(deleteComment(comment))}
            className="deleteComment"
          >
            <MdDeleteForever />
          </button>
        )} 
      </div>
    </div>
  );
}

export default CommentItem;
