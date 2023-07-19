import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import RecipeForm from "../components/RecipeForm";
import SmallRecipe from "../components/SmallRecipe";
import {
  getRecipesByIngerdients,
  reset,
} from "../features/recipes/recipeSlice";
import { getCategories } from "../features/categories/categorySlice";
import CategoryBar from "../components/CategoryBar";
import RecipeItem from "../components/RecipeItem";
import "../components/Category.css";
import Swiper, { Navigation, Pagination } from "swiper";

function Search() {
  Swiper.use([Navigation, Pagination]);
  const swiper = new Swiper(".slider-content", {
    slidesPerView: 3,
    spaceBetween: 25,
    centerSlide: "true",
    fade: "true",
    grabCursor: "true",
    pagination: {
      el: ".swiper-pagination",

      clickable: "true",
      dynamicBullets: "true",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 25,
      },

      1500: {
        slidesPerView: 2,
        spaceBetween: 25,
      },
      1900: {
        slidesPerView: 3,
        spaceBetween: 25,
      },
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { recipes, isLoading, isError, message } = useSelector(
    (state) => state.recipes
  );

  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const handleClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const handleSelectedIngredients = (selectedValue) => {
    setSelectedIngredients((prev) =>
      prev.some((data) => data === selectedValue)
        ? prev.filter((data) => data !== selectedValue)
        : [...selectedIngredients, selectedValue]
    );
  };

  useEffect(() => {
    dispatch(getCategories());
    dispatch(reset());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  const handleSearch = () => {
    dispatch(getRecipesByIngerdients(selectedIngredients));
    dispatch(reset());
    setSelectedRecipe(null);
  };
  return (
    <>
      <section className="contentt">
        <div className="categoryBar column">
          <CategoryBar handleSelectedIngredients={handleSelectedIngredients} />
          <button className="search-btn btnn" onClick={handleSearch}>
            SEARCH
          </button>
        </div>
        {selectedRecipe ? (
          <RecipeItem recipe={selectedRecipe} />
        ) : (
          <>
            <div className="recipes rightside">
              <div className="slider-container swiper">
                <div
                  className="slider-content sliderW"
                  breakpoints={{
                    1700: {
                      slidesPerView: 1,
                    },
                    1500: {
                      slidesPerView: 2,
                    },
                    2000: {
                      slidesPerView: 3,
                    },
                  }}
                >
                  <div className="card-wrapper swiper-wrapper">
                    {Array.isArray(recipes) && recipes.length > 0 ? (
                      recipes.map((recipe) => (
                        <SmallRecipe
                          key={recipe._id}
                          recipe={recipe}
                          onClick={() => handleClick(recipe)}
                        />
                      ))
                    ) : (
                      <div className="noFound">
                        <p>There are no recipes with those ingredients.</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="swiper-button-next"></div>
                <div className="swiper-button-prev"></div>
                <div className="swiper-pagination"></div>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
}

export default Search;
