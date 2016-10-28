$( document ).ready(function() {
	// generateImgSrc();
	
	window.onload = window.onresize = function () {
        var mainContainer = document.getElementById("matrixContainer");
        var height = window.innerHeight;
        var width = window.innerWidth;
        var max = Math.max(height, width);
        mainContainer.style.height = max + "px";
        mainContainer.style.width = max + "px";
        updateMatrix(null, null);
	};
});