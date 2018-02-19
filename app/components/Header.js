import React from 'react';
import Noty from 'noty';
import LocationSearch from './LocationSearch';
import Button from './Button';

export default class Header extends React.Component {

  constructor(props) {
    super(props);
  }

  handleLocationSearch(zipCode) {
    this.props.setLocation(zipCode);
  }

  handleGeoLocation() {

    let self = this;
    if (!navigator.geolocation) {
      new Noty({
        type: 'warning',
        layout: 'topCenter',
        theme: 'mint',
        text: 'Geolocatino capabilities are not available. Please enter a zip code',
        timeout: 2500,
        progressBar: true,
        closeWith: 'click'
      }).show();
    }
    else {
      navigator.geolocation.getCurrentPosition(
        success, 
        error,
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    }
    function success(position) {
      let lat = position.coords.latitude,
          lon = position.coords.longitude;
      self.props.setLocation(lat.toString() + ',' + lon.toString());
    }
    function error() {
      new Noty({
        type: 'warning',
        layout: 'topCenter',
        theme: 'mint',
        text: 'Unable to use geolocation. Make sure that locatin sharing is enabled on you device',
        timeout: 2500,
        progressBar: true,
        closeWith: 'click'
      }).show();        
    }           
  }

  render() {
    return (
      <div className='weather_city'>
        <div>
          <LocationSearch onClick={this.handleLocationSearch.bind(this)} />
            <Button
              onClick={this.handleGeoLocation.bind(this)}
              text={'Use Geolocation'} />
        </div>
        <h3>{this.props.location} {this.props.headerMessage}</h3>
      </div>
    );
  }
}
