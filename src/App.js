import './App.css';
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import fetchData from './fetch-data';

import Navibar from './Navibar.js'
import Mainpage from './Mainpage.js'
import Login from './Login.js'
import RestaurantList from './RestaurantList.js'
import Restaurant from './Restaurant.js'
import Users from './Users.js'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentRestaurant: {},
      currentUser: {},
      restaurantList: [],
      queueNumberList: [],
      redirectTo: '',
    }

    this.updateCurrentRestaurant = this.updateCurrentRestaurant.bind(this);
    this.updateCurrentUser = this.updateCurrentUser.bind(this);
    this.updateRestaurantList = this.updateRestaurantList.bind(this);
    this.updateQueueNumberList = this.updateQueueNumberList.bind(this);
    this.generateQueueNumber = this.generateQueueNumber.bind(this);
    this.editQueue = this.editQueue.bind(this);
  }

  updateCurrentRestaurant(restaurant) {
    this.setState({ currentRestaurant: restaurant })
  }

  updateCurrentUser(user) {
    this.setState({ currentUser: user })
  }

  updateRestaurantList(restaurants) {
    this.setState({ restaurantList: restaurants })
  }

  updateQueueNumberList(queueNumbers) {
    this.setState({ queueNumberList: queueNumbers })
  }

  generateQueueNumber(restaurantId, pax) {
    // get current date time
    const currentdate = new Date();
    const currentDateTime = currentdate.getFullYear() + "/"
      + (currentdate.getMonth() + 1) + "/"
      + currentdate.getDate() + " "
      + currentdate.getHours() + ":"
      + currentdate.getMinutes() + ":"
      + currentdate.getSeconds();

    // create queue object
    let queue = {
      user_id: this.state.currentUser.id,
      restaurant_id: restaurantId,
      pax: pax,
      number: (currentdate.getFullYear() + (currentdate.getMonth() + 1) + currentdate.getDate() + '-' + restaurantId + '-1'),
      date_time: currentDateTime,
      is_cancelled: false,
      is_current: true
    }

    fetchData.generateQueueNumber(queue).then(
      this.setState({ redirectTo: 'users' })
    )
  }

  async editQueue(queue) {
    await fetchData.editQueue(queue)
  }

  render() {
    return (
      <div className="App">
        <Navibar />

        <Switch>
          <Route path='/' exact>
            <Mainpage />
          </Route>
          <Route path='/login' exact>
            <Login
              updateCurrentRestaurant={this.updateCurrentRestaurant}
              updateCurrentUser={this.updateCurrentUser}
            />
          </Route>
          <Route path='/restaurants' exact>
            <RestaurantList
              restaurantList={this.state.restaurantList}
              currentUser={this.state.currentUser}
              redirectTo={this.state.redirectTo}
              updateRestaurantList={this.updateRestaurantList}
              generateQueueNumber={this.generateQueueNumber}
            />
          </Route>
          <Route path='/restaurants/:restaurantId'>
            <Restaurant
              currentRestaurant={this.state.currentRestaurant}
              queueNumberList={this.state.queueNumberList}
              updateQueueNumberList={this.updateQueueNumberList}
              editQueue={this.editQueue}
            />
          </Route>
          <Route path='/users/:userId' exact>
            <Users
              currentUser={this.state.currentUser}
              queueNumberList={this.state.queueNumberList}
              updateQueueNumberList={this.updateQueueNumberList}
              editQueue={this.editQueue}
            />
          </Route>

        </Switch>
      </div>
    )
  }
}

export default App;
