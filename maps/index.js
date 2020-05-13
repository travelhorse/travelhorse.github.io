
			var map, infoWindow;

			// Initialize and add the map
			function initMap() {
				// The location of Tampines Street 21
				var TampinesSt21 = {lat: 1.344260, lng: 103.964990};

				////////////////////////////////****************************************************** */
				// set up the map, centered at Tampines Street 21
				var map = new google.maps.Map(
					document.getElementById('map'), {
						zoom: 14,
						center: TampinesSt21
					}
				);
				//////////////////////********************************************************** */
				// Marker Clustering
				var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

				var locations = [
					{lat: 1.312188, lng: 103.863563, name: 'Crown Coffee'},
                    {lat: 1.311968, lng: 103.863282, name: "CT Hub 2"},
                    {lat: 1.276895, lng: 103.84114, name: "The Pinnacle @ Duxton"},
                    {lat: 1.301322, lng: 103.840486, name: "Cuppage Plaza"},
                    {lat: 1.279191, lng: 103.840659, name: "Bukit Pasih Road"},
                    {lat: 1.298901, lng: 103.787682, name: "Bountie Arena"},
                    {lat: 1.311189, lng: 103.856668, name: "City Square Mall"},
                    {lat: 1.300697, lng: 103.844751, name: "DISTRICT"},
                    {lat: 1.300839, lng: 103.844804, name: "Chippy British Take Away (Plaza Singapura)"},
                    {lat: 1.307065, lng: 103.833486, name: "Chippy British Take Away (Bugis Junction)"}
                ]

				// Add some markers to the map.*
				// Note: The code uses the JavaScript Array.prototype.map() method to
				// create an array of markers based on a given "locations" array.
				// The map() method here has nothing to do with the Google Maps API.
				var markers = locations.map(function(location, i) {

					return new google.maps.Marker({
						position: location,
						label: locations[i].name
						// label: labels[i % labels.length]
					});
				});

				// Add a marker clusterer to manage the markers.
				var markerCluster = new MarkerClusterer(map, markers,
                    {imagePath: 'img/markers/m'});

				//////////////////////// **************************************************
				// Initialise an Info Window
				infoWindow = new google.maps.InfoWindow;
				var userPosition;

				// Try HTML5 geolocation
				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(function(position) {
						
						var pos = {
							lat: position.coords.latitude,
							lng: position.coords.longitude
						};

						printUserLocation(pos);

						var marker2 = new google.maps.Marker({position: pos, map: map});

						infoWindow.setPosition(pos);
						infoWindow.setContent('This is your location.');
						infoWindow.open(map);
						map.setCenter(pos);
					}, function() {
						handleLocationError(true, infoWindow, map.getCenter());
					});
				} else {
					// Browser doesn't support Geolocation
					handleLocationError(false, infoWindow, map.getCenter());
				}

				function handleLocationError(browserHasGeolocation, infoWindow, pos) {
					infoWindow.setPosition(pos);
					infoWindow.setContent(browserHasGeolocation ?
										'Error: The Geolocation service failed.' :
										'Error: Your browser doesn\'t support geolocation.');
					infoWindow.open(map);
				}

				///////////////////////////////////////////////
				// The marker, positioned at Tampines Street 21
				var marker = new google.maps.Marker({position: TampinesSt21, map: map});
				function printUserLocation(userPosition) {
					var yourLocationDiv = document.getElementById("userPosLat");
                    var userPosLatString = String(userPosition['lat']);
					var content = document.createTextNode(userPosLatString);
					yourLocationDiv.appendChild(content);
				}


				
			} //////////