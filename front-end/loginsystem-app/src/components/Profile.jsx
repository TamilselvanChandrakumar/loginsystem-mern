import React, { useState } from "react";
import avator from "../assets/profile.png";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { Toaster } from "react-hot-toast";
import styles from "../styles/Username.module.css";
import { profileValidate } from "../helper/validate";
import convertToBase64 from "../helper/convert";

const Profile = () => {
  const [file, setFile] = useState();

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      mobile: "",
      email: "",
      address: "",
    },
    validate: profileValidate,
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
      <span>You can update the details</span>
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
            {...formik.getFieldProps("firstname")}
            type="text"
            placeholder="enter firstname"
          />
          <input
            {...formik.getFieldProps("lastname")}
            type="text"
            placeholder="enter lastname"
          />
        </div>
        <div>
          <input
            {...formik.getFieldProps("mobile")}
            type="text"
            placeholder="mobile"
          />
          <input
            {...formik.getFieldProps("email")}
            type="email"
            placeholder="email"
          />
        </div>
        <div>
          <input
            {...formik.getFieldProps("address")}
            type="text"
            placeholder="address"
          />
        </div>
        <button type="submit">Update</button>

        <div>
          <span>
            come back after ? <Link to="/">Logout</Link>
          </span>
        </div>
      </form>
    </>
  );
};

export default Profile;
