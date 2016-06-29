/**
 * [Custom clock for car]
 *
 * @version: 1.0.0
 * @author: JF Blouin
 * @description Displays a clock
 *
 * Note: 
 *   Clock inspired by http://www.javascriptkit.com/script/script2/css3analogclock.shtml
 *   Background image taken from SDK Speedometer app
 */
 
CustomApplicationsHandler.register("app.clock", new CustomApplication({

	/**
	 * (require) Dependencies for the application
	 */
	require: {
		js: [],
		css: ['app.css'],
		images: { },
	},

	/**
	 * (settings) Settings for application
	 */
	settings: {
		// terminateOnLost: false,
		title: 'Horloge',
		statusbar: false,
		statusbarIcon: true,
		statusbarTitle: false,
		// statusbarHideHomeButton: true,
		hasLeftButton: false,
		hasMenuCaret: false,
		hasRightArc: false,

	},

	/**
	 * (created) Creates the UI
	 */
	created: function() {
		var div = document.createElement("div");
		div.setAttribute("id", "liveclock");
		div.setAttribute("class", "outer_face")
		div.innerHTML = "";
		div.innerHTML += "<div class='marker oneseven'></div>";
		div.innerHTML += "<div class='marker twoeight'></div>";
		div.innerHTML += "<div class='marker fourten'></div>";
		div.innerHTML += "<div class='marker fiveeleven'></div>";
		div.innerHTML += "<div class='inner_face'>";
		div.innerHTML += "<div class='timedigital'></div>"; 
		div.innerHTML += "<div class='hand hour'></div>";
		div.innerHTML += "<div class='hand minute'></div>";
		div.innerHTML += "<div class='hand second'></div>";
		div.innerHTML += "</div>";
		this.canvas.get(0).appendChild(div);
	},

	/**
	 * (focused) When application is put into focus
	 */
	focused: function() {
		this.timerClock = setInterval( function() {
					var hands = $('#liveclock div.hand');
					
					var utcSeconds = CustomApplicationDataHandler.get(VehicleData.gps.timestamp).value;
					utcSeconds = utcSeconds - (240 * 60 * 1000);
					
					var curdate = new Date(0);
					curdate.setUTCSeconds(utcSeconds);

					var hour_as_degree = ( curdate.getHours() + curdate.getMinutes()/60 ) / 12 * 360
					var minute_as_degree = ( curdate.getMinutes() + curdate.getSeconds()/60 ) / 60 * 360
					var second_as_degree = ( curdate.getSeconds() + curdate.getMilliseconds()/1000 ) /60 * 360
					hands.filter('.hour').css({transform: 'rotate(' + hour_as_degree + 'deg)' })
					hands.filter('.minute').css({transform: 'rotate(' + minute_as_degree + 'deg)' })
					hands.filter('.second').css({transform: 'rotate(' + second_as_degree + 'deg)' })
					
					var timeText = curdate.getHours() + ":" + (curdate.getMinutes() < 10 ? '0' + curdate.getMinutes() : curdate.getMinutes());
					$('.timedigital').text(timeText);
				}, 100 );
	},


	/**
	 * (lost) When application loses focus
	 */
	lost: function() {
		clearInterval(this.timerClock)
	},

	/**
	 * (event) When a controller key is pressed
	 */
	onControllerEvent: function(eventId) {

	},


})); /** EOF **/
