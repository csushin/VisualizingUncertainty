function createTimeseries(data){
    // console.log(data);
    var nameLength = data.nameArray.length;
    var yearLength = data.yearArray[0].length;
    var valueLength = data.value[0].length;
    var templateData = [];
    var yearAxis = [];
    var maxYLength = 0;
    var maxIndex = 0;
    // find the max range of the yer and its position
    for(var i=0; i<data.yearArray.length; i++){
        if(maxYLength < data.yearArray[i].length){
            maxYLength = data.yearArray[i].length;
            maxIndex = i;
        }
    }
    // save the year value as the x-axis array
    yearAxis.push('x');
    for(var i=0; i<data.yearArray[maxIndex].length; i++){
        yearAxis.push(data.yearArray[maxIndex][i]);
    }
    // Create the data array by following the format of the data in c3, 
    //     var chart = c3.generate({
    //     data: {
    //         columns: [
    //             ['data1', 30, 200, 100, 400, 150, 250],
    //             ['data2', 130, 100, 140, 200, 150, 50]
    //         ],
    //         type: 'spline'
    //     }
    // });
    if(nameLength!=0 && yearLength!=0 && valueLength!=0){
        templateData.push(yearAxis);
        for(var i=0; i<nameLength; i++){
            var curLine = [];
            curLine.push(data.nameArray[i]);
            for(var j=0; j<data.yearArray[i].length; j++){
                curLine.push(data.value[i][j]);
            }
            templateData.push(curLine);
        }
    }
    // console.log(templateData[0]);
    // console.log(templateData[1]);
    // console.log(templateData[2]);

    timeChart = c3.generate({
                bindto: '#timeSeries',
                data: {
                    x: 'x',
                    columns: templateData,
                    type: 'spline',
                },
                zoom: {
                    enabled: true
                },
                color: {
                    // color pattern for each type/column of data
                    pattern: ['rgb(166,206,227)','rgb(31,120,180)','rgb(178,223,138)','rgb(51,160,44)','rgb(251,154,153)',
                                'rgb(227,26,28)','rgb(253,191,111)','rgb(255,127,0)','rgb(202,178,214)','rgb(106,61,154)',
                                'rgb(255,255,153)','rgb(177,89,40)', 'rgb(141,211,199)','rgb(255,255,179)','rgb(190,186,218)','rgb(251,128,114)','rgb(128,177,211)',
                                'rgb(253,180,98)','rgb(179,222,105)','rgb(252,205,229)','rgb(217,217,217)','rgb(188,128,189)','rgb(204,235,197)','rgb(255,237,111)']
                },
                axis:{
                x:{
                    label: {
                        text: 'Year',
                        position: 'outer-center'
                    }
                },
                y:{
                    label:{
                        text: 'Q(m3/s)',
                        position: 'outer-middle'
                    }
                }
                },
                legend: {
                    position: 'right'
                }
    });   
    // console.log(timeChart);
    // to speed up the initial status, only show two time lines, and keep other hided
    // for(var i=2; i<nameLength; i++){
    //     timeChart.hide(data.nameArray[i]);
    // }
}
