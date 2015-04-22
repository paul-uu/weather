
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
				$("#forecast_container").html("<p class='error_message'>There's an issue getting the weather. <a id='reload'>Try again</a></p>");
				$("#reload").on('click', function() {
					document.location.reload(true);
				});
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
		responsive_box_height();
	}


	/* ==================== */
	/* Misc. Event Handlers */

	// add class 'mobile' to .weather_item elements
	$(window).resize(function() {
		responsive_box_height();
	});
	function responsive_box_height() {
		if ( ($(window).width()) < 1160 ) {
			$('.weather_item').addClass('mobile');
		} else {
			$('.weather_item').removeClass('mobile');
		}
	}

	/* animate extra weather info */
	$('body').on('click', '.weather_item', function() {
		var el = $(this);
		toggle_weather(el);
	});
	$('body').on('click', '#hide_all', function() {
		hide_all();
	});
	$('body').on('click', '#show_all', function() {
		show_all();
	});
	
	
	function toggle_weather(element) {
		if (element.hasClass('reveal')) {
			if (element.hasClass('mobile')) {
				element.animate({'height':'125px'}, 700);
			}
			element.children('.weather_extra').animate({'top':'0'}, 400);
		} else {
			if (element.hasClass('mobile')) {
				element.animate({'height':'250px'});
			}
			element.children('.weather_extra').animate({'top':'125px'}, 700);
		}
		element.toggleClass('reveal');
	}
	function show_all() {
		var els = $('.weather_item');
		els.removeClass('reveal');
		toggle_weather(els);
	}
	function hide_all() {
		var els = $('.weather_item');
		els.addClass('reveal');
		toggle_weather(els);
	}
});

