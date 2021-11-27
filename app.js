import React from 'react'
// import SingleElement from './components/single-element'
import Chart from './components/chart'
import { nanoid } from 'nanoid'

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
    charts: [
      {
        id: nanoid(),
        title: 'Learning Code',
        singleElements: [
          { id: nanoid(), name: 'Hunter', count: 2 },
          { id: nanoid(), name: 'Dallin', count: 98 }
        ]
      },
      {
        id: nanoid(),
        title: 'Factorio',
        singleElements: [
          { id: nanoid(), name: 'Hunter', count: 50 },
          { id: nanoid(), name: 'Dallin', count: 50 }
        ]
      }
    ]
  }

  createChart = () => {
    this.setState({
      charts: [
        ...this.state.charts,
        {
          id: nanoid(),
          title: `Chart ${Math.floor(Math.random() * 9999)}`,
          singleElements: [
            {
              id: nanoid(),
              name: '',
              count: 0
            }
          ]
        }
      ]
    })
  }

  deleteChart = id => {
    this.setState({
      charts: this.state.charts.filter(chart => chart.id !== id)
    })
  }

  updateChart = newChart => {
    this.setState({
      charts: this.state.charts.map(oldChart => {
        if (oldChart.id === newChart.id) return newChart
        return oldChart
      })
    })
  }

  render () {
    return (
      <div>
        <h1>Hill Charts</h1>

        {this.state.charts.map(chart => (
          <Chart
            key={chart.id} // for react (it takes it, you can't use it) (they also do this with "ref")
            id={chart.id} // now we can use it in later functions!
            title={chart.title}
            singleElements={chart.singleElements}
            deleteChart={() => this.deleteChart(chart.id)}
            updateChart={this.updateChart}
          />
        ))}
        <button className='btn' onClick={this.createChart}>
          New Chart
        </button>
        {/* <pre>{JSON.stringify(this.state.charts, null, 2)}</pre> */}
      </div>
    )
  }
}
