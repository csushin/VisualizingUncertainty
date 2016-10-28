function mapLegendInfo(legend, curMap, colorArr, infoStr){
    legend.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info legend');
        this.update();
        return this._div;
    }
    legend.update = function (props){   
            var colorGrades = colorArr;
            var labels = [];
            var levels = [];
            if(infoStr=='Water Scarcity Map'){
                levels = ['Absolute Scarcity', 'Scarcity', 'Stress' , 'No Stress'];
                labels.push('Unit: m<sup>'+3+'</sup>/(capita*year)')
            }
            if(infoStr=='Population Map'){
                levels = [0, 1, 10 , 100, 1000, 10000];
                labels.push('Unit: people/km<sup>'+2+'</sup>')
            }
            if(infoStr=='Water Supply Map'){
                levels = [0, 500 , 10000, 200000, 5000000];
                labels.push('Unit: mm/year')
                // labels.push('Unit: m<sup>'+3+'</sup>/year')
            }
            for (var i = 0; i < levels.length; i++) {
                from = levels[i];
                to = levels[i + 1];
                if(infoStr!='Water Scarcity Map'){
                    labels.push(
                        '<i style="background:' + colorGrades[i] + '"></i> ' +
                        int2roundKMG(from) + (int2roundKMG(to) ? '&ndash;' + int2roundKMG(to) : '+'));
                }
                else{
                    labels.push(
                        '<i style="background:' + colorGrades[i] + '"></i> ' + from);
                }
            }
            this._div.innerHTML = labels.join('<br>');
    };        
    legend.addTo(curMap);
}

// Truncate a number to ind decimal places
function truncNb(Nb, ind) {
  var _nb = Nb * (Math.pow(10,ind));
  _nb = Math.floor(_nb);
  _nb = _nb / (Math.pow(10,ind));
  return _nb;
}

// convert a big number to k,M,G
function int2roundKMG(val) {
  var _str = "";
  if (val >= 1e9)        { _str = truncNb((val/1e9), 1) + ' G';
  } else if (val >= 1e6) { _str = truncNb((val/1e6), 1) + ' M';
  } else if (val >= 1e3) { _str = truncNb((val/1e3), 1) + ' K';
  } else { _str = parseInt(val);
  }
  return _str;
}