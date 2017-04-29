var React = require('react');

class Header extends React.Component {
    render() {
        return (
            <div className='weather_city'>
                <h3>{this.props.location} for the next 10 days</h3>
            </div>
        );
    }
}

module.exports = Header;