import { useState } from "react";
import { useDispatch } from "react-redux";
import { createRecipe } from "../features/recipes/recipeSlice";
import '../components/Recipe.css'
import '../components/Category.css'

function RecipeForm({ selectedIngredients, userId }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDesc] = useState("");
  const [imagePath, setImagePath] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(
      createRecipe({
        name,
        description,
        imagePath,
        selectedIngredients,
        userId,
      })
    );
    setName("");
    setDesc("");
    setImagePath("");
  };

  return (
    <div className="leftSideAdd">
      <section className="form detailWrapper">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <div className="descriptionRecipe">
              <label htmlFor="text">Name: </label>
              <input
                type="text"
                name="text"
                id="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="text">Description: </label>
              
              <textarea
                rows="7"
                type="text"
                name="description"
                id="description"
                value={description}
                onChange={(e) => setDesc(e.target.value)}
              />
            
              <label htmlFor="text">Image path: </label>
              <input
                type="text"
                name="imagePath"
                id="imagePath"
                value={imagePath}
                onChange={(e) => setImagePath(e.target.value)}
              />
            
          </div>
          <div className="form-grpup">
            <button className="btn btn-block" type="submit">
              Add recipe
            </button>
          </div>
          </div>
        </form>
      </section>
    </div>
  );
}

export default RecipeForm;
