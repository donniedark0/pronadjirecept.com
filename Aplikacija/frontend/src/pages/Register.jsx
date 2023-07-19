import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
 
  const [isShown1, setIsSHown1] = useState(false);

  const togglePassword1 = () => {
    setIsSHown1((isShown1) => !isShown1);
  };

  const [isShown2, setIsSHown2] = useState(false);
  
  const togglePassword2 = () => {
    setIsSHown2((isShown2) => !isShown2);
  };

  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }
    else{
      navigate("/register");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email || reg.test(email) === false) {
      alert('Email Field is Invalid.');
    }
    else if (!password) {
      alert('Password field is required.');
    }
    else if (!password2) {
      alert('Confirm password field is required.');
    }

    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="container">
        <section className="heading">
          <h1>
            <FaUser /> Register
          </h1>
          <p>Please create an account</p>
        </section>

        <section className="form">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={name}
                placeholder="Enter your name"
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
                placeholder="Enter your email"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input 
                  type={isShown1 ? "text" : "password"}
                  className="form-control" 
                  id='password' 
                  name='password' 
                  value={password} 
                  placeholder='Enter your password' 
                  onChange={onChange}
              />
            </div>
            
              <div className="checkbox-container">
                <label htmlFor="checkbox">Show password? </label>
                  <input
                    id="checkbox"
                    type="checkbox"
                    checked={isShown1}
                    onClick={togglePassword1}
                  />
              </div>
           
            <div className="form-group typePass">
              <input 
                  type={isShown2 ? "text" : "password"}
                  className="form-control" 
                  id='password2' 
                  name='password2' 
                  value={password2} 
                  placeholder='Confirm password' 
                  onChange={onChange}
              />
            </div>
           
              <div className="checkbox-container">
                <label htmlFor="checkbox2">Show password? </label>
                  <input
                    id="checkbox2"
                    type="checkbox"
                    checked={isShown2}
                    onClick={togglePassword2}
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
    </>
  );
}

export default Register;
