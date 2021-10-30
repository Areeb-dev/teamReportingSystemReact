import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import Stack from "@mui/material/Stack";
import "./Modal.css";
import { useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { addDoc, collection, getDocs } from "firebase/firestore";
import firebaseConfig from "../firebase/Firebase";
import { Grid, TextField, Button } from "@mui/material";

const app = initializeApp(firebaseConfig);
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "450px",
  bgcolor: "background.paper",
  border: "2px white #000",
  borderRadius: "15px",
  boxShadow: 24,
  p: 4,
};

function Modalpage() {
  const [open, setOpen] =useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //get value in modal feilds
  const [AdminEmail, setAdminEmail] = useState("");
  const [TeamName, setTeamName] = useState("");
  const [memberEmails, setMemberEmails] = useState([""]);

  const setMemberEmailEmpty = () => {
    if (memberEmails.length < 5) {
      let previous = [...memberEmails];
      previous.push("");
      setMemberEmails(previous);
    }
  };

  const setMemberEmail = (e, index) => {
    let temp = [...memberEmails];
    temp.splice(index, 1, e.target.value);
    setMemberEmails(temp);
  };

  const removeMemberEmail = (index) => {
    if(index != 0){
      let temp = [...memberEmails];
      temp.splice(index, 1);
      setMemberEmails(temp);
    }
  };

  function HandleTeamData(e) {
    e.preventDefault();
    console.log("member emails => ", memberEmails);
    Teamdata();
    handleClose(true);
  }
  // set Team data in firestore
  const db = getFirestore();
  async function Teamdata() {
    try {
      const docRef = await addDoc(collection(db, "Teamdata"), {
        TeamName,
        AdminEmail,
        memberEmails,
      });
      setAdminEmail("");
      memberEmails("");
      setTeamName("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <div>
      <Box className="btn-holder">
        <Button id="modalbtn" onClick={handleOpen} >
          <SpeedDialIcon id="plusicon"> </SpeedDialIcon>
        </Button>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <b id="teamheading">Create New Team</b>
            <br></br>
            <TextField
              className="Teamfeild"
              id="standard-basic modalfeilds"
              label="Team Name"
              placeholder="Enter your Team Name"
              variant="standard"
              onChange={(e) => {
                setTeamName(e.target.value);
              }}
              value={TeamName}
            />
            <TextField
              className="Teamfeild"
              id="standard-basic modalfeilds"
              label="Your Email"
              placeholder="Enter your Email"
              variant="standard"
              onChange={(e) => {
                setAdminEmail(e.target.value);
              }}
              value={AdminEmail}
            />

            {memberEmails.map((field, index) => {
              return (
                <Grid container sx={{ mt: 0 }} key={index}>
                  <TextField
                    className="Teamfeild"
                    id="standard-basic modalfeilds"
                    label={`Member Email ${index + 1}`}
                    placeholder="Enter your Member Email"
                    variant="standard"
                    onChange={(e) => {
                      setMemberEmail(e, index);
                    }}
                    value={field}
                  />
                  <Grid item alignItems="stretch" style={{ display: "flex" }}>
                    <Button
                      sx={{
                        mt: 2,
                        ml: 1,
                        maxWidth: "25px",
                        maxHeight: "25px",
                        minWidth: "25px",
                        minHeight: "25px",
                      }}
                      // color="secondary"
                      variant="outlined"
                      onClick={setMemberEmailEmpty}
                    >
                      +
                    </Button>
                    <Button
                      // color="danger"
                      color="error"
                      variant="outlined"
                      sx={{
                        mt: 2,
                        ml: 2,
                        maxWidth: "25px",
                        maxHeight: "25px",
                        minWidth: "25px",
                        minHeight: "25px",
                      }}
                      onClick={() => removeMemberEmail(index)}
                    >
                      -
                    </Button>
                  </Grid>
                </Grid>
              );
            })}

            {/*  */}
            <Stack direction="row" spacing={2}>
              <Button
                id="Addbtn"
                type="submits"
                variant="contained"
                color="success"
                onClick={HandleTeamData}
              >
                Add
              </Button>
            </Stack>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
export default Modalpage;

// 
