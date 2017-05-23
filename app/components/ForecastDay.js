var React = require('react');

const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],	
      months = ['January','February','March','April','May','June','July','August','Spetember','October','November', 'December'];

const dateStyle = {
    float: 'left'
};

class ForecastDay extends React.Component {

    currentDayClick(day) {
        this.props.toggleDetailDay(day);
    }

    render() {
        let weather = this.props.weather;
        let d = new Date(weather.date);
        let day = days[d.getUTCDay()];
        let date = months[d.getUTCMonth()] + ' ' + d.getUTCDate();
        let self = this;

        return (
            <div className='weather_item' onClick={this.currentDayClick.bind( self, weather.date )}>
                <div className='weather_main'>
                    <div className='weather_date' style={dateStyle}>
                        <span className='date'>{date}</span><br />
                        <span className='day'>{day}</span>
                    </div>
                    <div className='weather_basic'>
                        <div className='weather_condition'>{weather.day.condition.text}</div>
                        <div className='weather_temp_max'>{Math.round(weather.day.maxtemp_f)}</div>
                        <div className='weather_temp_min'>{Math.round(weather.day.mintemp_f)}</div>
                    </div>
                </div>
                <div className='weather_extra'>
                    <div className='weather_humidity'>Humidity: {weather.day.avghumidity}</div>
                    <div className='weather_visibility'>Visibility: {weather.day.avgvis_miles}</div>
                    <div className='weather_wind_speed'>Wind Speed: {weather.day.windSpeed_mph}</div>
                    <div className='weather_rain'>Precipitation: {weather.day.totalprecipin}</div>
                </div>
            </div>
        )
    }
}

module.exports = ForecastDay;