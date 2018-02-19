import React from 'react';
import d3 from 'd3';
import c3 from 'c3';

export default class Chart extends React.Component {
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