import React from 'react';
import ForecastDay from './ForecastDay';
import ForecastDayDetail from './ForecastDayDetail';
import ForecastWeekChart from './ForecastWeekChart';
/* import ForecastDetail from './ForecastDetail'; */

export default class ForecastWeek extends React.Component {

  constructor(props) {
    super(props);

    var today = this.getTodaysDate();
    this.state = {
      currentDetailDay: today
    } 
    this.setDetailDay = this.setDetailDay.bind(this);
  }

  setDetailDay(day) {
    this.setState({ currentDetailDay: day });
  }

  getTodaysDate() {
    let today = new Date();
    let mm = today.getMonth() + 1;
    mm = mm < 10 ? '0' + mm : mm;
    let dd = today.getDate();
    dd = dd < 10 ? '0' + dd : dd;
    var yy = today.getFullYear();

    return yy + '-' + mm + '-' + dd;
  }

  getDetailWeather(forecast, date) {
    if (forecast && date) {
      for (var i = 0; i < forecast.length; i++) {
        if (forecast[i]['date'] === date)
          return forecast[i].day;
      }
    }
  }

  render () {
    let self = this,
        forecast = self.props.forecastArray || [],
        detailWeather = self.getDetailWeather( forecast, self.state.currentDetailDay );

    return (
      <div className="forecast">
        <div className="forecast-week">
          {
            forecast.map(function(weather, id) {
              let isSelectedDay = weather.date === self.state.currentDetailDay;
              return (
                <ForecastDay 
                  key={id} 
                  weather={weather}
                  toggleDetailDay={self.setDetailDay}
                  selected={isSelectedDay} />
              )
            })
          }
          <div className="clear"></div>
        </div>

        <ForecastDayDetail
          selectedDay={self.state.currentDetailDay}
          detailWeather={detailWeather}
        />
        <ForecastWeekChart
          forecast={self.props.forecastArray}
          selectedDay={self.state.currentDetailDay}
        />

      </div>
    );
  }
}