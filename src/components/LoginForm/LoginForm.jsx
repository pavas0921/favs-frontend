import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Login, selectLoginState } from "../../features/login/loginSlice";
import { useNavigate } from "react-router-dom";
import "./login.css";

function LoginForm() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { token } = useSelector(selectLoginState);
  const { userid } = useSelector(selectLoginState);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("userid", userid);
      console.log("logged");
      goToFavs();
    } else {
      console.log("logged out", token);
    }
  }, [token, userid]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(Login(credentials));
  };

  const goToFavs = () => {
    navigate("/favs");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="main_div">
        <div className="title_div">
          <span>Favs App</span>
        </div>

        <div className="div_form">
          <div className="div_input">
            <input
              type="email"
              name="email"
              value={credentials.email}
              placeholder="Email"
              onChange={handleInputChange}
            />
          </div>
          <div className="div_input">
            <input
              type="password"
              name="password"
              value={credentials.password}
              placeholder="Password"
              onChange={handleInputChange}
            />
          </div>
          <div className="div_button">
            <button type="submit" className="login_button">
              Login
            </button>
            <button className="register_button">Register</button>
          </div>
          <div className="div_forgot">
            <a href="#">Forgot your password?</a>
          </div>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
