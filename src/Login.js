import React from 'react'
import { Redirect } from 'react-router-dom';
import { Grid, Button, TextField, FormControl, Select, InputLabel, MenuItem} from '@material-ui/core'
import fetchData from './fetch-data';

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: '',
      id: '',
      redirectTo: '',
    }
    this.updateType = this.updateType.bind(this);
    this.updateId = this.updateId.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  updateType(event) {
    this.setState({ type: event.target.value })
  }

  updateId(event) {
    this.setState({ id: event.target.value })
  }

  signIn() {
    if (this.state.type === 'restaurant') {
      fetchData.getRestaurant(this.state.id).then(restaurant => {
        this.props.updateCurrentRestaurant(restaurant)
        this.setState({ redirectTo: 'restaurants' })
      })
    } else if (this.state.type === 'user') {
      fetchData.getUser(this.state.id).then(user => {
        this.props.updateCurrentUser(user)
        this.setState({ redirectTo: 'users' })
      })
    }
  }

  render() {
    if (this.state.redirectTo !== '') {
      return <Redirect to={`/${this.state.redirectTo}/${this.state.id}`} />
    } else {
      return (
        <div>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '30vh' }}
          >
            <FormControl>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={this.state.type}
                onChange={this.updateType}
              >
                <MenuItem value={'user'}>User</MenuItem>
                <MenuItem value={'restaurant'}>Restaurant</MenuItem>
              </Select>
            </FormControl>
            <form noValidate autoComplete="off">
              <TextField
                required id="standard-required"
                label="ID"
                onChange={this.updateId}
              />
            </form>
            <form noValidate autoComplete="off">
              <TextField
                id="standard-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
              />
            </form>
          </Grid>
          <Button variant="contained" color="primary" onClick={this.signIn}>
            Log in
          </Button>
        </div>
      )
    }
  }
}

export default Login;
