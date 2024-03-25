import React from "react";
import avator from "../assets/profile.png";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { Toaster } from "react-hot-toast";
import styles from "../styles/Username.module.css";
import { userNameValidate } from "../helper/validate";
const UserName = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validate: userNameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (value) => {
      console.log(value);
    },
  });

  return (
    <>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <h1 className={styles.color}>Hello again!</h1>
      <span>Explore More by connecting with us.</span>
      <form onSubmit={formik.handleSubmit}>
        <img className={styles.profileimg} src={avator} alt=""></img>
        <div>
          <input
            {...formik.getFieldProps("username")}
            type="text"
            placeholder="username"
          />
        </div>
        <button type="submit">Let's Go</button>

        <div>
          <span>
            Not a member <Link to="/register">Register Now</Link>
          </span>
        </div>
      </form>
    </>
  );
};

export default UserName;
