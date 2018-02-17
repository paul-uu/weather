# weather

Simple weather web-app, using the openweathermap api, geolocation, ajax, and a React

[demo](https://paul-uu.github.io/weather/)

Note: the Weather API currently in use has discontinued hourly data which served a significant portion of this app. New weather api tbd.

To run this web app youself, you will need to register for an openweathermap api key. Once obtained, create a new file in the `app` directory, `app/config.js`. Within this file, add the following object and api key:

```
var config = {
  API_KEY: 'API KEY HERE'
}

export default config;
```