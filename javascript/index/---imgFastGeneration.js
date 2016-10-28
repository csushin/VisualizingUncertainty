function fastGenerator(data, map, colorMapper, imgType){
    if(data){
    	var height = parseInt(data.size[0]);
    	var width = parseInt(data.size[1]);
        // console.log(width, height);
    	var wRatio = 1;
      var hRatio = 1;
      var widthLimit = 8000;
      var heightLimit = 8000;

      if(width>widthLimit || height>heightLimit)
      {
        wRatio = widthLimit/width;
        hRatio = heightLimit/height;
      }

      canvas.width = width*wRatio;
      canvas.height = height*hRatio;   


      ctx.clearRect(0, 0, canvas.width, canvas.height);// in case of repeated layer, clear the canvas and layer
      imgData = ctx.createImageData(canvas.width, canvas.height);// create a new canvas.

      for(var h=0; h<canvas.height; h++){
          for(var w=0; w<canvas.width; w++){
            var pos = (h*canvas.width+w)*4;
            imgData.data[pos] = 0;// initialize the value of each pixel in the image
            imgData.data[pos+1] = 0;
            imgData.data[pos+2] = 0;
            imgData.data[pos+3] = 0;
          }
      }


      var latMin = data.lrLatlng[0];
      var latMax = data.ulLatlng[0];
      var lngMin = data.ulLatlng[1];
      var lngMax = data.lrLatlng[1];
      // var latUnit = (latMin - latMax) / height;
      // var lngUnit = (lngMin - lngMax) / width;
      // console.log(latUnit, lngUnit);
      var pixelSW = map.latLngToLayerPoint([latMin, lngMin]);
      var pixelNE = map.latLngToLayerPoint([latMax, lngMax]);
      // console.log(pixelSW);
      // console.log(pixelNE);
      // var width = Math.abs(pixelNE.x-pixelSW.x);
      // var height = Math.abs(pixelNE.y-pixelSW.y);


      for(var i=0; i<data.dataList.length; i++){
        var value = parseFloat(data.dataList[i].value);
        var w = data.dataList[i].wIndex;
        var h =  data.dataList[i].hIndex;

        // if(w==0 && h==0){
        //   h = Math.floor((data.dataList[i].lat - latMax)/latUnit);
        //   w = Math.floor((data.dataList[i].lng - lngMax)/lngUnit);
        //   // console.log(w, h);
        // }
        // console.log(w,h);
        var pos = 4*(h*width+w);
        if(value>Math.exp(1)){
         // console.log(value);
          value = Math.log(value*scaleFactor);
          var colorString = colorMapper(value);
          var colorsOnly = colorString.split(")");
          var colorsOnly = colorString.split("(");
          var colorsOnly = colorsOnly[1].split(",");
          imgData.data[pos] = parseInt(colorsOnly[0]);
          imgData.data[pos+1] = parseInt(colorsOnly[1]);
          imgData.data[pos+2] = parseInt(colorsOnly[2]);
          imgData.data[pos+3] = 200;
        }else{
          imgData.data[pos] = 0;
          imgData.data[pos+1] = 0;
          imgData.data[pos+2] = 0;
          imgData.data[pos+3] = 0;
        }             
      }

      ctx.putImageData(imgData, 0, 0);//generate an image and the url, through which the image overlapps on the map
      image.src = canvas.toDataURL();//generate the url of the image
      // console.log('image generation finished!');
      // console.log(image.src);
      return image.src;     
    }
    else{//create a transparant img as the bg image
        canvas.width = 95;
        canvas.height = 95;   

        ctx.clearRect(0, 0, canvas.width, canvas.height);// in case of repeated layer, clear the canvas and layer
        imgData = ctx.createImageData(canvas.width, canvas.height);// create a new canvas.    
        for(var h=0; h<canvas.height; h++){
            for(var w=0; w<canvas.width; w++){
              var pos = (h*canvas.width+w)*4;
              imgData.data[pos] = 128;// initialize the value of each pixel in the image
              imgData.data[pos+1] = 128;
              imgData.data[pos+2] = 128;
              imgData.data[pos+3] = 255;
            }
        }  
        ctx.putImageData(imgData, 0, 0);//generate an image and the url, through which the image overlapps on the map
        image.src = canvas.toDataURL();//generate the url of the image
        // console.log('image generation finished!');

        return image.src;            
    }
}