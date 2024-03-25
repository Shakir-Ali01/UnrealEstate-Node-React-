import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/features/user/userSlice";
import "./Login.css";

function Login() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [details, setDetails] = useState({
    username: "",
    password: "",
  });

  const [mandatory, setMandatory] = useState(false);
  const [valid, setValid] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const handleChange = (e) => {
    setLoginError(false);
    if (details.username !== "" && details.password !== "") {
      setValid(true);
    }
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    if (details.username === "" || details.password === "") {
      setValid(false);
    } else {
      e.preventDefault();
      if (details.username === "" || details.password === "") {
        setMandatory(true);
      } else {
        (async () => {
          try {
            let result = await axios.post("/users/login", details);
            sessionStorage.setItem("sessionLoggedIn", true);
            sessionStorage.setItem("sessionUser", JSON.stringify(result.data));
            dispatch(loginUser(result.data));
            navigate("/");
          } catch (error) {
            setLoginError(error.response.data.error);
          }
        })();
      }
    }
  };

  return (
    <div className="row">
      <div className="col-md-2"></div>
      <div className="col-md-8">
        <form
          className="row mx-5 "
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <h3>
            <span className="hColor">LogIn</span>{" "}
          
          </h3>
          {loginError ? (
            <div class="alert alert-danger text-center alertPop  text-light">
              <strong>Error!</strong>&nbsp;&nbsp;{loginError}
            </div>
          ) : null}
          <div className="col-md-6 mb-4">
            <label htmlFor="username"></label>
            <input
              type="text"
              value={details.username}
              placeholder="Enter Username Here"
              name="username"
              id="username"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="col-md-6 mb-4">
            <label htmlFor="password"></label>
            <input
              type="password"
              name="password"
              value={details.password}
              onChange={(e) => handleChange(e)}
              placeholder="Enter Password Here"
              id="password"
            />
          </div>

          <div className="col-md-12">
            <button
              type="submit"
              id="submit_button"
              style={{ height: "50px" }}
              disabled={!valid}
            >
              LogIn
            </button>
            {mandatory ? (
              <div className="text-danger text-center errorSize-2">
                All fields are mandatory!
              </div>
            ) : null}
            <h5 className="msg text-center pt-2 mt-4">
              New User?&nbsp;
              <Link to="/register" style={{ textDecoration: "none" }}>
                <span className="hColor">SignUp</span>
              </Link>{" "}
              here
            </h5>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login;
