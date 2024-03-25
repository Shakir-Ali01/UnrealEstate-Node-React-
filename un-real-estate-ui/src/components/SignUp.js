import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";
function SignUp() {
  //state to hold the form details thst needs to be added when coach enters the values the state get updated
  const [details, setDetails] = useState({
    name: "",
    emailId: "",
    password: "",
    mobileNo: "",
    gender: "Male",
    username: "",
    role: "owner",
  });

  //state to hold the individual validation errors of the form
  const [formErrors, setFormErrors] = useState({
    nameError: "",
    passwordError: "",
    mobileNoError: "",
    genderError: "",
    emailIdError: "",
    emailIdUniqueError: "",
    userNameUniqueError: "",
    mobileNoUniqueError: "",
    roleError: "",
    usernameError: "",
  });
  //state variable to indicate wheater coach given values to all mandatory fileds of the form
  const [mandatory, setMandatory] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [valid, setValid] = useState(false);
  const [alertPopup, setAlertPopup] = useState(false);
  const navigate = useNavigate();
  //A collection of few messages that the component display
  const [messages] = useState({
    MANDATAROY:"Enter All The Form Fields",
    ERROR:"Something went Wrong",
    NAMEVALUE_ERROR:"Name should have 3 to 50 characters",
    USERNAMEVALUE_ERROR:"User Name should have 3 to 50 characters",
    PASSWORDVALUE_ERROR:"Password should have at least 1 (special char,digit,uppercase letter,lowercase letter)",
    ROLEVALUE_ERROR:"Please Select Role",
    GENDERVALUE_ERROR:"Please Select Gender",
    NUMBERVALUE_ERROR:"Mobile Number should have 10 digits",
    EMAILVALUE_ERROR:"email should not be null",
    EMAILISUNIQUE_ERROR:"This Email Is Already Register",
    MOBILENOISUNIQUE_ERROR:"This Mobile Number Is Already Register",
    USERNAMEISUNIQUE_ERROR:"This UserName Already Exists.Please Try With Another",
    //"ERROR_MESSAGE":"This Number Is Already Register Please Try With Another Number",
    ERROR_MESSAGE: "Server Error Occured.Please Try Again",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      details.name === "" ||
      details.emailId === "" ||
      details.mobileNo === "" ||
      details.username === "" ||
      details.password === ""
    ) {
      setMandatory(true);
    } else {
      (async () => {
        try {
          console.log(details);
          let result = await axios.post("/users", details);
          console.log(result.data);
          if (result.data) {
            setAlertPopup(true);
            setTimeout(function () {
              navigate("/login");
            }, 3000);
          }
        } catch (error) {
          setErrorMessage(true);
          console.log(error);
        }
      })();
    }
  };
  const handleChange = (event) => {
    setValid(false);
    setMandatory(false);
    setErrorMessage(false);
    let errors = formErrors;
    let nameRegex = /^[a-zA-Z\s.]{3,50}$/;
    let passwordRegex =
      /^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%_&)~`*(])[a-zA-Z0-9!@#$%_&)~`*(]{8,})$/;
    let numberRegex = /^[0-9]{10}$/;
    //const onlyDigits = /^[0-9]+$/;
    let { name, value } = event.target;
    setDetails({ ...details, [name]: value });
    switch (name) {
      case "name":
        if (!nameRegex.test(value)) {
          errors.nameError = messages.NAMEVALUE_ERROR;
        } else {
          errors.nameError = "";
        }
        break;
      case "username":
        if (!nameRegex.test(value)) {
          errors.usernameError = messages.USERNAMEVALUE_ERROR;
        } else {
          errors.usernameError = "";
          (async () => {
            try {
              setFormErrors({ ...formErrors, userNameUniqueError: "" });
              let userData = await axios.get("/users/checkUserName/" + value);
              if (userData.data.exists === true) {
                setFormErrors({
                  ...formErrors,
                  userNameUniqueError: messages.USERNAMEISUNIQUE_ERROR,
                });
              } else {
                setFormErrors({ ...formErrors, userNameUniqueError: "" });
              }
            } catch (error) {
              console.log(error);
            }
          })();
        }
        break;
      case "emailId":
        if (value === "") {
          errors.emailIdError = messages.EMAILVALUE_ERROR;
        } else {
          errors.emailIdError = "";
          (async () => {
            try {
              setFormErrors({ ...formErrors, emailIdUniqueError: "" });
              let userData = await axios.get("/users/checkUserEmail/" + value);
              if (userData.data.exists === true) {
                setFormErrors({
                  ...formErrors,
                  emailIdUniqueError: messages.EMAILISUNIQUE_ERROR,
                });
                //errors.emailIdUniqueError = messages.EMAILVALUE_ERROR;
                console.log(userData.status);
              } else {
                setFormErrors({ ...formErrors, emailIdUniqueError: "" });
              }
            } catch (error) {
              console.log(error);
            }
          })();
        }
        break;
      case "gender":
        if (value === "") {
          errors.genderError = messages.GENDERVALUE_ERROR;
        } else {
          errors.genderError = "";
        }
        break;
      case "role":
        if (value === "") {
          errors.roleError = messages.ROLEVALUE_ERROR;
        } else {
          errors.roleError = "";
        }
        break;

      case "mobileNo":
        if (!numberRegex.test(value)) {
          errors.mobileNoUniqueError = "";
          errors.mobileNoError = messages.NUMBERVALUE_ERROR;
        } else {
          errors.mobileNoError = "";
          (async () => {
            try {
              let userData = await axios.get(
                "/users/checkUserMobileNo/" + value
              );
              if (userData.data.exists === true) {
                setFormErrors({
                  ...formErrors,
                  mobileNoUniqueError: messages.MOBILENOISUNIQUE_ERROR,
                });
                console.log(userData.status);
              } else {
                setFormErrors({ ...formErrors, mobileNoUniqueError: "" });
              }
            } catch (error) {
              console.log(error);
            }
          })();
        }
        break;
      case "password":
        if (value.match(passwordRegex)) {
          errors.passwordError = "";
        } else {
          errors.passwordError = messages.PASSWORDVALUE_ERROR;
        }
        break;

      default:
        break;
    }
    setFormErrors(errors);
    if (
      details.emailId === "" ||
      details.mobileNo === "" ||
      details.username === ""
    ) {
      setValid(false);
    } else {
      if (
        formErrors.mobileNoError === "" &&
        formErrors.usernameError === "" &&
        formErrors.emailIdError === "" &&
        formErrors.mobileNoUniqueError === "" &&
        formErrors.emailIdUniqueError === "" &&
        formErrors.userNameUniqueError === ""
      ) {
        setValid(true);
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
          {alertPopup && (
            <div class="alert alert-success text-center alertPop text-light">
              <strong>Success!</strong>&nbsp;&nbsp; Navigating To Login
              Page.....
            </div>
          )}
          <h3>
            <span className="hColor">SignUp</span> Here
          </h3>
          <div className="col-md-4 mb-4">
            {/*<label htmlFor="username">Name</label> */}

            <input
              type="text"
              value={details.name}
              name="name"
              onChange={handleChange}
              placeholder="Enter Name Here"
            />
            <span className="text-danger errorSize">
              {formErrors.nameError ? messages.NAMEVALUE_ERROR : null}
            </span>
          </div>
          <div className="col-md-4 mb-4">
            {/*<label htmlFor="username">Email</label>*/}
            <input
              type="email"
              placeholder="Enter Email Here"
              name="emailId"
              value={details.emailId}
              onChange={handleChange}
            />
            <span className="text-danger errorSize">
              {formErrors.emailIdError ? messages.EMAILVALUE_ERROR : null}
            </span>
            <span className="text-danger errorSize">
              {formErrors.emailIdUniqueError
                ? messages.EMAILISUNIQUE_ERROR
                : null}
            </span>
          </div>
          <div className="col-md-4 mb-4">
            {/*<label htmlFor="mobileNo">Mobile Number</label>*/}
            <input
              type="text"
              name="mobileNo"
              onChange={handleChange}
              value={details.mobileNo}
              placeholder="Enter Mobile Number Here"
              maxLength={10}
            />
            <span className="text-danger errorSize">
              {formErrors.mobileNoError ? messages.NUMBERVALUE_ERROR : null}
            </span>
            <span className="text-danger errorSize">
              {formErrors.mobileNoUniqueError
                ? messages.MOBILENOISUNIQUE_ERROR
                : null}
            </span>
          </div>
          <div className="col-md-6 mb-4">
            {/*<label htmlFor="username">Username</label>*/}
            <input
              type="text"
              onChange={handleChange}
              value={details.username}
              placeholder="Enter Username Here"
              name="username"
              id="username"
            />
            <span className="text-danger errorSize">
              {formErrors.usernameError ? messages.USERNAMEVALUE_ERROR : null}
            </span>
            <span className="text-danger errorSize">
              {formErrors.userNameUniqueError
                ? messages.USERNAMEISUNIQUE_ERROR
                : null}
            </span>
          </div>
          <div className="col-md-6 mb-4">
            {/*  <label htmlFor="password">Password</label>*/}
            <input
              type="password"
              name="password"
              value={details.password}
              onChange={handleChange}
              placeholder="Password"
              id="password"
            />
            <span className="text-danger errorSize">
              {formErrors.passwordError ? messages.PASSWORDVALUE_ERROR : null}
            </span>
          </div>
          <div className="col-md-6 cntr mb-4">
            <label htmlFor="Role">Role</label>
            <label htmlFor="rdo-1" className="btn-radio">
              <input
                type="radio"
                id="rdo-1"
                value="owner"
                name="role"
                onChange={handleChange}
                defaultChecked
              />
              <svg width="20px" height="20px" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="9"></circle>
                <path
                  d="M10,7 C8.34314575,7 7,8.34314575 7,10 C7,11.6568542 8.34314575,13 10,13 C11.6568542,13 13,11.6568542 13,10 C13,8.34314575 11.6568542,7 10,7 Z"
                  className="inner"
                ></path>
                <path
                  d="M10,1 L10,1 L10,1 C14.9705627,1 19,5.02943725 19,10 L19,10 L19,10 C19,14.9705627 14.9705627,19 10,19 L10,19 L10,19 C5.02943725,19 1,14.9705627 1,10 L1,10 L1,10 C1,5.02943725 5.02943725,1 10,1 L10,1 Z"
                  className="outer"
                ></path>
              </svg>
              <span>&nbsp; Owner&nbsp;&nbsp;&nbsp;</span>
            </label>
            <label htmlFor="rdo-2" className="btn-radio">
              <input
                type="radio"
                id="rdo-2"
                value="agent"
                name="role"
                onChange={handleChange}
              />
              <svg width="20px" height="20px" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="9"></circle>
                <path
                  d="M10,7 C8.34314575,7 7,8.34314575 7,10 C7,11.6568542 8.34314575,13 10,13 C11.6568542,13 13,11.6568542 13,10 C13,8.34314575 11.6568542,7 10,7 Z"
                  className="inner"
                ></path>
                <path
                  d="M10,1 L10,1 L10,1 C14.9705627,1 19,5.02943725 19,10 L19,10 L19,10 C19,14.9705627 14.9705627,19 10,19 L10,19 L10,19 C5.02943725,19 1,14.9705627 1,10 L1,10 L1,10 C1,5.02943725 5.02943725,1 10,1 L10,1 Z"
                  className="outer"
                ></path>
              </svg>
              <span>&nbsp;&nbsp;Agent&nbsp;&nbsp;&nbsp;</span>
            </label>
            <label htmlFor="rdo-3" className="btn-radio">
              <input
                type="radio"
                id="rdo-3"
                value="tenant"
                name="role"
                onChange={handleChange}
              />
              <svg width="20px" height="20px" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="9"></circle>
                <path
                  d="M10,7 C8.34314575,7 7,8.34314575 7,10 C7,11.6568542 8.34314575,13 10,13 C11.6568542,13 13,11.6568542 13,10 C13,8.34314575 11.6568542,7 10,7 Z"
                  className="inner"
                ></path>
                <path
                  d="M10,1 L10,1 L10,1 C14.9705627,1 19,5.02943725 19,10 L19,10 L19,10 C19,14.9705627 14.9705627,19 10,19 L10,19 L10,19 C5.02943725,19 1,14.9705627 1,10 L1,10 L1,10 C1,5.02943725 5.02943725,1 10,1 L10,1 Z"
                  className="outer"
                ></path>
              </svg>
              <span>&nbsp;&nbsp;Tenant</span>
            </label>

            {/* <span className="text-danger errorSize">
            {formErrors.roleError ? messages.ROLEVALUE_ERROR : null}
          </span> */}
          </div>
          <div className="col-md-6 cntr">
            <label htmlFor="Gender">Gender</label>
            <label htmlFor="rdo-4" className="btn-radio">
              <input
                type="radio"
                id="rdo-4"
                value="Male"
                name="gender"
                onChange={handleChange}
                defaultChecked
              />
              <svg width="20px" height="20px" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="9"></circle>
                <path
                  d="M10,7 C8.34314575,7 7,8.34314575 7,10 C7,11.6568542 8.34314575,13 10,13 C11.6568542,13 13,11.6568542 13,10 C13,8.34314575 11.6568542,7 10,7 Z"
                  className="inner"
                ></path>
                <path
                  d="M10,1 L10,1 L10,1 C14.9705627,1 19,5.02943725 19,10 L19,10 L19,10 C19,14.9705627 14.9705627,19 10,19 L10,19 L10,19 C5.02943725,19 1,14.9705627 1,10 L1,10 L1,10 C1,5.02943725 5.02943725,1 10,1 L10,1 Z"
                  className="outer"
                ></path>
              </svg>
              <span>&nbsp; Male&nbsp;&nbsp;&nbsp;</span>
            </label>
            <label htmlFor="rdo-5" className="btn-radio">
              <input
                type="radio"
                id="rdo-5"
                value="FeMale"
                name="gender"
                onChange={handleChange}
              />
              <svg width="20px" height="20px" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="9"></circle>
                <path
                  d="M10,7 C8.34314575,7 7,8.34314575 7,10 C7,11.6568542 8.34314575,13 10,13 C11.6568542,13 13,11.6568542 13,10 C13,8.34314575 11.6568542,7 10,7 Z"
                  className="inner"
                ></path>
                <path
                  d="M10,1 L10,1 L10,1 C14.9705627,1 19,5.02943725 19,10 L19,10 L19,10 C19,14.9705627 14.9705627,19 10,19 L10,19 L10,19 C5.02943725,19 1,14.9705627 1,10 L1,10 L1,10 C1,5.02943725 5.02943725,1 10,1 L10,1 Z"
                  className="outer"
                ></path>
              </svg>
              <span>&nbsp;&nbsp;Female</span>
            </label>

            <span className="text-danger errorSize">
              {formErrors.genderError ? messages.GENDERVALUE_ERROR : null}
            </span>
          </div>

          <div className="col-md-12">
            <button
              type="submit"
              id="submit_button"
              style={{ height: "50px" }}
              disabled={!valid}
            >
              Sign Up
            </button>
          </div>
          {mandatory ? (
            <div className="text-danger text-center errorSize-2">
              {messages.MANDATAROY}
            </div>
          ) : null}
          {errorMessage ? (
            <div className="text-danger text-center errorSize-2">
              {messages.ERROR_MESSAGE}
            </div>
          ) : null}
          <h5 className="msg text-center pt-2 mt-4">
            Already Registered?&nbsp;
            <Link to="/login" style={{ textDecoration: "none" }}>
              <span className="hColor">Login</span>
            </Link>{" "}
            here
          </h5>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
