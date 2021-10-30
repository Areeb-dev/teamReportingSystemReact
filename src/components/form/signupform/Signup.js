import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField, { Input } from "@mui/material/TextField";
import "./Signup.css";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useHistory } from "react-router-dom";
import {Alert} from "@mui/material";
import firebaseConfig from '../../firebase/Firebase'
import { getFirestore } from "firebase/firestore";
import { addDoc, collection } from "firebase/firestore";

const app = initializeApp(firebaseConfig);
function SignupForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Username, setUsername]= useState("")

  const history = useHistory();
  const [isError, setIsError] = useState(false);
  const [errorCode, setErrorCode] = useState("");
  
  const submitForm = (e) => {
    e.preventDefault();
    // //firebase create user
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        UserData(e)
        history.push("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        const errorCode = error.code;
        setErrorCode(errorCode)
        setIsError(true);
      });
  };

  //store userdata in firebase
  const db = getFirestore();
  async function UserData(user) {
    try {
      const docRef = await addDoc(collection(db, "Users"), {
        email,
        password,
        Username,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  const handleError = () => {
    if(errorCode === "auth/invalid-email"){
        return "Email and Password field cannot be empty."
      }else if (errorCode === "auth/user-not-found"){
        return "User not found Please signup first."
      }else{
        return "Email-already-in-use"
      }
  }
  return (
    <Box className="box">
      <h2>SignUp Form</h2>
      <form onSubmit={submitForm}>
        <TextField
          className="Namefeild"
          id="outlined-basic"
          label="Name"
          placeholder="Enter your name"
          variant="outlined"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <br></br>
        <TextField
          className="emailFeild"
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
            <Button type="submit" variant="contained" color="success">
              Sign Up
            </Button>
          </Stack>
        </div>
        {isError ? (
          <Alert id="alertmessage" severity="error">
            { 
              handleError()
            }
          </Alert>
        ) : (
          ""
        )}
      </form>
      <h4>
        Have already an account? <Link to="/">Login Here</Link>
      </h4>
    </Box>
  );
}

export default SignupForm;
