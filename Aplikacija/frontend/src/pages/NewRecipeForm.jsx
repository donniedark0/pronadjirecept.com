import React, { useState } from "react";
import RecipeForm from "../components/RecipeForm";
import CategoryBar from "../components/CategoryBar";
import { useSelector } from "react-redux";
import '../components/Category.css'

function NewRecipeForm() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const { user } = useSelector((state) => state.auth);

  const handleSelectedIngredients = (selectedValue) => {
    setSelectedIngredients((prev) =>
      prev.some((data) => data === selectedValue)
        ? prev.filter((data) => data !== selectedValue)
        : [...selectedIngredients, selectedValue]
    );
  };
  return (
    <>
      <div className="contentt">
        <CategoryBar handleSelectedIngredients={handleSelectedIngredients} />
        <div className="positionRecipe">
          <RecipeForm selectedIngredients={selectedIngredients} userId={user._id} />
        </div>
      </div>
    </>
  );
}

export default NewRecipeForm;
