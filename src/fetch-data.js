import 'whatwg-fetch';

const fetchData = {};
let baseUrl = '';
if (window.location.hostname.includes('localhost')) {
  baseUrl = 'http://localhost:4000/api'
} else {
  baseUrl = 'https://api.virtualq.liumin.dev/api'
};

// GET all restaurants
fetchData.getAllRestaurants = (searchObject) => {
  let searchTerm = '';

  if (searchObject && searchObject.name) {
    searchTerm = `?name=${searchObject.name}`
  }

  const url = `${baseUrl}/restaurants${searchTerm}`;

  return fetch(url).then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve([]));
    }
    return response.json().then(jsonResponse => {
      return jsonResponse.restaurants.map(restaurant => {
        return {
          id: restaurant.id,
          name: restaurant.name,
          address: restaurant.address,
          capacity: restaurant.capacity,
          open_time: restaurant.open_time,
          close_time: restaurant.close_time
        };
      });
    });
  });
};

// GET restaurant
fetchData.getRestaurant = restaurantId => {
  const url = `${baseUrl}/restaurants/${restaurantId}`;

  return fetch(url).then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve(null));
    }
    return response.json().then(jsonResponse => {
      return jsonResponse;
    });
  });
};

// GET user
fetchData.getUser = userId => {
  const url = `${baseUrl}/users/${userId}`;

  return fetch(url).then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve(null));
    }
    return response.json().then(jsonResponse => {
      return jsonResponse;
    });
  });
};


// POST/create queue number
fetchData.generateQueueNumber = queue => {
  const url = `${baseUrl}/queue`;
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ queue: queue })
  };

  return fetch(url, fetchOptions).then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve(null));
    }
    return response.json().then(jsonResponse => {
      return jsonResponse;
    });
  });
};

// GET queue numbers for user
fetchData.getUserQueueNumbers = userId => {
  const url = `${baseUrl}/queue?user_id=${userId}`;

  return fetch(url).then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve(null));
    }
    return response.json().then(jsonResponse => {
      return jsonResponse.map(queue => {
        return {
          id: queue.id,
          number: queue.number,
          restaurant_id: queue.restaurant_id,
          user_id: queue.user_id,
          pax: queue.pax,
          date_time: queue.date_time,
          is_cancelled: queue.is_cancelled,
          is_current: queue.is_current
        };
      });
    });
  });
};

// GET queue numbers for restaurant
fetchData.getRestaurantQueueNumbers = restaurantId => {
  const url = `${baseUrl}/queue?restaurant_id=${restaurantId}`;

  return fetch(url).then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve(null));
    }
    return response.json().then(jsonResponse => {
      return jsonResponse.map(queue => {
        return {
          id: queue.id,
          number: queue.number,
          restaurant_id: queue.restaurant_id,
          user_id: queue.user_id,
          pax: queue.pax,
          date_time: queue.date_time,
          is_cancelled: queue.is_cancelled,
          is_current: queue.is_current
        };
      });
    });
  });
};

// PUT/edit queue number
fetchData.editQueue = queue => {
  console.log('reached fetch-data', queue)
  const url = `${baseUrl}/queue/${queue.id}`;
  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ queue: queue })
  };
  return fetch(url, fetchOptions).then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve(null));
    }
    return response.json().then(jsonResponse => {
      console.log('done fetch-data', jsonResponse)
      return jsonResponse;
    });
  });
};

export default fetchData;
