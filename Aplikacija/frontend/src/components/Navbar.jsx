import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./Button";
import "./Navbar.css";
import "./Button.css";
import { useSelector, useDispatch } from "react-redux";
import {
  FaTimes,
  FaBars,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { logout, reset } from "../features/auth/authSlice";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const handleImageClick = () => {
    navigate("/profile");
  };
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            RecipeSearch.com
            <i className="fab fa-typo3" />
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            {click ? <FaTimes /> : <FaBars />}
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/search"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Search
              </Link>
            </li>

            {user ? (
              <>
                <li className="profile-button" onClick={closeMobileMenu}>
                  <img
                    src={user.imagePath}
                    className="profile-picture-small"
                    onClick={() => handleImageClick()}
                  />
                </li>
                <li>
                  <button className="nav-links-mobile" onClick={onLogout}>
                    <FaSignOutAlt /> Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="nav-links-mobile"
                    onClick={closeMobileMenu}
                  >
                    <FaSignInAlt /> Log in
                  </Link>
                  <Link
                    to="/register"
                    className="nav-links-mobile"
                    onClick={closeMobileMenu}
                  >
                    <FaUser /> Register
                  </Link>
                </li>
              </>
            )}
          </ul>

          <div className="btnn-mobile">
            {user ? (
              <>
                {button && (
                  <Button buttonStyle="btnn--outline" onClick={onLogout}>
                    <FaSignOutAlt /> Logout
                  </Button>
                )}
              </>
            ) : (
              <>
                {button && (
                  <Link to="/login">
                    <Button buttonStyle="btnn--outline">
                      <FaSignInAlt /> Log in
                    </Button>
                  </Link>
                )}

                {button && (
                  <Link to="/register">
                    <Button buttonStyle="btnn--outline">
                      <FaUser /> Register
                    </Button>
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
