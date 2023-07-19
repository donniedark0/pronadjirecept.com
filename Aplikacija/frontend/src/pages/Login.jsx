import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import '../components/Navbar.css';
import '../components/Button.css';

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState('');
  const [isShown, setIsSHown] = useState(false);
  
  
  const togglePassword = () => {
    setIsSHown((isShown) => !isShown);
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
      navigate("/login");
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

    const userData = {
      email,
      password,
    };
    
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email || reg.test(email) === false) {
      alert('Email Field is Invalid.');
    }
    else if (!password) {
      alert('Password field is required.');
    }
    
    dispatch(login(userData));

    console.log(dispatch);



  };

  if (isLoading) {
    return <Spinner />;
  }
  
  


  return (
    <>
      <div className="container">
        <section className="heading line">
          <h1>
            <FaUser /> Login
          </h1>
          <p>Welcome</p>
        </section>

        <section className="form">
        {error && <p>{error}</p>}
          <form onSubmit={onSubmit}>
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
              <span className="text-danger">{setError}</span>
            </div>
            <div className="form-group">
              <input 
                  type={isShown ? "text" : "password"}
                  className="form-control" 
                  id='password' 
                  name='password' 
                  value={password} 
                  placeholder='Enter your password' 
                  onChange={onChange}
              />
            </div>
              <form className="form-control" onSubmit={(e) => e.preventDefault()}>
                <div className="checkbox-container form-control">
                  <label htmlFor="checkbox"> Show password? </label>
                    <input
                      id="checkbox"
                      type="checkbox"
                      checked={isShown}
                      onChange={togglePassword}
                    />
                </div>
              </form>
         

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

export default Login;
