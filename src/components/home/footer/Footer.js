import React from "react";
import {AppBar,Container ,Typography,Toolbar} from '@mui/material'
function Footer() {
    return (
        <AppBar sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 ,}} align='center' position="static" color="primary" >
          <Container maxWidth="md">
            <Toolbar>
              <Typography variant="body1" color="inherit">
                © 2021 Areeb
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>
    )
}
export default Footer;