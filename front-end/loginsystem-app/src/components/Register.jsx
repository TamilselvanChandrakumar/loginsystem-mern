import React, { useState } from "react";
import avator from "../assets/profile.png";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { Toaster } from "react-hot-toast";
import styles from "../styles/Username.module.css";
import { registerValidation } from "../helper/validate";
import convertToBase64 from "../helper/convert";

const Register = () => {
  const [file, setFile] = useState();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profile: file || "" });
      console.log(values);
    },
  });

  const onupLoad = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };
  return (
    <>
      {" "}
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <h1 className={styles.color}>Register</h1>
      <span>Happy to join!</span>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="profile">
          <img
            className={styles.profileimg}
            src={file || avator}
            alt=""
            style={{ cursor: "pointer" }}
          ></img>
        </label>
        <input
          type="file"
          id="profile"
          name="profile"
          onChange={onupLoad}
        ></input>
        <div>
          <input
            {...formik.getFieldProps("username")}
            type="text"
            placeholder="enter username"
          />
        </div>
        <div>
          <input
            {...formik.getFieldProps("email")}
            type="email"
            placeholder="email"
          />
        </div>
        <div>
          <input
            {...formik.getFieldProps("password")}
            type="password"
            placeholder="password"
          />
        </div>
        <button type="submit">Register</button>

        <div>
          <span>
            Alreade Register? <Link to="/">Login Now</Link>
          </span>
        </div>
      </form>
    </>
  );
};

export default Register;
