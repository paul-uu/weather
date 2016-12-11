var app = app || {},
    day = new Date();
const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],	
      month = ['January','February','March','April','May','June','July','August','Spetember','October','November', 'December'];


$(function() {

	/* ============================================ */
	/* Use Geolocation to get the client's location */
	let latitude, longitude;
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
		get_weather_data(latitude, longitude);
	}
	function error() {
		console.log('ERROR: Geolocation error. Make sure that location sharing is enabled on your device!');
		render_error("geolocation");
	}


	/* =================================================================== */
	/* Use location coordinates to fetch weather forcast for that location */
	function get_weather_data(lat, lon) {
		let url = 'https://api.apixu.com/v1/forecast.json?key=bbd73b10b32b41ccb1722924161012&q=' + lat + ',' + lon + '&days=10';
		$.ajax({
			url: url,
			type: 'get',
			CrossDomain: true,
			success: function(data) {

				// hide placeholder text/gif
				$("#forecast_container").html('');

				// initialize backbone functionality
				go_backbone(data);
			},
			error: function(xhr) {
				console.log('AJAX ERROR: ' + xhr.responseText);
				render_error("ajax");
			}
		});
	}
	
	function render_error(err_type) {
		let error_string = "";
		switch (err_type) {
			case "geolcation":	
				error_string = "Unable to retreive your location. Please make sure that location sharing is enabled on your device!"
				break;
			case "ajax":
				error_string = "There's an issue getting your weather data.";
		}
		$("#forecast_container").html("<p class='error_message'>" + error_string + "<a id='reload'>Try again</a></p>");
		$("#reload").on('click', function() {
			document.location.reload(true);
		});
	}

	/* ========================================= */
	/* Render weather data using a backbone view */
	function go_backbone(data) {

		// Model definition
		app.Weather_Item = Backbone.Model.extend({
		});
		// Collection definition
		app.Forecast = Backbone.Collection.extend({
			model: app.Weather_Item
		});


		// View for individual weather item
		app.Weather_View = Backbone.View.extend({
			tagName: 'div',
			className: 'weather_item',
			template: _.template( $('#weather_template').html() ),
			events: {
				'click':'show_hide'
			},
			initialize: function() {
				this.render();
			},

			// the index is passed from app.Forecast_View.renderItem
			// and represents the index of the current model of the 
			// collection
			render: function(index) {
				if (index >= 0) {
					let date_html = return_date(index);
					this.$el.html( this.template(this.model) );
					this.$el.find('.weather_main').prepend(date_html);
					return this;
				}
			},

			// Events for weather view
			show_hide: function() {
				let weather_el = this.$el;
				if (weather_el.hasClass('reveal')) {
					if (weather_el.hasClass('mobile')) {
						weather_el.animate({'height':'125px'}, 700);
					}
					weather_el.children('.weather_extra').animate({'top':'0'}, 400);
				} else {
					if (weather_el.hasClass('mobile')) {
						weather_el.animate({'height':'250px'});
					}
					weather_el.children('.weather_extra').animate({'top':'125px'}, 700);
				}
				weather_el.toggleClass('reveal');
			}
		});

		// View for weather collection (forecast)
		app.Forecast_View = Backbone.View.extend({
			el: '#forecast_container',
			template: _.template( $('#forecast_template').html() ),
			initialize: function(data) {
				
				this.collection = new app.Forecast(data.forecast.forecastday);
				let city_name = data.location.name;
				this.render(city_name);
			},
			render: function(city_name) {

				this.$el.empty();

				// place city_name into an object for the collection
				// template to read from -- simply passing the template
				// the city_name as a string will not work; expects obj
				let city_obj = {
					"city":city_name
				};

				// underscore each function
				// function is the iteratee function
				// second argument this is the context object
				this.collection.each( function(model, i) {
					this.renderItem(model, i);
				}, this);

				this.$el.prepend( this.template(city_obj) );
				return this;
			},
			renderItem: function(model, i) {

				let modelView = new app.Weather_View({
					model: model
				});
				this.$el.append( modelView.render(i).el );
			}
		});


		// instantiate forecast view
		app.forecast_view = new app.Forecast_View(data);

		// add '.mobile' class to '.weather_item's if appropriate
		responsive_box_height();
	}




	/* =============== */
	/* Misc. Functions */

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

	// determine date for current model within a collection,
	// where i represents the index value of the model.
	// returns html w/ correct date for app.Weather_View
	function return_date(i) {
		if (i === 0) {
			day.setDate(day.getDate());
		} else {
			day.setDate(day.getDate() + 1);
		}
		let month_index = day.getMonth();
		return "<div class='weather_date' style='float:left;'><span class='date'>" + month[day.getMonth()] + " " + day.getDate() + "</span><br><span class='day'>" + days[day.getDay()] + "</span></div>";
	}


	/* animate extra weather info */
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
		let els = $('.weather_item');
		els.removeClass('reveal');
		toggle_weather(els);
	}
	function hide_all() {
		let els = $('.weather_item');
		els.addClass('reveal');
		toggle_weather(els);
	}
});

