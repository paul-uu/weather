import React from 'react';
import Header from './Header';
import ForecastContainer from '../containers/ForecastContainer';


export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            forecastArray: [],
            location: null,
            displayLocation: null
        }
    }

    componentDidUpdate(prevProps, prevState) {
    };

    setForecast(forecastJson) {
        this.setState({ 
            forecastArray: forecastJson.forecast.forecastday,
            displayLocation: forecastJson.location.name
        });
    }    
    setLocation(location) {
        this.setState({ location: location });
    }

    render() {
        let headerMessage = this.state.forecastArray.length > 0 ? " for the next 10 days" : "Please enter a zip code, or use your current location";
        return (
            <div>
                <Header 
                    setLocation={this.setLocation.bind(this)} 
                    location={this.state.displayLocation} 
                    headerMessage={headerMessage} />
                <ForecastContainer 
                    location={this.state.location}
                    forecastArray={this.state.forecastArray}
                    setLocation={this.setLocation.bind(this)}
                    setForecast={this.setForecast.bind(this)}
                />
            </div>
        );
    }
}