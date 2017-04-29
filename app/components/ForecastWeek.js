var React = require('react');
var ForecastDay = require('./ForecastDay');

const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],	
      months = ['January','February','March','April','May','June','July','August','Spetember','October','November', 'December'];

class ForecastWeek extends React.Component {

    render () {
        let forecast = this.props.forecastArray || [];
        let expanded = this.props.expanded;
        return (
            <div className="forecast">
            {
                forecast.map(function(weather, id) { 

                    let d = new Date(weather.date);
                    let day = days[d.getUTCDay()];
                    let date = months[d.getUTCMonth()] + ' ' + d.getUTCDate();

                    return <ForecastDay 
                        key={id} 
                        date={date}
                        day={day}
                        condition={weather.day.condition.text} 
                        max={Math.round(weather.day.maxtemp_f)}
                        min={Math.round(weather.day.mintemp_f)} 
                        humidity={weather.day.avghumidity}
                        visibility={weather.day.avgvis_miles}
                        windSpeed={weather.day.maxwind_mph}
                        precipitation={weather.day.totalprecip_in}
                        expanded={expanded}
                        /> 
                })
            }
            </div>
        );
    }
}

module.exports = ForecastWeek;