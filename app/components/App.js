import React from 'react';
import $ from 'jquery';
import Header from './Header';
import ForecastWeek from './ForecastWeek';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            forecastArray: []
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

    getLocation(location) {
        this.returnWeatherData(location);
    }

    returnWeatherData(location) {

        /* format location to fit url correctly */

        let self = this;
        let url = 'https://api.apixu.com/v1/forecast.json?key=bbd73b10b32b41ccb1722924161012&q=' + location + '&days=10';
        $.ajax({
            url: url,
            type: 'get',
            CrossDomain: true,
            success: function(json) {
                this.setState({
                    forecastArray: json.forecast.forecastday,
                    location: json.location.name
                })
            }.bind(self),
            error: function(xhr) {
                console.log(xhr);
            }   
        })
    }

    render() {
        return (
            <div>
                <Header getLocation={this.getLocation.bind(this)} location={this.state.location} />
                <ForecastWeek forecastArray={this.state.forecastArray} />
            </div>
        );
    }
}