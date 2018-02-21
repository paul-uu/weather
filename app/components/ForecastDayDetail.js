import React from 'react';

const ForecastDayDetail = props => {
  if (props.detailWeather) {
    return (
      <div className='forecastDayDetail'>
        <span className='forecastDayDetail__item'>{props.detailWeather.maxtemp_f}</span>
        <span className='forecastDayDetail__item'>{props.detailWeather.mintemp_f}</span>
        <span className='forecastDayDetail__item'>{props.detailWeather.condition.text}</span>
        <span className='forecastDayDetail__item'>
          <img src={props.detailWeather.condition.icon} />
        </span>
        <span className='forecastDayDetail__item'>{props.detailWeather.maxwind_mph}</span>
        <span className='forecastDayDetail__item'>{props.detailWeather.avghumidity}</span>
        <span className='forecastDayDetail__item'>{props.detailWeather.totalprecip_in}</span>
        <span className='forecastDayDetail__item'>{props.detailWeather.avgvis_miles}</span>
        <span className='forecastDayDetail__item'>{props.detailWeather.uv}</span>
      </div>
    );
  }
  else {
    return <div></div>;
  }
}

export default ForecastDayDetail;