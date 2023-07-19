import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteIngredient } from "../features/ingredients/ingredientSlice";
import "../components/Recipe.css";
import { MdDeleteForever, MdOutlineLibraryAdd } from "react-icons/md";

function IngredientItem({ ingredient, handleSelectedIngredients }) {
  const renderSelected = (e) => {
    handleSelectedIngredients(e.target.value);
  };

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  console.log(ingredient._id);
  return (
    <div className="single-ingredient">
      {user?.email === "admin@admin.com" && (
        <button
          className="delete-ingredient-btn"
          onClick={() => dispatch(deleteIngredient(ingredient))}
        >
          <MdDeleteForever />
        </button>
      )}

      <label htmlFor="ingredient">{ingredient.name}</label>
      <input
        type="checkbox"
        name="ingredient"
        id="ingredient"
        value={ingredient._id}
        className="ingredient-checkbox"
        onChange={renderSelected}
      />
    </div>
  );
}

export default IngredientItem;
