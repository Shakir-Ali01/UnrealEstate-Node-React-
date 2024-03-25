import React, { useEffect, useState } from "react";
import "./MyProfile.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaUser } from "react-icons/fa";
// import { FaPhone } from "react-icons/fa";
import { FaMailBulk } from "react-icons/fa";
import { FaMobileAlt } from "react-icons/fa";
import { FaHashtag } from "react-icons/fa";

function MyProfile() {
  //state to hold the form details thst needs to be added when coach enters the values the state get updated
  const [details, setDetails] = useState({
    name: "",
    emailId: "",
    password: "",
    mobileNo: "",
    username: "",
  });
  //state variable to indicate wheater coach given values to all mandatory fileds of the form

  const [errorMessage, setErrorMessage] = useState(false);
  const [mandatory, setMandatory] = useState(false);
  const [valid, setValid] = useState(false);
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [alertPopup, setAlertPopup] = useState(false);
  useEffect(() => {
    (async () => {
      let result = await axios.get("/users/" + userId + "?action=edit");
      setDetails({
        ...details,
        name: result.data.name,
        emailId: result.data.emailId,
        password: result.data.password,
        mobileNo: result.data.mobileNo,
        username: result.data.username,
      });
      setUserData(result.data);
      console.log(result.data);
    })();
    // eslint-disable-next-line
  }, [userId]);
  //state to hold the individual validation errors of the form
  const [formErrors, setFormErrors] = useState({
    nameError: "",
    passwordError: "",
    mobileNoError: "",
    emailIdError: "",
    emailIdUniqueError: "",
    mobileNoUniqueError: "",
  });
  const [messages] = useState({
    MANDATAROY: "Enter All The Form Fields",
    ERROR: "Something went Wrong",
    NAMEVALUE_ERROR: "Name should have 3 to 50 characters",
    PASSWORDVALUE_ERROR:
      "Password should have at least 1 (special char,digit,uppercase letter,lowercase letter)",
    NUMBERVALUE_ERROR: "Mobile Number should have 10 digits",
    EMAILVALUE_ERROR: "Email Should Not be blank",
    EMAILISUNIQUE_ERROR: "This Email Is Already Register",
    MOBILENOISUNIQUE_ERROR: "This Mobile Number Is Already Register",
    ERROR_MESSAGE: "Server Error Occured.Please Try Again",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      details.name === "" ||
      details.emailId === "" ||
      details.mobileNo === "" ||
      details.password === ""
    ) {
      setMandatory(true);
    } else {
      (async () => {
        try {
          console.log("dello");
          console.log(details);
          let result = await axios.put("/users", details);
          console.log(result.data);
          if (result.data) {
            setAlertPopup(true);
          }
        } catch (error) {
          setErrorMessage(true);
          console.log(error);
        }
      })();
    }
  };
  //debounce
  const debounce = (callback, delay) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  };
  //end debounce
  const handleChange = (event) => {
    setValid(true);
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
      case "emailId":
        const checkEmail = async (value) => {
          const userInfo = await axios.get(
            "/users/checkUserEmailForUpdate/" +
              value +
              "?userId=" +
              userData._id
          );
          if (userInfo.data.exists === true) {
            setFormErrors({
              ...formErrors,
              emailIdUniqueError: messages.EMAILISUNIQUE_ERROR,
            });
            console.log(userInfo.status);
          } else {
            setFormErrors({ ...formErrors, emailIdUniqueError: "" });
          }
        };
        if (value === "") {
          errors.emailIdUniqueError = "";
          errors.emailIdError = messages.EMAILVALUE_ERROR;
        } else {
          errors.emailIdError = "";
          console.log("Ok");
          checkEmail(value);
        }
        break;
      case "mobileNo":
        const checkMobileNo = async () => {
          //
          const userDat = await axios.get(
            "/users/checkMobileNoForUpdate/" + value + "?userId=" + userData._id
          );
          if (userDat.data.exists === true) {
            setFormErrors({
              ...formErrors,
              mobileNoUniqueError: messages.MOBILENOISUNIQUE_ERROR,
            });
            console.log(userDat.status);
          } else {
            setFormErrors({ ...formErrors, mobileNoUniqueError: "" });
          }
        };
        if (!numberRegex.test(value)) {
          errors.mobileNoUniqueError = "";
          errors.mobileNoError = messages.NUMBERVALUE_ERROR;
        } else {
          errors.mobileNoError = "";
          checkMobileNo(value);
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
      details.name === "" ||
      details.password === ""
    ) {
      setValid(true);
    } else {
      if (
        formErrors.mobileNoError === "" &&
        formErrors.nameError === "" &&
        formErrors.emailIdError === "" &&
        formErrors.mobileNoUniqueError === "" &&
        formErrors.emailIdUniqueError === ""
      ) {
        setValid(false);
      }
    }
  };
  const debouncedHandleQuery = debounce(handleChange, 1000);
  return (
    <div className="container my-5">
      <div className="row">
        <div className="container">
          <div className="main-body">
            {alertPopup && (
              <div class="alert alert-success text-center alertPop text-light alert-dismissible">
                <strong>Success!</strong>&nbsp;&nbsp;Data updated successfully
              </div>
            )}
            <div className="row">
              <div className="col-lg-4 col-sm-12">
                <div className="pro" style={{ marginLeft: "20px" }}>
                  <div
                    className="card-body"
                    style={{ color: "white", marginLeft: "20px" }}
                  >
                    <div className="d-flex flex-column align-items-center text-center">
                      <img
                        src="/login.png"
                        alt="Admin"
                        className="rounded-circle p-1"
                        width={85}
                        height={80}
                      />
                      <div className="mt-3">
                        <h4>{userData?.name}</h4>
                        <p className="text-secondary mb-1">
                          ({userData?.role})
                        </p>
                        {/* <p className="text-muted font-size-sm">
                Bay Area, San Francisco, CA
              </p> */}
                      </div>
                    </div>
                    <hr className="my-4 item-style" />
                    <div className="infoSection">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap item-style">
                          <h6 className="mb-0">
                            <FaHashtag />
                            &nbsp;&nbsp; ID
                          </h6>
                          <span className="text-light">{userData?._id}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap item-style">
                          <h6 className="mb-0">
                            <FaMailBulk />
                            &nbsp;&nbsp; Email
                          </h6>
                          <span className="text-light">
                            {userData?.emailId}
                          </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap item-style">
                          <h6 className="mb-0">
                            <FaMobileAlt />
                            &nbsp;&nbsp; Phone
                          </h6>
                          <span className="text-light">
                            {userData?.mobileNo}
                          </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap item-style">
                          <h6 className="mb-0">
                            <FaUser />
                            &nbsp;&nbsp; UserName
                          </h6>
                          <span className="text-light">
                            {userData?.username}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-8  col-sm-12 profile">
                <form
                  className="row mx-5 resForm"
                  onSubmit={(event) => {
                    handleSubmit(event);
                  }}
                >
                  <h3>
                    <span className="hColor">Update </span>Info
                  </h3>
                  <div className="col-md-6 pb-3">
                    <label htmlFor="username"></label>
                    <input
                      type="text"
                      onChange={handleChange}
                      defaultValue={userData?.name}
                      placeholder="Enter Name Here"
                      name="name"
                      id="username"
                    />
                    <span className="text-danger errorSize">
                      {formErrors.nameError ? messages.NAMEVALUE_ERROR : null}
                    </span>
                  </div>
                  <div className="col-md-6 mb-4">
                    <label htmlFor="emailId"></label>
                    <input
                      type="emailId"
                      name="emailId"
                      onChange={debouncedHandleQuery}
                      defaultValue={userData?.emailId}
                      placeholder="Enter Email Here"
                      id="email"
                    />
                    <span className="text-danger errorSize">
                      {formErrors.emailIdError
                        ? messages.EMAILVALUE_ERROR
                        : null}
                    </span>
                    <span className="text-danger errorSize">
                      {formErrors.emailIdUniqueError
                        ? messages.EMAILISUNIQUE_ERROR
                        : null}
                    </span>
                  </div>
                  <div className="col-md-6 mb-4">
                    <label htmlFor="mobileNo"></label>
                    <input
                      type="text"
                      name="mobileNo"
                      onChange={debouncedHandleQuery}
                      defaultValue={userData?.mobileNo}
                      placeholder="Enter Moblie Number Here"
                      maxLength={10}
                    />
                    <span className="text-danger errorSize">
                      {formErrors.mobileNoError
                        ? messages.NUMBERVALUE_ERROR
                        : null}
                    </span>
                    <span className="text-danger errorSize">
                      {formErrors.mobileNoUniqueError
                        ? messages.MOBILENOISUNIQUE_ERROR
                        : null}
                    </span>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="password"></label>
                    <input
                      type="password"
                      name="password"
                      onChange={handleChange}
                      defaultValue={userData?.password}
                      placeholder="Enter Password Here"
                      id="password"
                    />
                    <span className="text-danger errorSize">
                      {formErrors.passwordError
                        ? messages.PASSWORDVALUE_ERROR
                        : null}
                    </span>
                  </div>

                  <div className="col-md-12">
                    <button
                      type="submit"
                      id="submit_button"
                      style={{ height: "50px" }}
                      disabled={valid}
                    >
                      Save Changes
                    </button>
                    {mandatory ? (
                      <div className="text-danger text-center errorSize-2">
                        All fields are mandatory!
                      </div>
                    ) : null}
                    {errorMessage ? (
                      <div className="text-danger text-center errorSize-2">
                        {messages.ERROR_MESSAGE}
                      </div>
                    ) : null}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
