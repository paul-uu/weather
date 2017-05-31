var React = require('react');
var ForecastDay = require('./ForecastDay');
var ForecastDetail = require('./ForecastDetail');

class ForecastWeek extends React.Component {

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
                            let isSelectedDay = weather.date === that.state.currentDetailDay;
                            
                            return (<ForecastDay 
                                    key={id} 
                                    weather={weather}
                                    toggleDetailDay={that.setDetailDay}
                                    selected={isSelectedDay} />
                            )
                        })
                    }
                    <div className="clear"></div>
                </div>

                <ForecastDetail 
                    currentDetailDay={that.state.currentDetailDay}
                    detailWeather={detailWeather} />
            </div>
        );
    }
}

module.exports = ForecastWeek;