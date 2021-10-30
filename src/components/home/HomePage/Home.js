import react from "react";
import NavigationBar from "../navbar/Navbar";
import Modalpage from "../Modal";
import OwnTeam from "../../teampages/ownteam/OwnTeam";
import PartofTeam from "../../teampages/partofteam/PartofTeam";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState } from "react";
import Footer from "../footer/Footer";

import TabMenuCustom from "./TabMenuCustom";

function Homepage() {
  return (
    <div>
      <NavigationBar />
      {/* <OwnTeam /> */}
      {/* <PartofTeam /> */}
      <TabMenuCustom />
      <Modalpage />
      <Footer />
    </div>
  );
}
export default Homepage;
