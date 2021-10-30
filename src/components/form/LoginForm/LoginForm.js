import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./LoginForm.css";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Link, useHistory } from "react-router-dom";
import { Alert } from "@mui/material";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../../firebase/Firebase";
//

const app = initializeApp(firebaseConfig);
function Loginform() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [isError, setIsError] = useState(false);
  const [errorCode, setErrorCode] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();
    //firebase authenication
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        //current login user email
        localStorage.setItem("Login User", JSON.stringify(email));
        history.push("/HomePage");
      })
      .catch((error) => {
        const errorCode = error.code;
        setErrorCode(errorCode);
        setIsError(true);
      });
  };

  const handleError = () => {
    if (errorCode === "auth/invalid-email") {
      return "Email and Password field cannot be empty.";
    } else if (errorCode === "auth/user-not-found") {
      return "User not found Please signup first.";
    } else {
      return "Invalid Credentials";
    }
  };
  //
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //

  return (
    <Box className="box">
      <h2>Login Form</h2>
      <form onSubmit={submitForm}>
        <TextField
          className="Emailfeild"
          id="outlined-basic"
          label="Email"
          placeholder="Enter your Email"
          variant="outlined"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br></br>
        <TextField
          type="password"
          className="Passwordfeild"
          id="outlined-basic"
          label="Password"
          placeholder="Enter your Password"
          variant="outlined"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        /> 
        <div id="loginbtn">
          <Stack direction="row" spacing={2}>
            <Button type="submits" variant="contained" color="success">
              Sign In
            </Button>
          </Stack>
        </div>
        {isError ? (
          <Alert id="alertmessage" severity="error">
            {handleError()}
          </Alert>
        ) : (
          ""
        )}
      </form>
      <h4>
        Don't have an account? <Link to="/signupform">Signup Here</Link>
      </h4>
    </Box>
  );
}
export default Loginform;
