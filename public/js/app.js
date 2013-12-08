'use strict';

$(document).ready(function(){
var minZ,
		maxZ	

		if(zoomDisabled){
			minZ=14;
			maxZ=14;

		}else{
			minZ=14,
			maxZ=19
		}


	// create a map in the "map" div, set the view to a given place and zoom
		var map = L.map('map',{
			center: [52.186720665494036, 6.9501399993896475], 
			zoom: 14,
			minZoom: minZ,
			maxZoom:maxZ
		});




		// add an OpenStreetMap tile layer
		L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);

		map.setMaxBounds(map.getBounds());



		if(xpos!==undefined&&ypos!==undefined)
			L.marker([ypos,xpos]).addTo(map)
	});
