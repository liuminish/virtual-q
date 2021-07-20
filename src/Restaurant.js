import React from 'react'
import { Redirect } from 'react-router-dom'
import { Grid, Paper, Button, Container, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Modal, TextField } from '@material-ui/core'
import fetchData from './fetch-data'

class Restaurant extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      updatedRestaurant: {},
    }
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateAddress = this.updateAddress.bind(this)
    this.updateCapacity = this.updateCapacity.bind(this)
    this.updateRestaurant = this.updateRestaurant.bind(this)
    this.closeQueue = this.closeQueue.bind(this)
    this.cancelQueue = this.cancelQueue.bind(this)
  }

  // functions relating to opening/closing of modal
  openModal() {
    this.setState({ showModal: true })
  }
  closeModal() {
    this.setState({ showModal: false })
  }

  // functions for controlling of components
  updateName(event) {
    const updatedRestaurant = { ...this.state.updatedRestaurant }
    updatedRestaurant.name = event.target.value
    this.setState({ updatedRestaurant: updatedRestaurant })
  }
  updateAddress(event) {
    const updatedRestaurant = { ...this.state.updatedRestaurant }
    updatedRestaurant.address = event.target.value
    this.setState({ updatedRestaurant: updatedRestaurant })
  }
  updateCapacity(event) {
    const updatedRestaurant = { ...this.state.updatedRestaurant }
    updatedRestaurant.capacity = event.target.value
    this.setState({ updatedRestaurant: updatedRestaurant })
  }
  updateRestaurant() {
    this.props.updateRestaurant(this.state.updatedRestaurant)
    this.closeModal()
  }

  // functions relating to closing/cancelling of queue numbers
  closeQueue(queue) {
    let newQueue = { ...queue }
    newQueue.is_current = 0
    this.props.editQueue(newQueue)
  }
  cancelQueue(queue) {
    let newQueue = { ...queue }
    newQueue.is_cancelled = 1
    this.props.editQueue(newQueue)
  }

  async componentDidMount() {
    if (this.props.currentRestaurant) {
      // get all queue numbers for current restaurant
      const queueNumbers = await fetchData.getRestaurantQueueNumbers(this.props.currentRestaurant.id)
      this.props.updateQueueNumberList(queueNumbers)
      // update restaurant state
      this.setState({ updatedRestaurant: this.props.currentRestaurant })
    }
  }

  render() {
    const { id, name, address, capacity, open_time, close_time } = this.props.currentRestaurant

    // redirect to main page after logging out
    if (this.props.redirectTo === '/') {
      return <Redirect to="/" />
    } else {
      return (
        <div>
          {/* Restaurant details */}
          <Grid
            container
            spacing={0}
            direction="column"
            justifyContent="center"
            alignItems="center"
            style={{ minHeight: '30vh' }}
          >
            <Paper elevation={3}>
              <p>ID: {id}</p>
              <p>Name: {name}</p>
              <p>Address: {address}</p>
              <p>Total capacity: {capacity}</p>
              <p>Opening time: {open_time}</p>
              <p>Closing time: {close_time}</p>
            </Paper>
            <Container>
              <Button style={{ 'margin': '15px' }} variant="contained" color="primary" onClick={this.openModal}>
                Edit
              </Button>
              <Button style={{ 'margin': '15px' }} variant="contained" color="primary" onClick={this.props.logOut}>
                Log out
              </Button>
            </Container>
          </Grid>

          {/* List of queue numbers */}
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
                      <TableCell>User</TableCell>
                      <TableCell align="left">Phone Number</TableCell>
                      <TableCell align="left">Date/Time</TableCell>
                      <TableCell align="left">Queue Number</TableCell>
                      <TableCell align="left">Pax</TableCell>
                      <TableCell align="left">Status</TableCell>
                      <TableCell align="left">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.props.queueNumberList.map((queue) => (
                      <TableRow key={queue.id}>
                        <TableCell component="th" scope="row">{queue.name}</TableCell>
                        <TableCell align="left">{queue.phone_number}</TableCell>
                        <TableCell align="left">{queue.date_time}</TableCell>
                        <TableCell align="left">{queue.number}</TableCell>
                        <TableCell align="left">{queue.pax}</TableCell>
                        <TableCell align="left">{queue.is_cancelled ? 'Cancelled' : queue.is_current ? 'Pending' : 'Closed'}</TableCell>
                        <TableCell align="left">
                          {(queue.is_cancelled || !queue.is_current) ?
                            (<Container>
                              <Button style={{'margin-right': '5px'}} variant="contained" color="primary" disabled>Close</Button>
                              <Button variant="contained" color="primary" disabled>Cancel</Button>
                            </Container>) :
                            (<Container>
                              <Button style={{'margin-right': '5px'}} variant="contained" color="primary" onClick={() => this.closeQueue(queue)}>Close</Button>
                              <Button variant="contained" color="primary" onClick={() => this.cancelQueue(queue)}>Cancel</Button>
                            </Container>)
                          }
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Container>
          </Grid>

          {/* Modal for updating of restaurant details */}
          <Modal
            open={this.state.showModal}
            onClose={this.closeModal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <div style={{
              'display': 'inline-block', 'position': 'absolute', 'top': '50%', 'left': '50%', 'margin-right': '-50%', 'transform': 'translate(-50%, -50%)', 'padding': '30px', 'background-color': 'white', 'border-radius': '8px'
            }}>
              <h2 id="simple-modal-title">Edit Restaurant</h2>
              <p id="simple-modal-description">
                <form noValidate autoComplete="off">
                  <TextField
                    label="New name"
                    onChange={this.updateName}
                  />
                </form>
                <form noValidate autoComplete="off">
                  <TextField
                    label="New address"
                    onChange={this.updateAddress}
                  />
                </form>
                <form noValidate autoComplete="off">
                  <TextField
                    label="New capacity"
                    onChange={this.updateCapacity}
                  />
                </form>
              </p>
              <Button variant="contained" color="primary" onClick={this.updateRestaurant}>
                Update
              </Button>
            </div>
          </Modal>
        </div>
      )
    }
  }
}

export default Restaurant;
