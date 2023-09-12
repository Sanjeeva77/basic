import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  validateId,
  validateUsername,
  validatePassword,
  validateEmail,
} from "./Validation";

export const Form = (props) => {
  const [data, setData] = useState({
    id: "",
    username: "",
    password: "",
    email: "",
  });

  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState("");

  const changeHandler = (e, field) => {
    setData({ ...data, [field]: e.target.value });
  };

  const generateCaptcha = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captcha = "";
    const captchaLength = 6; // Adjust the length as needed

    for (let i = 0; i < captchaLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      captcha += characters.charAt(randomIndex);
    }

    setCaptcha(captcha);
  };

  useEffect(() => {
    // Generate the CAPTCHA when the component mounts
    generateCaptcha();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const idErrorMessage = validateId(data.id);
    const usernameErrorMessage = validateUsername(data.username);
    const passwordErrorMessage = validatePassword(data.password);
    const emailErrorMessage = validateEmail(data.email);

    document.getElementById("idError").textContent = idErrorMessage;
    document.getElementById("usernameError").textContent = usernameErrorMessage;
    document.getElementById("passwordError").textContent = passwordErrorMessage;
    document.getElementById("emailError").textContent = emailErrorMessage;

    if (
      idErrorMessage ||
      usernameErrorMessage ||
      passwordErrorMessage ||
      emailErrorMessage
    ) {
      return;
    }

    if (captchaInput.toLowerCase() !== captcha.toLowerCase()) {
      setCaptchaError("CAPTCHA is incorrect. Please try again.");
      return;
    }

    axios
      .post("http://localhost:8080/form", {
        id: data.id,
        username: data.username,
        password: data.password,
        email: data.email,
      })
      .then((response) => {
        alert("Data successfully inserted:", response.data);
      })
      .catch((error) => {
        alert("Error while inserting data:", error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="text-center pb-2">Login Form</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-group row pb-2">
                  <label htmlFor="id" className="col-sm-3 col-form-label">
                    ID
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      id="id"
                      placeholder="Enter your ID"
                      value={data.id}
                      onChange={(e) => changeHandler(e, "id")}
                    />
                    <span id="idError" className="text-danger"></span>
                  </div>
                </div>
                <div className="form-group row pb-2">
                  <label htmlFor="username" className="col-sm-3 col-form-label">
                    User Name
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      placeholder="Enter your username"
                      value={data.username}
                      onChange={(e) => changeHandler(e, "username")}
                    />
                    <span id="usernameError" className="text-danger"></span>
                  </div>
                </div>
                <div className="form-group row pb-2">
                  <label htmlFor="password" className="col-sm-3 col-form-label">
                    Password
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter your password"
                      value={data.password}
                      onChange={(e) => changeHandler(e, "password")}
                    />
                    <span id="passwordError" className="text-danger"></span>
                  </div>
                </div>
                <div className="form-group row pb-2">
                  <label htmlFor="email" className="col-sm-3 col-form-label">
                    Email
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter your Email"
                      value={data.email}
                      onChange={(e) => changeHandler(e, "email")}
                    />
                    <span id="emailError" className="text-danger"></span>
                  </div>
                </div>
                <div className="form-group row pb-2">
                  <label className="col-sm-3 col-form-label pt-4">CAPTCHA</label>
                  <div className="col-sm-9">
                    <div id="captcha">{captcha}</div>
                    <input
                      type="text"
                      className="form-control"
                      id="captchaInput"
                      placeholder="Enter the CAPTCHA"
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                    />
                    <span id="captchaError" className="text-danger">
                      {captchaError}
                    </span>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block my-3"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
