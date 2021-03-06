import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/chart_component';
import GoogleMap from '../components/map_component';

class WeatherList extends Component {
  renderWeather(data) {
    const name = data.city.name;
    // arrays with only the values
    const temps = data.list.map(weather => weather.main.temp);
    const pressures = data.list.map(weather => weather.main.pressure);
    const humidities = data.list.map(weather => weather.main.humidity);
    const { lon, lat } = data.city.coord;

    return (
      <tr key={name}>
        <td><GoogleMap lon={lon} lat={lat} /></td>
        <td>
          <Chart data={temps} color="red" unit="celsius"/>
        </td>
        <td>
          <Chart data={pressures} color="orange" unit="hPa"/>
        </td>
        <td>
          <Chart data={humidities} color="blue" unit="%"/>
        </td>
      </tr>
    )
  }

  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">
              City
            </th>
            <th scope="col">
              Temperature
            </th>
            <th scope="col">
              Pressure
            </th>
            <th scope="col">
              Humidity
            </th>
          </tr>
        </thead>
        <tbody>
          {this.props.weather.map(this.renderWeather)}
        </tbody>
      </table>
    )
  }
}

function mapStateToProps({weather}) {
  return { weather }
}

export default connect(mapStateToProps)(WeatherList);