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
    this.updateRestaurant = this.updateRestaurant.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.generateQueueNumber = this.generateQueueNumber.bind(this);
    this.editQueue = this.editQueue.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  updateCurrentRestaurant(restaurant) {
    this.setState({
      currentRestaurant: restaurant,
      redirectTo: ''
    })
  }

  updateCurrentUser(user) {
    this.setState({
      currentUser: user,
      redirectTo: ''
    })
  }

  updateRestaurantList(restaurants) {
    this.setState({ restaurantList: restaurants })
  }

  updateQueueNumberList(queueNumbers) {
    this.setState({ queueNumberList: queueNumbers })
  }

  async updateRestaurant(restaurant) {
    await fetchData.updateRestaurant(restaurant).then(restaurant => {
      this.setState({ currentRestaurant: restaurant })
    })
  }

  async updateUser(user) {
    await fetchData.updateUser(user).then(user => {
      this.setState({ currentUser: user })
    })
  }

  logOut() {
    this.setState({
      currentRestaurant: {},
      currentUser: {},
      redirectTo: '/'
    })
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
        <Navibar
          currentUser={this.state.currentUser}
          currentRestaurant={this.state.currentRestaurant}
        />

        <Switch>
          <Route path='/' exact>
            <RestaurantList
              restaurantList={this.state.restaurantList}
              currentUser={this.state.currentUser}
              redirectTo={this.state.redirectTo}
              updateRestaurantList={this.updateRestaurantList}
              generateQueueNumber={this.generateQueueNumber}
            />
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
              redirectTo={this.state.redirectTo}
              updateRestaurant={this.updateRestaurant}
              updateQueueNumberList={this.updateQueueNumberList}
              editQueue={this.editQueue}
              logOut={this.logOut}
            />
          </Route>
          <Route path='/users/:userId' exact>
            <Users
              currentUser={this.state.currentUser}
              queueNumberList={this.state.queueNumberList}
              redirectTo={this.state.redirectTo}
              updateUser={this.updateUser}
              updateQueueNumberList={this.updateQueueNumberList}
              editQueue={this.editQueue}
              logOut={this.logOut}
            />
          </Route>

        </Switch>
      </div>
    )
  }
}

export default App;
