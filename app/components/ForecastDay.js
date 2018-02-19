import React from 'react';

const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],	
months = ['January','February','March','April','May','June','July','August','Spetember','October','November', 'December'];

const dateStyle = {
  float: 'left'
};

export default class ForecastDay extends React.Component {

  currentDayClick(day) {
    this.props.toggleDetailDay(day);
  }

  render() {

    let self = this,
        weather = self.props.weather,
        d = new Date(weather.date),
        day = days[d.getUTCDay()],
        date = months[d.getUTCMonth()] + ' ' + d.getUTCDate(),
        isSelected = self.props.selected ? 'weather_main selected' : 'weather_main';

    return (
      <div className='weather_item' onClick={self.currentDayClick.bind( self, weather.date )}>
        <div className={isSelected}>
          <div className='weather_date' >
            <span className='date'>{date}</span><br />
            <span className='day'>{day}</span>
          </div>
          <div className='weather_basic'>
            <div className='weather_condition'>{weather.day.condition.text}</div>
            <div className='weather_temp_max'>{Math.round(weather.day.maxtemp_f)}</div>
            <div className='weather_temp_min'>{Math.round(weather.day.mintemp_f)}</div>
          </div>
        </div>
      </div>
    )
  }
}
