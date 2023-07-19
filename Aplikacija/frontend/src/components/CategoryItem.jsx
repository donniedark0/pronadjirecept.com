import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IngredientItem from "./IngredientItem";
import {
  createIngredient,
  getIngredients,
} from "../features/ingredients/ingredientSlice";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { deleteCategory } from "../features/categories/categorySlice";
import "../components/Recipe.css";
import "../components/Button.css";

import { MdDeleteForever, MdOutlineLibraryAdd } from "react-icons/md";

function CategoryItem({ category, handleSelectedIngredients }) {
  const { ingredients } = useSelector((state) => state.ingredients);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const addIngredient = () => {
    dispatch(
      createIngredient({
        name: prompt("Please add an ingredient name:"),
        categoryId: category._id,
      })
    );
  };

  const categoryIngredients = ingredients[category._id] || [];

  useEffect(() => {
    dispatch(getIngredients(category._id));
  }, [category._id, dispatch]);
  return (
    <div className="single-category">
      <h2 className="categoryName">{category.name}</h2>
      {user?.email === "admin@admin.com" && (
        <button
          className="delete-category-btn"
          onClick={() => dispatch(deleteCategory(category._id))}
        >
          <MdDeleteForever />
        </button>
      )}

      <button className="dropdown" onClick={toggleDropdown}>
        {isOpen === false ? (
          <AiOutlinePlusCircle className="bat" />
        ) : (
          <>
            <AiOutlineMinusCircle className="bat" />
          </>
        )}
      </button>

      {isOpen && (
        <div className="ingredients">
          {categoryIngredients.map((ingredient) => (
            <IngredientItem
              key={ingredient._id}
              ingredient={ingredient}
              handleSelectedIngredients={handleSelectedIngredients}
            />
          ))}
          {user?.email === "admin@admin.com" && (
            <button className="add-ingredient-btn" onClick={addIngredient}>
              <MdOutlineLibraryAdd />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default CategoryItem;
