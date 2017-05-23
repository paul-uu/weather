var React = require('react');
var d3 = require('d3');
var c3 = require('c3');

class ForecastDetail extends React.Component {

    componentDidUpdate() {
        if (this.props.detailWeather) {

            let hourlyWeather = this.props.detailWeather;
            let tempArray = this.getTemperatureArray(hourlyWeather);
            tempArray.unshift('Temperature');      
            var chart = c3.generate({
                bindto: '.detailChart',
                data: {
                    columns: [
                        tempArray
                    ]
                }
            });
        }
    }
    
    objDataToArray(objProperties) {
    }

    getTemperatureArray(weather) {
        let tempArray = [];
        for (var i = 0; i < weather.length; i++) {
            tempArray.push( weather[i].temp_f )
        }
        return tempArray;
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