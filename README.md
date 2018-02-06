# weather

Simple weather web-app, using the openweathermap api, geolocation, ajax, and a backbone.js view.

1. Determine the user's location using the geolocation api
2. Use the location coordinates to make an ajax get request to the openweather api
3. Pass the jsonp data as a model into a backbone view
4. Render the data using underscore.js' template engine

[demo](https://paul-uu.github.io/weather/)

To run this web app youself, you will need to register for an openweathermap api key. Once obtained, create a new file in the `app` directory, `app/config.js`. Within this file, add the following object and api key:

```
var config = {
  API_KEY = 'API KEY HERE'
}

export default config;
```