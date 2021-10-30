import react from "react";
import { collection, getDocs } from "firebase/firestore";
import "./OwnTeam.css";
import { getFirestore } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Box } from "@mui/material";

function OwnTeam() {
  const [teams, setTeam] = useState([]);
  useEffect(async () => {
    const db = getFirestore();
    let teamsTemp = [];
    const querySnapshot = await getDocs(collection(db, "Teamdata"));
    querySnapshot.forEach((doc) => {
      teamsTemp.push(doc.data());
    });
    setTeam(teamsTemp);
  }, []);

  //get login email in local storage for checking condition
  let GetLoginEmail = JSON.parse(localStorage.getItem("Login User"));
  return (
    <div id="OwnTeam">
      <h3>OwnTeam</h3>
      {teams.map((team, index) => {
        const {memberEmails, TeamName, AdminEmail} = team;
        let element = AdminEmail === GetLoginEmail ? 
          <Box key={index}>
            <Card
              sx={{
                mt: "10px",
                ml: "20px",
                width: "auto",
                maxWidth: 650,
                mx: "auto",
                textAlign: "start",
                boxShadow: 8
              }}
            >
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {TeamName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <ul>
                    {memberEmails.map((memberEmail)=>{
                      return(
                        <li>{memberEmail}</li>
                      )
                    })}
                    </ul>
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
          : <></>
          return element;
      })}
    </div>
  );
}
export default OwnTeam;
