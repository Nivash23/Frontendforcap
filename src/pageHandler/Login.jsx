import React, { useState } from "react";
import "../styles/App.css";
import { BrowserRouter, Link } from "react-router-dom";
import "../App";
import RegisterForm from "./Registeration";

const LoginFrom = () => {
  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);


  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    // const { setIsRegistered} = useContext(MessageContext);
    const Loginbody = {
      username: loginFormData.username,
      password: loginFormData.password,
    };
    // const [loginFormData, setLoginFormData] = useState({
    //   username: "",
    //   password: "",
    // });

    const response = await fetch(
      "https://backendforcapstone-cokw.onrender.com/api/Login/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Loginbody),
      }
    );
    const data = await response.json();

    if (response.status == 200) {
      console.log("user Login sucessfully..");
      console.log(data);
      setLoginFormData({
        username: "",
        password: "",
      });
      alert("username login sucessfully..");
      setLoading(false);
      // setIsRegistered(true);
    } else {
      console.log("invalid username or password");
      console.log(data);
    }
  };
  return (
    <div id="container">
      <div>
        <h1>LOGIN PAGE</h1>
        <form onSubmit={handleLogin}>
          <div id="username">
            <label>Username :</label>
            <input
              type="email"
              placeholder="Email..."
              value={loginFormData.username}
              required
              onChange={(e) =>
                setLoginFormData({
                  ...loginFormData,
                  username: e.target.value,
                })
              }
            />
          </div>
          <div id="password">
            <label>Password :</label>
            <input
              type="password"
              placeholder="password..."
              value={loginFormData.password}
              required
              onChange={(e) =>
                setLoginFormData({
                  ...loginFormData,
                  password: e.target.value,
                })
              }
            />
          </div>
          {loading ? (
            <div class="spinner-border" id="load" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          ) : null}
          <button type="submit">Login</button>
          <div>
            Create new Account ? please <Link to="/">Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default LoginFrom;
