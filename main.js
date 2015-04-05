
$(function() {

	/* ============================================ */
	/* Use Geolocation to get the client's location */
	var latitude, longitude;
	if (!navigator.geolocation) {
		console.log('ERROR: Geolocation capabilities are not available');
	} else {
		navigator.geolocation.getCurrentPosition(success, error,
			{
				enableHighAccuracy: true,
				timeout: 10000,
				maximumAge: 60000
			});
	}
	function success(position) {
		latitude = position.coords.latitude;
		longitude = position.coords.longitude;
		console.log('Lat: ' + latitude + ' --- Lon: ' + longitude);
		get_weather_data(latitude, longitude);
	}
	function error() {
		console.log('ERROR: Geolocation error. Make sure that location sharing is enabled on your device!');
	}
	var forecast_data;



	/* =================================================================== */
	/* Use location coordinates to fetch weather forcast for that location */
	function get_weather_data(lat, lon) {
		var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?lat=' + lat + '&lon=' + lon + '&cnt=10&mode=json&units=imperial&type=accurate';
		$.ajax({
			url: url,
			type: 'get',
			CrossDomain: true,
			dataType: 'jsonp',
			success: function(data) {
				forecast_data = data;

				// hide placeholder text/gif
				$("#forecast_container").html('');

				// initialize backbone functionality
				go_backbone(data);
			},
			error: function(xhr) {
				console.log('AJAX ERROR: ' + xhr.responseText);
			}
		});
	}
	


	/* ========================================= */
	/* Render weather data using a backbone view */
	function go_backbone(data) {

		var Forecast_View = Backbone.View.extend({
			el: $('#forecast_container'),
			template: _.template( $('#forecast_template').html() ),
			initialize: function() {
				this.render();
			},
			render: function() {
				console.log(this.model);
				this.$el.html( this.template(this.model) );
				return this;
			}
		});
		// instantiate forecast view
		var weather_forecast_view = new Forecast_View({ model: data});
	}
});
