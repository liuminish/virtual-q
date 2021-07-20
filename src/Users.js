import React from 'react'
import { Redirect } from 'react-router-dom'
import { Grid, Paper, Button, Container, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Modal, TextField } from '@material-ui/core'
import fetchData from './fetch-data'

class Users extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      updatedUser: {},
    }
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateNumber = this.updateNumber.bind(this)
    this.updateUser = this.updateUser.bind(this)
    this.cancelQueue = this.cancelQueue.bind(this)
  }

  openModal() {
    this.setState({ showModal: true })
  }

  closeModal() {
    this.setState({ showModal: false })
  }

  updateName(event) {
    const updatedUser = {...this.state.updatedUser}
    updatedUser.name = event.target.value
    this.setState({ updatedUser: updatedUser })
  }

  updateNumber(event) {
    const updatedUser = { ...this.state.updatedUser }
    updatedUser.phone_number = event.target.value
    this.setState({ updatedUser: updatedUser })
  }

  updateUser() {
    this.props.updateUser(this.state.updatedUser)
    this.closeModal()
  }

  cancelQueue(queue) {
    let newQueue = {...queue}
    newQueue.is_cancelled = 1
    this.props.editQueue(newQueue)
  }

  async componentDidMount() {
    if (this.props.currentUser) {
      // get all queue numbers for current user
      const queueNumbers = await fetchData.getUserQueueNumbers(this.props.currentUser.id)
      this.props.updateQueueNumberList(queueNumbers)
      // update user state
      this.setState({updatedUser: this.props.currentUser})
    }
  }

  render() {
    const { id, name, phone_number } = this.props.currentUser;

    if (this.props.redirectTo === '/') {
      return <Redirect to="/" />
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
            <Paper elevation={3}>
              <p>ID: {id}</p>
              <p>Name: {name}</p>
              <p>Phone number: {phone_number}</p>
            </Paper>
            <Container>
              <Button style={{'margin': '15px'}} variant="contained" color="primary" onClick={this.openModal}>
                Edit
              </Button>
              <Button style={{ 'margin': '15px' }} variant="contained" color="primary" onClick={this.props.logOut}>
                Log out
              </Button>
            </Container>
          </Grid>
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
                      <TableCell>Restaurant</TableCell>
                      <TableCell align="left">Address</TableCell>
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
                        <TableCell align="left">{queue.address}</TableCell>
                        <TableCell align="left">{queue.date_time}</TableCell>
                        <TableCell align="left">{queue.number}</TableCell>
                        <TableCell align="left">{queue.pax}</TableCell>
                        <TableCell align="left">{queue.is_cancelled ? 'Cancelled' : queue.is_current ? 'Pending' : 'Closed'}</TableCell>
                        <TableCell align="left">
                          {(queue.is_cancelled || !queue.is_current) ?
                            (<Button variant="contained" color="primary" disabled>Cancel</Button>) :
                            (<Button variant="contained" color="primary" onClick={() => this.cancelQueue(queue)}>Cancel</Button>)
                          }
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
              'display': 'inline-block', 'position': 'absolute', 'top': '50%', 'left': '50%', 'margin-right': '-50%', 'transform': 'translate(-50%, -50%)', 'padding': '30px', 'background-color': 'white', 'border-radius': '8px'
            }}>
              <h2 id="simple-modal-title">Edit Profile</h2>
              <p id="simple-modal-description">
                <form noValidate autoComplete="off">
                  <TextField
                    label="New name"
                    onChange={this.updateName}
                  />
                </form>
                <form noValidate autoComplete="off">
                  <TextField
                    label="New number"
                    onChange={this.updateNumber}
                  />
                </form>
              </p>
              <Button variant="contained" color="primary" onClick={this.updateUser}>
                Update
              </Button>
            </div>
          </Modal>
        </div>
      )
    }
  }
}

export default Users;
