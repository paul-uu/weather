var React = require('react');
var $ = require('jquery');
var Header = require('./Header');
var Controls = require('./Controls');
var ForecastWeek = require('./ForecastWeek');

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            forecastArray: [],
            expanded: 'collapsed'
        }
        const that = this;

        let lat, lon;
        if (!navigator.geolocation)
            console.log('error: grolocation capabilities are not available');
        else {
            navigator.geolocation.getCurrentPosition(
                success, 
                error,
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 60000
                });
        }
        function success(position) {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            let url = 'https://api.apixu.com/v1/forecast.json?key=bbd73b10b32b41ccb1722924161012&q=' + lat + ',' + lon + '&days=10';
            $.ajax({
                url: url,
                type: 'get',
                CrossDomain: true,
                success: function(json) {
                    this.setState({
                        forecastArray: json.forecast.forecastday,
                        location: json.location.name
                    });
                }.bind(that),
                error: function(xhr) {
                    console.log(xhr);
                }
            });

        }
        function error() {
            console.log('error: geolocation error. Make sure that location sharing is enabled on your device!');
        }        
    }

    expandAll() {
        this.setState({
           expanded: 'expanded' 
        });
    }
    collapseAll() {
        this.setState({
            expanded: 'collapsed'
        });
    }

    render() {
        return (
            <div>
                <Header 
                    location={this.state.location} />
                <Controls 
                    expandClick={this.expandAll.bind(this)}
                    collapseClick={this.collapseAll.bind(this)}  />
                <ForecastWeek 
                    forecastArray={this.state.forecastArray} 
                    expanded={this.state.expanded}/>
            </div>
        );
    }
}

module.exports = App;