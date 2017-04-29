var React = require('react');

class Controls extends React.Component {
    render() {
        return (
            <div className='controls'>
                <span className='hide_all' onClick={this.props.collapseClick}>-</span>
                <span className='show_all' onClick={this.props.expandClick}>+</span>
            </div>
        );
    }
}

module.exports = Controls;