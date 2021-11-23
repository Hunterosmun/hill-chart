import React from 'react'

// const Counter = class extends React.Component (this is the same... but slightly different)
export default class Counter extends React.Component {
  // this.incrementCount = this.incrementCount.bind(this)
  // this is fixed with the  =()=> thing, we don't do this ^ anymore

  incrementCount = () => {
    // this.setState(state => ({ count: state.count + 1 })) (this one sets it based on the number it is, so these pasted one after the other will all apply)
    if (this.props.count >= 100) return

    // this actually sets the count based on the number when the function was called. It's ONLY a schedule, the number hasn't actually changed yet
    // this.setState({ count: this.props.count + 1 })
    this.props.onNumChange(this.props.count + 1)
  }

  decrementCount = () => {
    if (this.props.count <= 0) return
    this.props.onNumChange(this.props.count - 1)
  }

  render () {
    return (
      <>
        <button class='btn' onClick={this.decrementCount}>
          -
        </button>
        <span class='num'>{this.props.count}</span>
        <button class='btn' onClick={this.incrementCount}>
          +
        </button>
      </>
    )
  }
}
