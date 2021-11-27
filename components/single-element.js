import React from 'react'
import Counter from './counter'

export default class SingleElement extends React.Component {
  render () {
    return (
      <div className='single-element'>
        <input
          type='text'
          placeholder='Your text here'
          value={this.props.text}
          onChange={this.props.onTextChange}
        />
        <Counter
          onNumChange={this.props.onNumChange}
          count={this.props.count}
        />
        <button className='btn'>Delete</button>
      </div>
    )
  }
}
