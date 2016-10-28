function projectImg2Map(data, curMap, curOverlay, imgSRC){

	var latMin = data.lrLatlng[0];
	var latMax = data.ulLatlng[0];
	var lngMin = data.ulLatlng[1];
	var lngMax = data.lrLatlng[1];

    // console.log(L.latLng(latMin, lngMin));
    // console.log(L.latLng(latMax, lngMax));
    imageBounds = L.latLngBounds(L.latLng(latMin, lngMin), L.latLng(latMax, lngMax)); //to overlap the map, we should find its south-west and north-east corner
    curOverlay = L.imageOverlay(imgSRC, imageBounds).addTo(curMap);//draw the overlay from the bound points and url 
    // curOverlay = L.imageOverlay("", imageBounds).addTo(curMap);//draw the overlay from the bound points and url  
    // curOverlay._image.parentElement.replaceChild(canvas,curOverlay._image);
    // curOverlay._image =　canvas;
    // var zoomVal = curMap.getZoom();
    // curMap.setZoom(zoomVal+1);
    // console.log([latMin, lngMin], [latMax, lngMax]);
    return curOverlay;
}