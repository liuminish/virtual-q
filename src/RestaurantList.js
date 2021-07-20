import React from 'react'
import { Redirect } from 'react-router-dom';
import { Grid, Paper, Button, Container, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Modal, TextField } from '@material-ui/core'
import fetchData from './fetch-data';

class RestaurantList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentRestaurant: {},
      pax: '',
      errorMessage: '',
      showModal: false,
      redirectTo: ''
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.updatePax = this.updatePax.bind(this);
    this.generateQueueNumber = this.generateQueueNumber.bind(this);
  }

  openModal(restaurant) {
    // if user is logged in
    if (this.props.currentUser.id) {
      this.setState({
        showModal: true,
        currentRestaurant: restaurant,
      })
    } else {
      this.setState({redirectTo: 'login'})
    }

  }

  closeModal() {
    this.setState({ showModal: false })
  }

  updatePax(event) {
    this.setState({ pax: event.target.value })
    if (event.target.value > this.state.currentRestaurant.capacity) {
      this.setState({ errorMessage: 'exceeds restaurant capacity' })
    } else {
      this.setState({ errorMessage: '' })
    }
  }

  generateQueueNumber() {
    if (this.state.errorMessage === '') {
      this.props.generateQueueNumber(this.state.currentRestaurant.id, this.state.pax)
    }
  }

  async componentDidMount() {
    // get all restaurants data
    const restaurants = await fetchData.getAllRestaurants()
    this.props.updateRestaurantList(restaurants)
  }

  render() {
    if (this.state.redirectTo === 'login') {
      return <Redirect to={`/login`} />
    } else if (this.props.redirectTo === 'users') {
      return <Redirect to={`/users/${this.props.currentUser.id}`} />
    } else {
      return (
        <div>
          <Grid
            container
            spacing={0}
            direction="column"
            justifyContent="center"
            alignItems="center"
            style={{ minHeight: '30vh' }}
          >
            <Container>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell align="left">Address</TableCell>
                      <TableCell align="left">Capacity</TableCell>
                      <TableCell align="left">Opening Hours</TableCell>
                      <TableCell align="left">Queue Number</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.props.restaurantList.map((restaurant) => (
                      <TableRow key={restaurant.name}>
                        <TableCell component="th" scope="row">{restaurant.name}</TableCell>
                        <TableCell align="left">{restaurant.address}</TableCell>
                        <TableCell align="left">{restaurant.capacity}</TableCell>
                        <TableCell align="left">{restaurant.open_time} - {restaurant.close_time}</TableCell>
                        <TableCell align="left">
                          <Button variant="contained" color="primary" onClick={() => this.openModal(restaurant)}>
                            Generate
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Container>
          </Grid>
          <Modal
            open={this.state.showModal}
            onClose={this.closeModal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <div style={{
              'display': 'inline-block', 'position': 'absolute', 'top': '50%', 'left': '50%', 'margin-right': '-50%', 'transform': 'translate(-50%, -50%)', 'padding': '30px', 'background-color': 'white', 'opacity': 0.6, 'border-radius': '8px'}}>
              <h2 id="simple-modal-title">Generate Queue Number for {this.state.currentRestaurant.name}</h2>
              <p id="simple-modal-description">
                <form noValidate autoComplete="off">
                  <TextField
                    required id="standard-required"
                    label="Number of pax"
                    onChange={this.updatePax}
                    helperText={this.state.errorMessage}
                  />
                </form>
              </p>
              <Button variant="contained" color="primary" onClick={this.generateQueueNumber}>
                Generate
              </Button>
            </div>
          </Modal>
        </div>
      )
    }
  }
}

export default RestaurantList;
