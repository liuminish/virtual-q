import React from 'react'
import { Grid, AppBar, Button, Toolbar, IconButton, Typography } from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import { Link } from 'react-router-dom';

class Navibar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }

  }

  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar display="flex">
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <IconButton color="inherit" aria-label="menu">
                <Link to="/restaurants"><Menu /></Link>
              </IconButton>
              <Link to="/">
                <Typography variant="h6">Virtual Q</Typography>
              </Link>
              <Link to="/login">
                <Button color="inherit">Login</Button>
              </Link>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default Navibar;
