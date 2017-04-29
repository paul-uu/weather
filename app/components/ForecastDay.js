var React = require('react');

const dateStyle = {
    float: 'left'
};

class ForecastDay extends React.Component {

    render() {
        let classes = 'weather_extra' + ' ' + this.props.expanded;
        return (
            <div className='weather_item'>
                <div className='weather_main'>
                    <div className='weather_date' style={dateStyle}>
                        <span className='date'>{this.props.date}</span><br />
                        <span className='day'>{this.props.day}</span>
                    </div>
                    <div className='weather_basic'>
                        <div className='weather_condition'>{this.props.condition}</div>
                        <div className='weather_temp_max'>{this.props.max}</div>
                        <div className='weather_temp_min'>{this.props.min}</div>
                    </div>
                </div>
                <div className={classes}>
                    <div className='weather_humidity'>Humidity: {this.props.humidity}</div>
                    <div className='weather_visibility'>Visibility: {this.props.visibility}</div>
                    <div className='weather_wind_speed'>Wind Speed: {this.props.windSpeed}</div>
                    <div className='weather_rain'>Precipitation: {this.props.precipitation}</div>
                </div>
            </div>
        )
    }
}

module.exports = ForecastDay;