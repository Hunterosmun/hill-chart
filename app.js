import React from 'react'
import SingleElement from './single-element'

export default class App extends React.Component {
  // if we didn't have state after this, we would need this constructor. below is now a default constructor (from React.Component)
  // constructor (props) {
  //   super(props)
  //   this.state = {
  //     name: '',
  //     count: 0
  //   }
  // }

  state = {
    name: '',
    count: 0
  }

  updateName = e => {
    this.setState({ name: e.target.value })
  }

  updateCount = count => {
    this.setState({ count })
  }

  render () {
    return (
      <div>
        <h1>Hill Charts</h1>
        <SingleElement
          // This part after the class is called a prop, it's when you send data between components. you only send props down the tree (data goes back up by the "parent" sending them a function)
          onTextChange={this.updateName}
          text={this.state.name}
          onNumChange={this.updateCount}
          count={this.state.count}
        />
        <div>
          {this.state.name}: {this.state.count}
        </div>
      </div>
    )
  }
}
