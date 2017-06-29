import React from 'react';
import LocationSearch from './LocationSearch';
import Button from './Button';

export default class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    handleLocationSearch(zipCode) {
        this.props.getLocation(zipCode);
    }

    handleGeoLocation() {

        let self = this;
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
            let lat = position.coords.latitude,
                lon = position.coords.longitude;
            self.props.getLocation(lat.toString() + ',' + lon.toString());
        }
        function error() {
            console.log('error: geolocation error. Make sure that location sharing is enabled on your device!');
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
                <h3>{this.props.location} for the next 10 days</h3>
            </div>
        );
    }
}
