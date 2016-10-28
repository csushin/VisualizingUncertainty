var waterYVal = 1960;
var growthRate = 1;
var batchNum = 2;
var rcp45Text = 'Lower Emission';
var rcp45RealVal = 'rcp45';
var rcp85Text = 'Higher Emission';
var rcp85RealVal = 'rcp85';
var climMeanText = 'Climatological Mean';
var climMeanRealVal = 'ClimMean';
var popEXPText = 'Exponential Growth';
var popEXPRealVal = 'EXP';
var popSSPText = 'Shared Social Path 1';
var popSSPRealVal = 'OECD_SSP1';
var oldGCM = ['MPI-ESM-LR', 'HadGEM2-ES', 'EC-EARTH-r12', 'CNRM-CM5', 'EC-EARTH-r3'];
var newGCM = ['NOAA-GFDL-GFDL-ESM2M', 'NCC-NorESM1-M', 'MPI-M-MPI-ESM-LR', 'MOHC-HadGEM2-ES', 
		'MIROC-MIROC5', 'IPSL-IPSL-CM5A-MR', 'ICHEC-EC-EARTH', 'CSIRO-QCCCE-CSIRO-Mk3-6-0', 'CNRM-CERFACS-CNRM-CM5', 'CCCma-CanESM2'];
var oldRCM = ['CCLM', 'HIRHAM'];
var newRCM = ['SMHI-RCA4', 'CLMcom-CCLM4-8-17', 'KNMI-RACMO22T', 'DMI-HIRHAM5', 'CCCma-CanRCM4'];
var oldGCMRCM = ['MPI-ESM-LR_CCLM', 'HadGEM2-ES_CCLM', 'EC-EARTH-r12_CCLM', 'CNRM-CM5_CCLM', 'EC-EARTH-r3_HIRHAM'];
var newGCMRCM = ['NOAA-GFDL-GFDL-ESM2M_SMHI-RCA4', 
			'NCC-NorESM1-M_SMHI-RCA4', 
			'MPI-M-MPI-ESM-LR_SMHI-RCA4', 'MPI-M-MPI-ESM-LR_CLMcom-CCLM4-8-17',
			'MOHC-HadGEM2-ES_SMHI-RCA4', 'MOHC-HadGEM2-ES_KNMI-RACMO22T', 'MOHC-HadGEM2-ES_CLMcom-CCLM4-8-17', 
			'MIROC-MIROC5_SMHI-RCA4',
			'IPSL-IPSL-CM5A-MR_SMHI-RCA4', 
			'ICHEC-EC-EARTH_DMI-HIRHAM5', 'ICHEC-EC-EARTH_KNMI-RACMO22T', 'ICHEC-EC-EARTH_SMHI-RCA4', 'ICHEC-EC-EARTH_CLMcom-CCLM4-8-17', 'CSIRO-QCCCE-CSIRO-Mk3-6-0_SMHI-RCA4', 'CNRM-CERFACS-CNRM-CM5_SMHI-RCA4',
			'CNRM-CERFACS-CNRM-CM5_CLMcom-CCLM4-8-17', 
			'CCCma-CanESM2_SMHI-RCA4', 'CCCma-CanESM2_CCCma-CanRCM4']
var yearText = ['1960', '1965', '1970', '1975', '1980', '1985', '1990', '1995', '2000', '2005', '2010', '2015', '2020', '2025', '2030', 
				'2035', '2040', '2045', '2050', '2055', '2060', '2065', '2070', '2075', '2080', '2085', '2090', '2095', '2100'];
var qrCodeManager;
///////////////////////////////////////////////////////////////
var popSourceInfo;
var waterSourceInfo;
var scarcitySourceInfo;
///////////////////////////////////////////////////////////////
var popAreaSelector;
// var popLayer;
// var popMask;
// var waterLayer;
// var waterMask;
var bounds;
var waterAreaSelector;
var scarcityAreaSelector;
///////////////////////////////////////////////////////////////
var scarcityShpLayerGrp = L.layerGroup();
var popShplayerGrp = L.layerGroup();
var waterShplayerGrp = L.layerGroup();
var waterStationBiasGrp = L.layerGroup();
var waterStationRawGrp = L.layerGroup();
var waterGeo_Stations;
var waterLayer_Stations;
var shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
var fullMonths = ['January', 'Feburary', 'March', 'April', 'May', 'June',  'July', 'August', 'September', 'October', 'November', 'December'];
var stationLatlngArr = [];
var stationDivIDArr = [];
var stationIDArr = ['1134100', '1134700', '1834110', '1834101'];
var stationMarkers = [];
var toggleSelector = false;
///////////////////////////////////////////////////////////////
var matrixInit = 0;
var tSlider;
var grSlider;
var paramSet = [];
var matrixDimNum = 0;
var popHelp;
var waterHelp;
var scarcityHelp;
///////////////////////////////////////////////////////////////
var hostIP = 'http://129.219.220.51:8443/';
var mapDoneCount = 0;
///////////////////////////////////////////////////////////////
var snapshotPool = [];
var curSnapshot;
var userName;
var title;
var description;  
var workingMode = true;
var popChatManager;
var waterChatManager;
var scarcityChatManager;
/////////////////////////////////////////////////////////////////
// save presssed key
var keysPressed = [];
var shiftCode = 16;
var gcamDemandData = {
	year: 2010,
	filename: 'g0c45p10wF',
	varname: 'total_demand'
};
var gcamDemandSwitch = false;
var demandChart;
/////////////////global variable to restore all status//////////////////////
var waterCheckBox;
var popCheckBox;
var scarcityCheckBox;
var highlightBoundingBox = null;
var highlightFlag = false;
var mapShpMark = [];
var demandShp = false,
 supplyShpSB = false,
 supplyShpSR = false,
 supplyShpRN = false,
 supplyShpBD = false,
 scarcityShpRN = false,
 scarcityShpSt = false;
