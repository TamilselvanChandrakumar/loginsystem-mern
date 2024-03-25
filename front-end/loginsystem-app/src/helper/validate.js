import toast from "react-hot-toast";

// validate login page username

export async function userNameValidate(values) {
  const errors = userNameVerify({}, values);

  return errors;
}

// validate password page

export async function userpasswordValidate(values) {
  const errors = userpasswordVerify({}, values);

  return errors;
}

// vaidate reset password

export async function resetPasswordValidation(values) {
  const errors = userpasswordVerify({}, values);

  if (values.password !== values.confirm_pwd) {
    errors.exist = toast.error("password not match");
  }
  return errors;
}

// validdate register page

export async function registerValidation(values) {
  const errors = userNameVerify({}, values);
  userpasswordVerify(errors, values);
  useremailVerify(errors, values);
  return errors;
}

// validate profile page

export async function profileValidate(values) {
  const errors = useremailVerify({}, values);

  return errors;
}

// validate username

function userNameVerify(error = {}, values) {
  if (!values.username) {
    error.username = toast.error("Username Required...!");
  } else if (values.username.includes(" ")) {
    error.username = toast.error("Invalid Username...!");
  } else if (values.username.length > 20) {
    error.username = toast.error("Sholdn't be too long...!");
  }
  return error;
}

// validate password:
function userpasswordVerify(error = {}, values) {
  if (!values.password) {
    error.password = toast.error("Password Required...!");
  } else if (values.password.includes(" ")) {
    error.password = toast.error("Invalid Password...!");
  } else if (values.password.length < 20) {
    error.password = toast.error("more character needs!");
  }
  return error;
}

// email verify
function useremailVerify(error = {}, values) {
  if (!values.email) {
    error.email = toast.error("email Required...!");
  } else if (values.email.includes(" ")) {
    error.eamil = toast.error("email Password...!");
  }
  return error;
}
