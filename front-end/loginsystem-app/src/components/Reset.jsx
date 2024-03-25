import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { Toaster } from "react-hot-toast";
import styles from "../styles/Username.module.css";
import { resetPasswordValidation } from "../helper/validate";

const Reset = () => {
  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_pwd: "",
    },
    validate: resetPasswordValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (value) => {
      console.log(value);
    },
  });
  return (
    <>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <h1 className={styles.color}>Reset</h1>
      <span>Enter new password</span>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <input
            {...formik.getFieldProps("password")}
            type="password"
            placeholder="enterpassword"
          />
        </div>
        <div>
          <input
            {...formik.getFieldProps("confirm_pwd")}
            type="password"
            placeholder="reenter password"
          />
        </div>
        <button type="submit">Let's Go</button>

        <div>
          <button>Reset</button>
        </div>
      </form>
    </>
  );
};

export default Reset;
