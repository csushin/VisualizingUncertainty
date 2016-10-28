var popOptions = ['Exponential Growth', 'Shared Social Path'];
var popRealVals = ['EXP', 'OECD_SSP1'];
var scenarioOptions = ['Climatological Mean', 'Wet', 'Dry'];
var scenarioRealVals = ['ClimMean', 'Wet', 'Dry'];
var emissionOptions = ['Lower Emission', 'Higher Emission'];
var emissionRealVals = ['rcp45', 'rcp85'];
var xText = ['EC-EARTH-r3_HIRHAM', 'CNRM-CM5_CCLM', 'EC-EARTH-r12_CCLM', 'HadGEM2-ES_CCLM', 'MPI-ESM-LR_CCLM'];
var xagreelegendText = ['40%', '60%', '80%', '100%'];
var yagreelegendText = ['Abs. Scar.', 'Scarcity', 'Stress', 'No Stress'];
var xvariancelegendText = ['0', '0.4', '0.6', '0.8', '1.1'];
var xVariancelegendText = ['0.', '1.0', '1.5', '2.0'];
var yvariancelegendText = ['variance'];
var agreeColorTable = ['#fee5d9', '#fcae91', '#fb6a4a', '#cb181d',
              '#ffffd4', '#fed98e', '#fe9929', '#d95f0e', 
              '#ffffcc', '#F9EFA8', '#F4E054', '#F0D200', 
              '#edf8fb', '#b2e2e2', '#66c2a4', '#238b45'];
// var variancecolorTable = ['rgb(247,247,247)', 'rgb(204,204,204)', 'rgb(150,150,150)', 'rgb(82,82,82)'];
var entropyColorTable = ['rgb(242,240,247)','rgb(203,201,226)','rgb(158,154,200)','rgb(117,107,177)','rgb(84,39,143)'];
var varianceColorTable = ['rgb(254,235,226)','rgb(251,180,185)','rgb(247,104,161)','rgb(174,1,126)'];
var growthSlider;
var growthRate = 1;
var yearVal = 2010;
var toggleSelector = false;
