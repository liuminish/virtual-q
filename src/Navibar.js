import React from 'react'
import { Grid, AppBar, Button, Toolbar, IconButton, Typography } from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import { Link } from 'react-router-dom';

class Navibar extends React.Component {
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
              {/* Menu icon current linked to restaurant list, to be used for actual menu after more features are added */}
              <IconButton color="inherit" aria-label="menu">
                <Link to="/restaurants"><Menu /></Link>
              </IconButton>
              <Link to="/">
                <Typography variant="h6">Virtual Q</Typography>
              </Link>
              {this.props.currentUser.id ?
                (<Link to={`/users/${this.props.currentUser.id}`}><Button color="inherit">User Profile</Button></Link>) :
                this.props.currentRestaurant.id ?
                  (<Link to={`/restaurants/${this.props.currentRestaurant.id}`}><Button color="inherit">Restaurant Profile</Button></Link>) :
                    (<Link to="/login"><Button color="inherit">Log in</Button></Link>)}

            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default Navibar;
