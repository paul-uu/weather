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
    let daysQty = this.state.forecastArray.length;
    let headerMessage = daysQty > 0 ? ` for the next ${daysQty} days` : `Please enter a zip code or use you current location`;
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