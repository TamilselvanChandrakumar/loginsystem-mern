import React from "react";
import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import styles from "../styles/Username.module.css";

const Recovery = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <h1 className={styles.color}>Recovery</h1>
      <span>Enter otp to recover password</span>
      <form>
        <h3>Enter 6 digit otp sent to your emaill address</h3>
        <div>
          <input type="text" placeholder="otp" />
        </div>
        <button type="submit">Recover</button>

        <div>
          <span>
            can't get otp <button>Resend</button>
          </span>
        </div>
      </form>
    </>
  );
};

export default Recovery;
