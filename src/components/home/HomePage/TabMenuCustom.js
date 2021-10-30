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

import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function TabMenuCustom() {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <Tabs
          centered
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab {...a11yProps(0)} label="Own Team" sx={{ width: "100%" }} />
          <Tab {...a11yProps(1)} label="Part Of Team" sx={{ width: "100%" }} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <OwnTeam/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PartofTeam/>
      </TabPanel>
    </Box>
  );
}
export default TabMenuCustom;
