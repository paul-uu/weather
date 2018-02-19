import React from 'react';
import Checkbox from './Checkbox';
import Chart from './Chart';

export default class ForecastDetail extends React.Component {

  constructor(props) {
    super(props);

    this.chartDataTypes = {
      temp_f: "Temperature F",
      humidity: "Humidity %",
      cloud: "Cloud Cover %",
      wind_mph: "Wind MPH",
      precip_in: "Precipitation"
    }
    this.state = {

      chartDataTypes: {
        temp_f: {
          propertyName: 'temp_f',
          label: 'Temperature F',
          checked: true
        },
        humidity: {
          propertyName: 'humidity',
          label: 'Humidity',
          checked: true
        },
        cloud: {
          propertyName: 'cloud',
          label: 'Cloud Cover %',
          checked: true
        },
        wind_mph: {
          propertyName: 'wind_mph',
          label: 'Wind MPH',
          checked: true
        },
        precip_in: {
          propertyName: 'precip_in',
          label: 'Precipitation',
          checked: true
        }
      }
    }
  }

  handleCheckboxChange(e) {
    let el = e.target,
        val = el.value,
        updatedState = this.state.chartDataTypes,
        isChecked;

    updatedState[val].checked = el.checked;
    this.setState({ chartDataTypes: updatedState });
  }

  weatherPropsObjToArray(stateObj) {
    let weatherPropsArray = [];
    for (let weather in stateObj) {
      weatherPropsArray.push( stateObj[weather].propertyName )
    }
    return weatherPropsArray;
  }

  // Convert the weather data prop to an array of arrays as the Chart component
  // requires - also, only include the weather types indicated by checkbox
  formatWeatherDataForChart( hourlyWeather, weatherPropertiesArray ) {

    if (hourlyWeather && weatherPropertiesArray.length > 0) {
      let self = this,
      weatherArrays = [];

      weatherPropertiesArray.forEach(function(weatherProperty, i) {

        if (hourlyWeather[0].hasOwnProperty(weatherProperty)) {
          let weatherArray = [];
          for (let i = 0; i < hourlyWeather.length; i++) {
            weatherArray.push(hourlyWeather[i][weatherProperty]);
          }
          weatherArray.unshift( self.state.chartDataTypes[weatherProperty].label );
          weatherArrays.push(weatherArray);
        }
      });
      return weatherArrays;

    } else {
      return [];
    }
  }

  getWeatherPropertiesToShow(chartDataTypes) {
    let arr = [];
    for (let weatherProperty in chartDataTypes) {
      if (chartDataTypes[weatherProperty].checked)
        arr.push( weatherProperty )
    }
    return arr;
  }

  render() {

    let self = this;

    if (self.props.detailWeather) {

      let weatherPropertiesToShow = self.getWeatherPropertiesToShow(self.state.chartDataTypes);
      let formattedData = self.formatWeatherDataForChart(self.props.detailWeather, weatherPropertiesToShow);

      let chartDataTypesArray = [];
      for (let obj in self.state.chartDataTypes) {
        chartDataTypesArray.push( self.state.chartDataTypes[obj] );
      }

      return (
        <div className='forecast_detail'>

          <div className="detailHeader">
            <span>hourly weather for </span>
            <span>{self.props.currentDetailDay}</span>
          </div>
          <div className="detailCheckboxes">
          {
            chartDataTypesArray.map(function(dataTypeObj, id) {
              return (
                <Checkbox 
                  key={id}
                  value={dataTypeObj.propertyName}
                  checked={dataTypeObj.checked}
                  onChange={self.handleCheckboxChange.bind(self)}
                  label={dataTypeObj.label} />
              )
            })
          }
          </div>
          <Chart detailWeather={formattedData} />

        </div>
      );
    }
    else {
      return <div></div>;
    }
  }
}