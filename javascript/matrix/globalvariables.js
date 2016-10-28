///////////////////////////////////////////////////////////////////////////////////////////
// climate models' parameters
var gcm = ['MPI-ESM-LR', 'HadGEM2-ES', 'EC-EARTH-r12', 'CNRM-CM5', 'EC-EARTH-r3'];
var rcm = ['CCLM', 'HIRHAM'];
var gcm_rcmCombination_fake = ['A', 'B', 'C', 'D', 'E'];
var gcm_rcmCombination = ['MPI-ESM-LR_CCLM', 'HadGEM2-ES_CCLM', 'EC-EARTH-r12_CCLM', 'CNRM-CM5_CCLM', 'EC-EARTH-r3_HIRHAM'];
var exp = ['historical', 'rcp45', 'rcp85'];
var varType = ['BW'];
var POP = ['EXP', 'OECD_SSP1'];
var YEAR = ['ClimMean', 'Dry', 'Wet', '1960', '1965', '1970', '1975', '1980', '1985', '1990', '1995', '2000', '2005', '2010', '2015', '2020', '2025', '2030', 
				'2035', '2040', '2045', '2050', '2055', '2060', '2065', '2070', '2075', '2080', '2085', '2090', '2095', '2100'];

///////////////////////////////////////////////////////////////////////////////////////////
// canvas to generate the data image
var canvas = document.createElement("canvas");
var ctx = canvas.getContext('2d');
var imgDataFromCTX;
var imgdata;
var image = new Image();

///////////////////////////////////////////////////////////////////////////////////////////
var imgSrcSet = [];
var nameSet = [];
var rgbaWater = ['rgb(239,243,255)','rgb(198,219,239)','rgb(158,202,225)','rgb(107,174,214)','rgb(49,130,189)','rgb(8,81,156)'],
    rgbaScarcity = ['rgb(237,248,251)','rgb(191,211,230)','rgb(158,188,218)','rgb(140,150,198)','rgb(136,86,167)','rgb(129,15,124)'],
    rgbaPop = ['rgb(254,237,222)','rgb(253,208,162)','rgb(253,174,107)','rgb(253,141,60)','rgb(230,85,13)','rgb(166,54,3)'];
var scaleFactor = 1.0;