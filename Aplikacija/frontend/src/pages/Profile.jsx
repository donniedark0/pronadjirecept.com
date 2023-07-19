import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../features/auth/authSlice";
import {
  getAllRecipes,
  getUserRecipes,
  reset,
} from "../features/recipes/recipeSlice";
import SmallRecipe from "../components/SmallRecipe";
import RecipeItem from "../components/RecipeItem";
import { useNavigate } from "react-router-dom";
import "../components/Profile.css";
import { FaTimes } from "react-icons/fa";
import Swiper, { Navigation, Pagination } from "swiper";

function Profile() {
  const [isShown, setIsSHown] = useState(false);

  const togglePassword = () => {
    setIsSHown((isShown) => !isShown);
  };

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

      960: {
        slidesPerView: 2,
        spaceBetween: 25,
      },
      1800: {
        slidesPerView: 3,
        spaceBetween: 25,
      },
    },
  });

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { recipes, isLoading, isError, message } = useSelector(
    (state) => state.recipes
  );

  const [formData, setFormData] = useState({
    name: user?.name,
    email: user?.email,
    newPassword: "",
    imagePath: user?.imagePath,
  });
  const { name, email, newPassword, imagePath } = formData;
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    user.email === "admin@admin.com"
      ? dispatch(getAllRecipes())
      : dispatch(getUserRecipes(user._id));
  }, [user, dispatch]);

  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [goBack, setGoBack] = useState(false);
  const handleClick = (recipe) => {
    setSelectedRecipe(recipe);
    setGoBack(true);
  };

  const handleGoBack = () => {
    setGoBack(false);
  };

  const handleAddRecipe = () => {
    navigate("/addRecipe");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(user._id);

    const userData = {
      id: user._id,
      name,
      email,
      newPassword,
      confPassword: prompt("Confirm your password"),
      imagePath,
    };
    console.log(userData);
    dispatch(updateUser(userData));
    navigate("/home");
  };
  return (
    <>
      <div className="profilestyle">
        <div className="profile">
          <div className="profile-left">
            <img src={user?.imagePath} alt="" className="profile-picture-big" />
            <input
              type="text"
              className="image-path"
              id="imagePath"
              name="imagePath"
              value={imagePath}
              placeholder={user?.imagePath}
              onChange={onChange}
            />
          </div>

          <section className="form">
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={name}
                  placeholder={user?.name}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                  value={email}
                  placeholder={user?.email}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type={isShown ? "text" : "password"}
                  className="form-control"
                  id="newPassword"
                  name="newPassword"
                  value={newPassword}
                  placeholder="Enter a new password"
                  onChange={onChange}
                />
              </div>
              <div className="checkbox-container">
                <label htmlFor="checkbox">Show password? </label>
                <input
                  id="checkbox"
                  type="checkbox"
                  checked={isShown}
                  onClick={togglePassword}
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-block">
                  Submit
                </button>
              </div>
            </form>
          </section>
        </div>

        <section className="contentt stycon">
          {selectedRecipe && goBack ? (
            <>
              <div className="showRecipe">
                <button className="back-btn btn" onClick={() => handleGoBack()}>
                  <div className="teksX">x</div>
                </button>
                <RecipeItem recipe={selectedRecipe} />
              </div>
            </>
          ) : (
            <div className="recipes column listrec">
              <div className="slider-container swiper">
                <div
                  className="slider-content"
                  breakpoints={{
                    960: {
                      slidesPerView: 1,
                      spaceBetween: 5,
                    },
                    1800: {
                      slidesPerView: 2,
                      spaceBetween: 15,
                    },
                    2200: {
                      slidesPerView: 3,
                      spaceBetween: 25,
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
                        <p>You haven't posted anything yet!</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="swiper-button-next"></div>
                <div className="swiper-button-prev"></div>
                <div className="swiper-pagination"></div>
              </div>
              <button className="add-recipe" onClick={handleAddRecipe}>
                ADD RECIPE
              </button>
            </div>
          )}
        </section>
      </div>
    </>
  );
}

export default Profile;
