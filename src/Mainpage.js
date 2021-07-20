import React from 'react'

class Mainpage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchValue: '',
      inputOpacity: false
    }

  }

  render() {
    return (
      <div>
        Main page
      </div>
    )
  }
}

export default Mainpage;
