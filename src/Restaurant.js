import React from 'react'
import { Redirect } from 'react-router-dom'
import { Grid, Paper, Button, Container, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core'
import fetchData from './fetch-data'

class Restaurant extends React.Component {
  constructor(props) {
    super(props)
    this.closeQueue = this.closeQueue.bind(this);
  }

  closeQueue(queue) {
    let newQueue = { ...queue }
    newQueue.is_current = 0
    this.props.editQueue(newQueue)
  }

  async componentDidMount() {
    if (this.props.currentRestaurant) {
      // get all queue numbers for current restaurant
      const queueNumbers = await fetchData.getRestaurantQueueNumbers(this.props.currentRestaurant.id)
      this.props.updateQueueNumberList(queueNumbers)
    }
  }

  render() {
    const { id, name, address, capacity, open_time, close_time } = this.props.currentRestaurant

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
              <p>Address: {address}</p>
              <p>Total capacity: {capacity}</p>
              <p>Opening time: {open_time}</p>
              <p>Closing time: {close_time}</p>
            </Paper>
            <Button variant="contained" color="primary" onClick={this.props.logOut}>
              Log out
            </Button>
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
                            (<Button variant="contained" color="primary" disabled>Close</Button>) :
                            (<Button variant="contained" color="primary" onClick={() => this.closeQueue(queue)}>Close</Button>)
                          }
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Container>
          </Grid>
        </div>
      )
    }
  }
}

export default Restaurant;
