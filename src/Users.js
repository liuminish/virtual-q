import React from 'react'
import { Grid, Paper, Button, Container, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core'
import fetchData from './fetch-data';

class Users extends React.Component {
  constructor(props) {
    super(props)
    this.cancelQueue = this.cancelQueue.bind(this);
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
    }
  }

  render() {
    const { id, name, phone_number } = this.props.currentUser;

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
                      <TableCell component="th" scope="row">{queue.restaurant_id}</TableCell>
                      <TableCell align="left">address</TableCell>
                      <TableCell align="left">{queue.date_time}</TableCell>
                      <TableCell align="left">{queue.number}</TableCell>
                      <TableCell align="left">{queue.pax}</TableCell>
                      <TableCell align="left">{queue.is_cancelled ? 'Cancelled' : queue.is_current ? 'Pending' : 'Closed'}</TableCell>
                      <TableCell align="left">
                        <Button variant="contained" color="primary" onClick={() => this.cancelQueue(queue)}>
                          Cancel
                        </Button>
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

export default Users;
