var React = require('react');
var ForecastDay = require('./ForecastDay');
var ForecastDetail = require('./ForecastDetail');

class ForecastWeek extends React.Component {

    constructor(props) {
        super(props);

        let today = new Date();
        today = today.toISOString().slice(0,10);
        this.state = {
            currentDetailDay: today
        } 
        this.setDetailDay = this.setDetailDay.bind(this);
    }

    setDetailDay(day) {
        this.setState({ currentDetailDay: day });
    }

    getDetailWeather(forecast, date) {
        if (forecast && date) {
            for (var i = 0; i < forecast.length; i++) {
                if (forecast[i]['date'] === date)
                    return forecast[i].hour;
            }
        }
    }

    render () {
        let that = this;
        let forecast = that.props.forecastArray || [];
        let detailWeather = that.getDetailWeather( forecast, that.state.currentDetailDay );
        return (
            <div className="forecast">
                <div className="forecast-week">
                    {
                        forecast.map(function(weather, id) { 
                            return (<ForecastDay 
                                    key={id} 
                                    weather={weather}
                                    toggleDetailDay={that.setDetailDay} />
                            )
                        })
                    }
                    <div className="clear"></div>
                </div>

                {
                    
                }
                <ForecastDetail 
                    currentDetailDay={that.state.currentDetailDay}
                    detailWeather={detailWeather} />
            </div>
        );
    }
}

module.exports = ForecastWeek;