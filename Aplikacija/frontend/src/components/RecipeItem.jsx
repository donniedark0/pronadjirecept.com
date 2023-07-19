import { useDispatch, useSelector } from "react-redux";
import { deleteRecipe, updateRecipe } from "../features/recipes/recipeSlice";
import RecipeInfoItem from "./RecipeInfoItem";
import CommentItem from "./CommentItem";
import { getComments } from "../features/comments/commentSlice";
import { useEffect, useState } from "react";
import { getRecipeIngredients } from "../features/ingredients/ingredientSlice";
import "../components/Recipe.css";
import { createComment } from "../features/comments/commentSlice";
import "./Button.css";

function RecipeItem({ recipe }) {
  const dispatch = useDispatch();

  const { comments } = useSelector((state) => state.comments);
  const { user } = useSelector((state) => state.auth);
  const recipeComments = comments[recipe._id] || [];
  const [editableRecipe, setEditableRecipe] = useState({ ...recipe });
  const [editedImagePath, setEditedImagePath] = useState(recipe.imagePath);
  const [editedRecipeName, setEditedRecipeName] = useState(recipe.name);
  const [isEditingName, setIsEditingName] = useState(false);
  // const { ingredients } = useSelector((state) => state.ingredients);
  // console.log(ingredients);

  const [txtBoxToggle, setTxtBoxToggle] = useState("description");

  const handleTxtBoxToggle = (tab) => {
    setTxtBoxToggle(tab);
  };

  const handleRecipeEdit = () => {
    dispatch(updateRecipe(editableRecipe)).then((response) => {
      if (!response.error) {
        setEditableRecipe(response.payload);
      }
    });
  };

  const handleEditName = () => {
    setIsEditingName(true);
  };
  const handleRecipeNameChange = (e) => {
    setEditedRecipeName(e.target.value);
  };

  const handleConfirmName = () => {
    dispatch(
      updateRecipe({
        ...editableRecipe,
        name: editedRecipeName,
      })
    ).then((response) => {
      if (!response.error) {
        setIsEditingName(false);
      }
    });
  };

  const handleImagePathChange = (e) => {
    setEditedImagePath(e.target.value);
  };

  const handleConfirmImagePath = () => {
    setEditableRecipe((prevRecipe) => ({
      ...prevRecipe,
      imagePath: editedImagePath,
    }));
    const updatedRecipe = { ...editableRecipe, imagePath: editedImagePath };

    dispatch(updateRecipe(updatedRecipe));
  };
  const [comm, setComm] = useState("");
  const handleComment = () => {
    dispatch(
      createComment({
        comment: comm,
        userId: user._id,
        recipeId: recipe._id,
      })
    );
  };

  useEffect(() => {
    dispatch(getComments(recipe._id));
    // dispatch(getRecipeIngredients(recipe.ingredients));
  }, [dispatch, recipe._id]);

  // const ingredientNames = [];

  // ingredients.forEach((ing) => {
  //   ingredientNames.push(ing.name);
  // });

  return (
    <div className="singlerecipe">
      <div className="up-recipe">
        <div className="recipe-left-side">
          <h3 className="styletext big-recipe-name">
            {isEditingName ? (
              <input
                type="text"
                id="ediedName"
                value={editedRecipeName}
                onChange={handleRecipeNameChange}
              />
            ) : (
              editedRecipeName
            )}
          </h3>
          {editableRecipe && user?._id === recipe.userId && (
            <div>
              {isEditingName ? (
                <button className="editSaveName" onClick={handleConfirmName}>
                  Save
                </button>
              ) : (
                <button className="editSaveName" onClick={handleEditName}>
                  Edit Name
                </button>
              )}
            </div>
          )}

          <img src={editedImagePath} alt="" className="big-recipe-picture" />
          {editableRecipe && user?._id === recipe.userId && (
            <div className="changePath">
              <label htmlFor="imagePath">Image path: </label>
              <input
                type="text"
                name="imagePath"
                id="imagePath"
                value={editedImagePath}
                onChange={handleImagePathChange}
              />
              <button className="confirmURL" onClick={handleConfirmImagePath}>
                Confirm
              </button>
            </div>
          )}
          <RecipeInfoItem recipe={recipe} />
        </div>
        <div className="recipe-right-side">
          <div className="up-side">
            <button
              className={`btnn separatebtn ${
                txtBoxToggle === "description" ? "activee" : ""
              }`}
              onClick={() => handleTxtBoxToggle("description")}
            >
              DESCRIPTION
            </button>
          </div>
          {editableRecipe && (
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              className="recipe-description"
              readOnly={txtBoxToggle !== "description"}
              value={
                txtBoxToggle === "description"
                  ? editableRecipe.description
                  : editableRecipe.ingredients
              }
              onChange={(e) =>
                setEditableRecipe((prevRecipe) => ({
                  ...prevRecipe,
                  [txtBoxToggle]: e.target.value,
                }))
              }
            ></textarea>
          )}
          {user?._id === recipe.userId && (
            <div>
              <button className="edit-recipe" onClick={handleRecipeEdit}>
                Edit Recipe
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="comment-section">
        {user && (
          <div className="new-comment">
            <div>
              <textarea
                name=""
                id=""
                cols="30"
                rows="4"
                className="comment-area"
                placeholder="Add a comment..."
                onChange={(e) => setComm(e.target.value)}
              ></textarea>
            </div>

            <button className="add-comment" onClick={handleComment}>
              COMMENT
            </button>
          </div>
        )}
        {recipeComments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} />
        ))}
      </div>
    </div>
  );
}
export default RecipeItem;
