import React, { useState } from "react";
import "./sign.scss";
import { motion } from "framer-motion";
import { registerUser } from "../../redux/auth/actions";
import { connect } from "react-redux";
import { setAlert } from "../../redux/alert/action";

const SignUp = ({ setAccount, registerUser, setAlert }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    password2: "",
  });
  const [file, setFile] = useState("");
  const [error, setError] = useState("");
  const Types = ["image/png", "image/jpeg"];

  const fileHandler = (e) => {
    let selected = e.target.files[0];
    if (selected && Types.includes(selected.type)) {
      setError("");
      setFile(selected);
    } else {
      setFile(null);
      setError("Please select an image file (png or jpeg)");
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const { username, password, password2 } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords does not match", "danger");
      return;
    }
    if (file) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "insta-clone");
      data.append("cloud_name", "dxagz60ab");
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dxagz60ab/image/upload",
        {
          method: "post",
          body: data,
        }
      );
      const dataRes = await res.json();
      registerUser({ username, picture: dataRes.url, password });
    }
    setFormData({
      username: "",
      password: "",
      password2: "",
    });
    setFile("");
    setError("");
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: "100vw" }}
      animate={{ opacity: 1, x: 0, transition: { delay: 0.5, duration: 1 } }}
      exit={{ opacity: 0, transition: { ease: "easeInOut" } }}
      className='sign'
    >
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className='file-group'>
          <label className='file-input'>
            <input type='file' onChange={fileHandler} />
            <span>Upload image</span>
          </label>
          {file && (
            <span style={{ color: "green" }} className='output'>
              {file.name}
            </span>
          )}
          {error && (
            <span style={{ color: "red", width: "100%" }} className='output'>
              {error}
            </span>
          )}
        </div>

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
            className='input-group'
            onChange={handleChange}
            type='password'
            name='password'
            placeholder='password'
          />
        </div>
        <div className='form-group'>
          <label>Confirm Password</label>
          <input
            value={password2}
            onChange={handleChange}
            name='password2'
            className='input-group'
            type='password'
            placeholder='Confirm password'
          />
        </div>
        <input type='submit' value='Sign Up' />
      </form>
      <p className='lead'>
        Already have an account ?{" "}
        <span onClick={() => setAccount(true)} className='blue'>
          Sign In
        </span>
      </p>
    </motion.div>
  );
};

export default connect(null, { registerUser, setAlert })(SignUp);
