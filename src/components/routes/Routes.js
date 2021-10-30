import React from "react";
import Loginform from "../form/LoginForm/LoginForm.js";
import SignupForm from "../form/signupform/Signup.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Homepage from "../home/HomePage/Home.js";
import NavigationBar from "../home/navbar/Navbar";
import Setting from "../home/settingpage/Setting";

function Switcher() {
  return (
    <Switch>
      <Route exact path="/" component={Loginform} />
      <Route path="/signupform" component={SignupForm} />
      <Route path="/HomePage" component={Homepage} />
      <Route path="/SettingPage" component={Setting} />
    </Switch>
  );
}
function Routes() {
  return (
    <Router>
      <Switcher />
    </Router>
  );
}
export default Routes;
