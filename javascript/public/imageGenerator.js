function imageGenerator(data, map, colorMapper, imgType){
  if(data){
        // console.log("crashed before here ");
        var latMin = data.lrLatlng[0];
        var latMax = data.ulLatlng[0];
        var lngMin = data.ulLatlng[1];
        var lngMax = data.lrLatlng[1];
        var pixelSW = map.latLngToLayerPoint([latMin, lngMin]);
        var pixelNE = map.latLngToLayerPoint([latMax, lngMax]);
        var width = Math.abs(pixelNE.x-pixelSW.x);
        var height = Math.abs(pixelNE.y-pixelSW.y);
        // console.log(width, height);
        // console.log('imgWidth: ' + data.size[1] + " imgHeight: " + data.size[0]);
        var wRatio = 1;
        var hRatio = 1;
        var widthLimit = 8000;
        var heightLimit = 8000;

        if(width>widthLimit || height>heightLimit){
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

        for(var i=0; i<data.dataList.length; i++){
          var latIndex = data.dataList[i].lat;//get the current lat and lng
          var lngIndex = data.dataList[i].lng;
          var index = map.latLngToLayerPoint([latIndex, lngIndex]);
          // console.log(index);
          if(width>widthLimit || height>heightLimit){
            var w = Math.floor((index.x-pixelSW.x)*wRatio);
            var h = Math.floor((index.y-pixelNE.y)*hRatio);
          }
          else{
            var w = index.x-pixelSW.x;
            var h = index.y-pixelNE.y;  
          }

          var listPos = (h*canvas.width+w)*4;//step 4 to store r,g,b,a in each step
          // var typeVal = Math.log(data.dataList[i].typeVal);//get the current type, here is the supply, value
          if(data.dataList[i].value>=0.0){
            var value = parseFloat(data.dataList[i].value);

            // value = Math.log(value*scaleFactor);
            if(imgType!='scarcity'){
              var colorString = colorMapper(value);
              var colorsOnly = colorString.split(")");
              var colorsOnly = colorString.split("(");
              var colorsOnly = colorsOnly[1].split(",");

              imgData.data[listPos] = parseInt(colorsOnly[0]);
              imgData.data[listPos+1] = parseInt(colorsOnly[1]);
              imgData.data[listPos+2] = parseInt(colorsOnly[2]);
              imgData.data[listPos+3] = 200;               
            }
            else{
              var origVal = data.dataList[i].value;
              var colorThreshold = [];
              if(origVal<500){
                  colorThreshold = [255, 0, 0];
              }
              else if(origVal>=500 && origVal<1000){
                colorThreshold = [254, 178, 76];
              }
              else if(origVal>=1000 && origVal <1700){
                colorThreshold = [173, 221, 142];
              }
              else if(origVal>=1700){
                colorThreshold = [49, 163, 84];
              }
              imgData.data[listPos] = colorThreshold[0];
              imgData.data[listPos+1] = colorThreshold[1];
              imgData.data[listPos+2] = colorThreshold[2];
              imgData.data[listPos+3] = 200;     
            }
     
                
            // imgData.data[listPos] = 150;
            // imgData.data[listPos+1] = 200;
            // imgData.data[listPos+2] = 300;
            // imgData.data[listPos+3] = 200;
          }else{
           imgData.data[listPos] = 0;
           imgData.data[listPos+1] = 0;
           imgData.data[listPos+2] = 0;
           imgData.data[listPos+3] = 0;
         }   
        }
        ctx.putImageData(imgData, 0, 0);//generate an image and the url, through which the image overlapps on the map
        image.src = canvas.toDataURL();//generate the url of the image
        // console.log('image generation finished!');
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
      console.log('empty image generation finished!');
      return image.src;            
  }
}

