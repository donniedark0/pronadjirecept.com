import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { register, reset } from "./features/auth/authSlice";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import NewRecipeForm from "./pages/NewRecipeForm";




function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" exact Component={Home} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/addRecipe" element={<NewRecipeForm />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;
