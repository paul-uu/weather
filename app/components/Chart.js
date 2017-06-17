var React = require('react');
var d3 = require('d3');
var c3 = require('c3');

class Chart extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.chartC3(this.props.detailWeather);
    }
    componentDidUpdate() {
        this.chartC3(this.props.detailWeather);
    }
    chartC3(data) {
        data = data ? data : [];
        let chart = c3.generate({
            bindto: '.detailChart',
            data: {
                columns: data,
                type: 'spline'
            }
        });
    }
    render() {
        return (
            <div className='detailChart'></div>
        );
    }
}
module.exports = Chart;