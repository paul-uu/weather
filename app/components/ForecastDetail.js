var React = require('react');
var d3 = require('d3');
var c3 = require('c3');

class ForecastDetail extends React.Component {

    constructor(props) {
        super(props);

        this.chartLabels = {
            temp_f: "Temperature F",
            humidity: "Humidity %",
            cloud: "Cloud Cover %",
            wind_mph: "Wind MPH"
        }
    }

    componentDidUpdate() {
        let self = this;

        if (this.props.detailWeather) {

            let hourlyWeather = this.props.detailWeather;
            let weatherPropertiesArray = ['temp_f', 'humidity', 'wind_mph', 'cloud'];
            let weatherArrays = [];
            weatherPropertiesArray.forEach(function(property) {
                if (hourlyWeather[0].hasOwnProperty(property)) {
                    let weatherArray = [];
                    for (let i = 0; i < hourlyWeather.length; i++) {
                        weatherArray.push(hourlyWeather[i][property]);
                    }
                    weatherArray.unshift(self.chartLabels[property]);
                    weatherArrays.push(weatherArray);
                }
            });

            var chart = c3.generate({
                bindto: '.detailChart',
                data: {
                    columns: weatherArrays
                }
            });
        }
    }
    
    render() {
        let hourlyWeather = this.props.detailWeather;
        if (hourlyWeather) {

            return (
                <div className='forecast_detail'>
                    <div className="detailHeader">
                        <span>hourly weather for:&nbsp;</span>
                        <span>{this.props.currentDetailDay}</span>
                    </div>
                    
                    <div className="detailChart">
                    </div>
                </div>
            );
        }
        else {
            return <div></div>;
        }
    }
}

module.exports = ForecastDetail;