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
    }

    getLocation(location) {
        this.returnWeatherData(location);
    }

    returnWeatherData(location) {

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

                new Noty({
                    type: 'warning',
                    layout: 'topCenter',
                    theme: 'mint',
                    text: "Whoops, seems there's been an error while fetching your data",
                    timeout: 2500,
                    progressBar: true,
                    closeWith: 'click'
                }).show();

                console.log(xhr);
            }   
        })
    }

    render() {

        let headerMessage = this.state.forecastArray.length > 0 ? " for the next 10 days" : "Please enter a zip code, or use your current location";

        return (
            <div>
                <Header 
                    getLocation={this.getLocation.bind(this)} 
                    location={this.state.location} 
                    headerMessage={headerMessage} />

                <ForecastWeek forecastArray={this.state.forecastArray} />
            </div>
        );
    }
}