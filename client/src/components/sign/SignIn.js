import React, { useState } from "react";
import "./sign.scss";
import { motion } from "framer-motion";
import { connect } from "react-redux";
import { login } from "../../redux/auth/actions";

const SignIn = ({ setAccount, login }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const { username, password } = formData;
  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: "-100vh" }}
      animate={{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 1 } }}
      exit={{
        y: "100vh",
        transition: { ease: "easeInOut" },
      }}
      className='sign'
    >
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Username</label>
          <input
            value={username}
            name='username'
            onChange={handleChange}
            className='input-group'
            type='text'
            placeholder='Username'
          />
        </div>
        <div className='form-group'>
          <label>Password</label>
          <input
            value={password}
            name='password'
            onChange={handleChange}
            className='input-group'
            type='password'
            placeholder='password'
          />
        </div>
        <input type='submit' value='Sign In' />
      </form>
      <p className='lead'>
        You don't have an account ?{" "}
        <span onClick={() => setAccount(false)} className='blue'>
          Sign Up
        </span>
      </p>
    </motion.div>
  );
};

export default connect(null, { login })(SignIn);
