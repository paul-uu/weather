import React from 'react';
import Checkbox from './Checkbox';
import Chart from './Chart';

export default class ForecastWeekChart extends React.Component {

  constructor(props) {
    super(props);
    this.chartDataTypes = {
      avgtemp_f: "Temperature F",
      avghumidity: "Humidity %",
      cloud: "Cloud Cover %",
      maxwind_mph: "Wind MPH",
      totalprecip_in: "Precipitation"
    }
    this.state = {
      chartDataTypes: {
        avgtemp_f: {
          propertyName: 'avgtemp_f',
          label: 'Avg Temperature F',
          checked: true
        },
        avghumidity: {
          propertyName: 'avghumidity',
          label: 'Avg Humidity',
          checked: true
        },
        maxwind_mph: {
          propertyName: 'maxwind_mph',
          label: 'Max Wind MPH',
          checked: true
        },
        totalprecip_in: {
          propertyName: 'totalprecip_in',
          label: 'Totoal Precipitation',
          checked: true
        }
      }
    }
  }


  handleCheckboxChange(e) {
    let checkboxName = e.target.name,
        updatedState = this.state.chartDataTypes;

    updatedState[checkboxName].checked = e.target.checked;
    this.setState({ chartDataTypes: updatedState });
  }

  getWeatherPropertiesToShow(chartDataTypes) {
    let arr = [];
    for (let weatherProperty in chartDataTypes) {
      if (chartDataTypes[weatherProperty].checked)
        arr.push( weatherProperty )
    }
    return arr;
  }

  formatWeatherDataForChart(weeklyForecast, visibleWeatherPropertiesArray) {
    if (weeklyForecast.length > 0 && visibleWeatherPropertiesArray.length > 0) {
      
      let self = this,
          weatherArrays = [];

      visibleWeatherPropertiesArray.forEach(function(weatherProperty) {

        if (weeklyForecast[0].day.hasOwnProperty(weatherProperty)) {
          let weatherArray = [];
          for (let i = 0; i < weeklyForecast.length; i++) {
            weatherArray.push(weeklyForecast[i].day[weatherProperty]);
          }
          weatherArray.unshift(self.state.chartDataTypes[weatherProperty].label);
          weatherArrays.push(weatherArray);
        }
      });
      return weatherArrays;
    }
    else {
      return;
    }
  }

  render() {

    let self = this;
    if (self.props.forecast.length > 0) {

      let weatherPropertiesToShow = self.getWeatherPropertiesToShow(self.state.chartDataTypes);
      let formattedData = self.formatWeatherDataForChart(self.props.forecast, weatherPropertiesToShow);
      let chartDataTypesArray = [];
      for (let obj in self.state.chartDataTypes) {
        chartDataTypesArray.push( self.state.chartDataTypes[obj] );
      }

      return (
        <div className='forecastWeekDetail'>
          <div className="forecastWeekDetail__header">{self.props.forecast.length} Day Forecast</div>
          <div className='forecastWeekDetail__checkboxes'>
          {
            chartDataTypesArray.map(function(dataTypeObj, id) {
              return (
                <Checkbox 
                  key={id}
                  name={dataTypeObj.propertyName}
                  checked={dataTypeObj.checked}
                  onChange={self.handleCheckboxChange.bind(self)}
                  label={dataTypeObj.label} />
              )
            })
          }
          </div>
          
          <Chart weatherArray={formattedData} />

        </div>
      );
    }
    else {
      return <div></div>;
    }

  }
}