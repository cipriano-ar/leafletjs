var geojson, map, info, legend;

info = L.control();
legend = L.control({position: 'bottomright'});

init();

function init() {
	initMap();
}

function initMap() {
	// create a map in the "map" div, set the view to a given place and zoom
	map = L.map('map').setView([-41.256, 174.763],6);

	// add an OpenStreetMap tile layer
	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);

	geojson = L.geoJson(regions, {
			style: style,
			onEachFeature: onEachFeature
		}).addTo(map);
}

/* ============== STYLES ============== */

//Colours for data
function getColor(d) {
    return d > 10000 ? '#800026' :
           d > 5000  ? '#BD0026' :
           d > 2000  ? '#E31A1C' :
           d > 1000  ? '#FC4E2A' :
           d > 500   ? '#FD8D3C' :
           d > 200   ? '#FEB24C' :
           d > 100   ? '#FED976' :
                      '#FFEDA0';
}

//Some styles
function style(feature) {
    return {
        fillColor: getColor(feature.properties.density),
        fillOpacity: 0.5,
        dashArray: '2',
        weight: 2,
        opacity: 1,
        color: 'white'        
    };
}

/* ============== INTERACTIVITY ============== */

// Make the regions highlighted visually
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }
    //Update the Info box when hover over a region
    info.update(layer.feature.properties);
}

//Reset highlighting when mouse is out of a region
function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

//Zoom to the featured that has been clicked
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

//What to do on each feature (add listeners)
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

/* ============== CUSTOM INFO CONTROL ============== */

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>NZ Population 2013</h4>' +  (props ?
        '<b>' + props.name + '</b><br />' + props.density*100 + ' people'
        : 'Hover over a state');
};
info.addTo(map);

/* ============== CUSTOM LEGEND CONTROL ============== */

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 100, 200, 500, 1000, 2000, 5000, 10000],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i]*100 + (grades[i + 1]*100 ? '&ndash;' + grades[i + 1]*100 + '<br>' : '+');
    }

    return div;
};
legend.addTo(map);