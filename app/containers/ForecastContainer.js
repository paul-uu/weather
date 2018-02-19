import React from  'react';
import ForecastWeek from '../components/ForecastWeek';
import $ from 'jquery';
import config from '../config';
import Noty from 'noty';

export default class ForecaseContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {   
    if (nextProps.location != this.props.location)
      this.getForecast(nextProps.location);
  }

  getForecast(location) {
    let self = this;
    if (location) {
      let url = `https://api.apixu.com/v1/forecast.json?key=${config.API_KEY}&q=${location}&days=10`;
      $.ajax({
        url,
        type: 'get',
        CrossDomain: true,
        success: function(json) {
          self.props.setForecast(json);
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
  }

  render() {
    return <ForecastWeek forecastArray={this.props.forecastArray} />;
  }
}


