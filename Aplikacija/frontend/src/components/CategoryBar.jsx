import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoryItem from "./CategoryItem";
import {
  createCategory,
  getCategories,
  reset,
} from "../features/categories/categorySlice";
import "./Category.css";

import {MdOutlineLibraryAdd}  from "react-icons/md";


function CategoryBar({ handleSelectedIngredients }) {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { user } = useSelector((state) => state.auth);
  const addCategory = () => {
    dispatch(
      createCategory({
        name: prompt("Please add a category name:"),
      })
    );
  };
  useEffect(() => {
    dispatch(getCategories());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  return (
    <div className="catStyle">
      <h2 className="catTitle">INGREDIENTS</h2>
      {user?.email === "admin@admin.com" && (
        <button className="add-category-btn" onClick={addCategory}>
          <MdOutlineLibraryAdd/>
        </button>
      )}
      <div className="categories">
        {categories.map((category) => (
          <CategoryItem
            key={category._id}
            category={category}
            handleSelectedIngredients={handleSelectedIngredients}
          />
        ))}
      </div>
    </div>
  );
}

export default CategoryBar;
