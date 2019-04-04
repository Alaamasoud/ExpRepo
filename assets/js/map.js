
// DisplayMap

function initMap() {
    var uluru = {
        lat: 52.090736,
        lng: 5.121420
    };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: uluru,
        disableDefaultUI: true,
        styles: [
        {
            "featureType": "landscape",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "stylers": [
                {
                    "hue": "#00aaff"
                },
                {
                    "saturation": -100
                },
                {
                    "gamma": 2.15
                },
                {
                    "lightness": 12
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "lightness": 24
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
                {
                    "lightness": 57
                }
            ]
        }
    ]
    });
    var image = 'assets/images/basic/googlemaps-marker.png';
    var marker = new google.maps.Marker({
        position: uluru,
        map: map,
        icon: image
    });
}

// DisplayMap
