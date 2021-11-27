import React from 'react'
import SingleElement from './single-element'

export default class Chart extends React.Component {
  updateTitle = e => {
    this.props.updateChart({
      id: this.props.id,
      title: e.target.value,
      singleElements: this.props.singleElements
    })
  }

  render () {
    return (
      <div className='chart'>
        <input
          type='text'
          className='title'
          placeholder='Your text here'
          value={this.props.title}
          onChange={this.updateTitle}
        />
        <div className='content'>
          <div className='chart-data'>
            {this.props.singleElements.map(singleElement => {
              return (
                <SingleElement
                  key={singleElement.id}
                  text={singleElement.name}
                  count={singleElement.count}
                />
              )
            })}
            <div className='bottom-options'>
              <button className='btn'>New Aspect</button>
              <button className='btn' onClick={this.props.deleteChart}>
                Delete Chart
              </button>
              <button className='btn'>Save</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
