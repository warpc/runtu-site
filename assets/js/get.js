var map;
var moscow = new google.maps.LatLng(55.751667, 37.617778);

function markerLoad(id) {
    
    if ($('.list-placeholder').hasClass('hidden')) {
        $('.list-placeholder').removeClass('hidden');
    }
    
    mapResize();
    
    $.getJSON( 'get-data.html', function( data ) {
        
        $('.list-placeholder').html('');
        
        var str = '';
        
        $.each( data[id]['contacts'], function( key, val ) {
            
            str = '<div class="list-element"><div class="list-header"><img src="assets/img/person.svg"><h2>' + val['name'] + '</h2></div><table>';
            if (val['email'] != 'none') {
                str += '<tr><td>Адрес эл. почты:</td><td>' + val['email'] + '</td></tr>';
            }
            
            if (val['phone'] != 'none') {
                str += '<tr><td>Телефон:</td><td>' + val['phone'] + '</td></tr>';
            }
            
            if (val['icq'] != 'none') {
                str += '<tr><td>ICQ:</td><td>' + val['icq'] + '</td></tr>';
            }
            
            if (val['comment'] != 'none') {
                str += '<tr><td>Комментарий:</td><td>' + val['comment'] + '</td></tr>';
            }
            
            str += '</table></div>';
            
            $('.list-placeholder').append(str);
            
            });
        
        ellipsis();
        
    });
}

// Map initialize
function initialize() {
  var mapDiv = document.getElementById('map-canvas');
  var mapOptions = {
    zoom: 8,
    center: moscow,
    disableDefaultUI:true,
    scrollwheel: false
  }
  map = new google.maps.Map(mapDiv, mapOptions);

  // Create the DIV to hold the control and call the HomeControl() constructor
  // passing in this DIV.
  var homeControlDiv = document.createElement('div');
  var homeControl = new HomeControl(homeControlDiv, map);

  homeControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(homeControlDiv);
  
    var myLatlng = new google.maps.LatLng(55.751667, 37.617778);

    if (navigator.geolocation) navigator.geolocation.getCurrentPosition(function(pos) {
        var me = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        map.setCenter(me);
    }, function(error) {
    //    alert("err");
    }, function(success) {
    });
    
///////////////////////////
//        Markers        //
///////////////////////////
    
    var marker, i, countName;
    var image = 'assets/img/marker-tr.png';
    var counts;
    var markers  = [],
        marker_i = 0;
    
    $.getJSON( "get-data.html", function( data ) {
        counts = Object.keys(data).length;
        
        $.each( data, function( key, val ) {
            myLatlng = new google.maps.LatLng(val["lat"], val["lng"]);
            countName = val["count"];
            
            
            markers.push(new MarkerWithLabel({
               position: myLatlng,
               map: map,
               draggable: false,
               raiseOnDrag: false,
               labelContent: countName,
               labelAnchor: new google.maps.Point(20, 20),
               labelClass: "labels-pin", // the CSS class for the label
               labelInBackground: false,
               icon: image
             }));
            
            markers[marker_i].set("id", key);
            
            google.maps.event.addListener(markers[marker_i], 'click', function() {
                markerLoad(this.get("id"));
            });
            
            marker_i++;
            
        });

    });
  

    
///////////////////////////
//       /Markers        //
///////////////////////////

    
///////////////////////////
//      Search Box       //
///////////////////////////
    
    var markers = [];
        var defaultBounds = new google.maps.LatLngBounds(
          new google.maps.LatLng(-33.8902, 151.1759),
          new google.maps.LatLng(-33.8474, 151.2631));
//      map.fitBounds(defaultBounds);
   // Create the search box and link it to the UI element.
  var input = /** @type {HTMLInputElement} */(
      document.getElementById('pac-input'));
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var searchBox = new google.maps.places.SearchBox(
    /** @type {HTMLInputElement} */(input));
    google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    } else {
        map.setCenter(places[0].geometry.location);
    }
        
        
    
//    map.setCenter(marker[0].position)
        
//    for (var i = 0, marker; marker = markers[i]; i++) {
//      marker.setMap(null);
//    }

    // For each place, get the icon, place name, and location.
    markers = [];
//    var bounds = new google.maps.LatLngBounds();
//    for (var i = 0, place; place = places[i]; i++) {
//      var image = {
//        url: place.icon,
//        size: new google.maps.Size(71, 71),
//        origin: new google.maps.Point(0, 0),
//        anchor: new google.maps.Point(17, 34),
//        scaledSize: new google.maps.Size(25, 25)
//      };

      // Create a marker for each place.
//      var marker = new google.maps.Marker({
//        map: map,
//        icon: image,
//        title: place.name,
//        position: place.geometry.location
//      });

//      markers.push(marker);

//      bounds.extend(place.geometry.location);
//    }
//
//    map.fitBounds(bounds);
//        map.setZoom(8);
  });
    
    google.maps.event.addListener(map, 'bounds_changed', function() {
//    var bounds = map.getBounds();
//    searchBox.setBounds(bounds);
        
  });
    
///////////////////////////
//     /Search Box       //
///////////////////////////

    
}

function HomeControl(controlDiv, map) {

  // Set CSS styles for the DIV containing the control
  // Setting padding to 5 px will offset the control
  // from the edge of the map.
  controlDiv.style.padding = '0px 10px 15px 50px';

  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = 'transparent';
  controlUI.style.borderStyle = 'solid';
  controlUI.style.borderWidth = '0px';
  controlUI.style.cursor = 'pointer';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to set the map to Home';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.fontFamily = 'Arial,sans-serif';
  controlText.style.fontSize = '12px';
  controlText.style.paddingTop = '9px';
  controlText.style.paddingBottom = '9px';
  controlText.innerHTML = '<img src="assets/img/map_btn_plus.svg">';
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to moscow.
  google.maps.event.addDomListener(controlUI, 'click', function() {
    var zoom = map.getZoom();
    map.setZoom(zoom+1);
  });
    
  var controlUIZoomOut = document.createElement('div');
  controlUIZoomOut.style.backgroundColor = 'transparent';
  controlUIZoomOut.style.borderStyle = 'solid';
  controlUIZoomOut.style.borderWidth = '0px';
  controlUIZoomOut.style.cursor = 'pointer';
  controlUIZoomOut.style.textAlign = 'center';
  controlUIZoomOut.title = 'Click to set the map to Home';
  controlDiv.appendChild(controlUIZoomOut);

  // Set CSS for the control interior.
  var controlTextZoomOut = document.createElement('div');
  controlTextZoomOut.style.fontFamily = 'Arial,sans-serif';
  controlTextZoomOut.style.fontSize = '12px';
  controlTextZoomOut.style.paddingTop = '9px';
  controlTextZoomOut.style.paddingBottom = '9px';
  controlTextZoomOut.innerHTML = '<img src="assets/img/map_btn_minus.svg">';
  controlUIZoomOut.appendChild(controlTextZoomOut);
    
//  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(controlDiv);

  // Setup the click event listeners: simply set the map to moscow.
  google.maps.event.addDomListener(controlUIZoomOut, 'click', function() {
    var zoomOut = map.getZoom();
    map.setZoom(zoomOut-1);
  });
    
    
  var goHomeUI = document.createElement('div');
  goHomeUI.style.backgroundColor = 'transparent';
  goHomeUI.style.borderStyle = 'solid';
  goHomeUI.style.borderWidth = '0px';
  goHomeUI.style.cursor = 'pointer';
  goHomeUI.style.textAlign = 'center';
  goHomeUI.title = 'Click to set the map to Home';
  controlDiv.appendChild(goHomeUI);

  // Set CSS for the control interior.
  var controlTextgoHomeUI = document.createElement('div');
  controlTextgoHomeUI.style.fontFamily = 'Arial,sans-serif';
  controlTextgoHomeUI.style.fontSize = '12px';
  controlTextgoHomeUI.style.paddingTop = '9px';
  controlTextgoHomeUI.style.paddingBottom = '9px';
  controlTextgoHomeUI.innerHTML = '<img src="assets/img/map_btn_location.svg">';
  goHomeUI.appendChild(controlTextgoHomeUI);
    

    
  google.maps.event.addDomListener(goHomeUI, 'click', function() {
    
    if (navigator.geolocation) navigator.geolocation.getCurrentPosition(function(pos) {
        var me = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        map.setCenter(me);
    }, function(error) {
    //    alert("err");
    }, function(success) {
    });
      
  });
//    
    
}

// Map size
function mapResize() {
    var windowHeight = $(window).outerHeight();
    var windowWidth = $(window).outerWidth();
    var menuHeight = $('.navbar.navbar-fixed-top').outerHeight();
    $('#map-canvas').css('height', windowHeight - menuHeight - 40 + 'px');
    if ($('.list-placeholder').hasClass('hidden')) {
        $('#pac-input').css('width', windowWidth - 100 + 'px');
    } else {
        $('#pac-input').css('width', windowWidth - 582 + 'px');
    }
    
    var mapHeight = $('#map-canvas').outerHeight() - 100;
    
     $('.list-placeholder').css('height', mapHeight + 'px');
}

function showPosition(position) {
  var lat = position.coords.latitude;
  var lng = position.coords.longitude;
  map.setCenter(new google.maps.LatLng(lat, lng));
}

function ellipsis() {
    $('.list-placeholder h2').dotdotdot({
        wrap: 'letter',
        watch: 'window',
        tolerance: 10
    });	
}

$(document).ready(function() {
    
    // Checkboxes
    $('input.runtu').iCheck({
        checkboxClass: 'icheckbox_runtu',
        radioClass: 'iradio_runtu',
        increaseArea: '20%' // optional
    });
    
    // Map init
    mapResize();
    google.maps.event.addDomListener(window, 'load', initialize);
    
    ellipsis();
    
    
});

$(window).resize(function() {
    mapResize();
});

