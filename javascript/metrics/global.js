var overlay;
var modalStat = {};
var ensembleStat = {};
var totalMetric;// = ["ModalMean", "ModalStd", "ModalEntropy", "ModalCV", "ModalIQR"];
var treeTypeKeyword;
var fuzzyThresholdTF = ["rgb(82,82,82)", "rgb(150,150,150)", "rgb(217,217,217)", "rgb(255,255,255)"];
var fuzzyThresholdValues = [ 0.8, 1.2, 1.6];
var FuzzyThresholdLoader = new FuzzyThresholdImgLoader();
var globalDataType = "tasmin_HIST";
var httpDomain = "http://watersvr.dtn.asu.edu:8080/";
var localHttpDomain = "http://localhost:8080/";

//overview
/////////////////////////////////////////////////////////////////
var metriclist = ["Text", "Mean", "Median", "Std", "IQR", "CV", "Entropy", "QuadraticScore"];
var datatype = ["Others", "Ensemble", "Precipitation", "TemperatureMin", "TemperatureMax", "Runoff"];
// var datatype = ["Others", "Analysis", "Precipitation"];//, "TemperatureMin"];//, "Scarcity", "Runoff"];
var resulttype = ["Map", "Histogram"];
var imgSet = [];

var overViewInitialized = false;

var globalMeanMinMax = {
	"Skewness":{
		"Precipitation": [ -1, 1],
		"TemperatureMin": [ -1, 1],
		"Runoff": [ -1, 1],
		"Scarcity": [ -1, 1],
		"Ensemble": [ -1, 1],
		"TemperatureMax": [ -1, 1]
	},
	"Kurtosis":{
		"Precipitation": [ 0, 5],
		"TemperatureMin":  [ 0, 5],
		"Runoff":  [ 0, 5],
		"Scarcity":  [ 0, 5],
		"Ensemble":  [ 0, 5],
		"TemperatureMax":  [ 0, 5]
	},
	"Mean":{
		"Precipitation": [ 4.977600431181695, 7859.009533241146],
		"TemperatureMin": [280.8888612148648, 299.90955182551966],
		"Runoff": [-1122618.0267757813, 7.113895978594404*Math.pow(10, 8)],
		"Scarcity": [1, 4],
		"Ensemble": [4.977600431181695, 7859.009533241146],
		"TemperatureMax": [292.60276067489843,314.4455684700289]
	},
	"Median":{
		"Precipitation": [ 2.180268334560707, 7882.759094238282],
		"TemperatureMin": [280.7902913550808, 299.85704952696585],
		"Runoff": [ -1123069.420782408, 7.133304474399931*Math.pow(10, 8)],
		"Scarcity": [1, 4],
		"Ensemble": [4.977600431181695, 7859.009533241146],
		"TemperatureMax": [292.54189805097144, 314.4121160871996]			
	},
	"CV":{
		"Precipitation": [  0.04517674677366841, 1.665750799786128],
		"TemperatureMin": [ 7.780918248708044*Math.pow(10, -4), 0.0032032690006944878],
		"Runoff": [-6039573.917337135, 109110.81082230133],
		"Scarcity": [0.0, 0.7483314773547882],
		"Ensemble": [4.977600431181695, 7859.009533241146],
		"TemperatureMax": [6.255440757140792*Math.pow(10, -4), 0.003472252202023]			
	},
	"Entropy":{
		"Precipitation": [0.13303964861069892, 1.0],
		"TemperatureMin": [0.22748794637823935, 1.0],
		"Runoff": [0.13303964861069892, 1.0],
		"Scarcity": [ -0.0,1.3689223607402194],
		"Ensemble": [4.977600431181695, 7859.009533241146],
		"TemperatureMax": [0.2782660544906132, 1.0]	
	},
	"QuadraticScore":{
		"Precipitation": [ 0.0, 0.8717421124828533],
		"TemperatureMin": [0.07133058984910842, 0.7764060356652949],
		"Runoff": [0.0, 0.8888888888888888],
		"Scarcity": [0.0, 0.7407407407407407],
		"Ensemble": [4.977600431181695, 7859.009533241146],
		"TemperatureMax": [0.1392318244170096, 0.8079561042524006]	
	},
	"Std":{
		"Precipitation": [ 6.164493257329533, 902.8800165733161],
		"TemperatureMin": [ 0.23100463906181043, 0.9378465811926808],
		"Runoff": [0.0, 9.212119947565624*Math.pow(10, 7)],
		"Scarcity": [0.0,1.49071198499986],
		"Ensemble": [4.977600431181695, 7859.009533241146],
		"TemperatureMax": [0.1879151618013785, 1.0556835149882824]	
	},
	"IQR":{
		"Precipitation": [6.3549041748046875, 1108.6794121958874],
		"TemperatureMin": [0.2678782771113788, 1.6499600664959644],
		"Runoff": [0.0, 1.4417183700171632*Math.pow(10, 8)],
		"Scarcity": [ -0.0, 1.3689223607402194],
		"Ensemble": [4.977600431181695, 7859.009533241146],
		"TemperatureMax": [0.2621904035217426, 1.6245442195481132]		
	}

}

var ensembleTab = false;
var singleTabl = true;
var marker;
var matrixMarker;
var similarityMarker;
var redMarker = L.ExtraMarkers.icon({
    icon: 'fa-coffee',
    markerColor: 'purple',
    shape: 'circle',
    prefix: 'fa'
  });
var matrixPath;
var circles = [];
var paralleCoordinate;
var ensembleLegend1;
var ensembleLegend2;
var similarityColorType;
var treeBalanceOverlay;
var treeSimilarityOverlay;

var GCM = ["CCCma-CanESM2", "CNRM-CERFACS-CNRM-CM5", "CSIRO-QCCCE-CSIRO-Mk3-6-0", "ICHEC-EC-EARTH", "IPSL-IPSL-CM5A-MR", "MIROC-MIROC5", "MOHC-HadGEM2-ES", "MPI-M-MPI-ESM-LR", "NCC-NorESM1-M", "NOAA-GFDL-GFDL-ESM2M"];
var RCM = ["CCCma-CanRCM4", "SMHI-RCA4", "CLMcom-CCLM4-8-17", "DMI-HIRHAM5", "KNMI-RACMO22T"];
var modelSet = ["CCCma-CanESM2_CCCma-CanRCM4",
			    "CCCma-CanESM2_SMHI-RCA4",
			    "CNRM-CERFACS-CNRM-CM5_CLMcom-CCLM4-8-17",
			    "CNRM-CERFACS-CNRM-CM5_SMHI-RCA4",
			    "CSIRO-QCCCE-CSIRO-Mk3-6-0_SMHI-RCA4",
			    "ICHEC-EC-EARTH_CLMcom-CCLM4-8-17",
			    "ICHEC-EC-EARTH_DMI-HIRHAM5",
			    "ICHEC-EC-EARTH_KNMI-RACMO22T",
			    "ICHEC-EC-EARTH_SMHI-RCA4",
			    "IPSL-IPSL-CM5A-MR_SMHI-RCA4",
			    "MIROC-MIROC5_SMHI-RCA4_v1",
			    "MOHC-HadGEM2-ES_CLMcom-CCLM4-8-17",
			    "MOHC-HadGEM2-ES_SMHI-RCA4",
			    "MOHC-HadGEM2-ES_KNMI-RACMO22T_v1",
			    "MPI-M-MPI-ESM-LR_CLMcom-CCLM4-8-17",
			    "MPI-M-MPI-ESM-LR_SMHI-RCA4",
			    "NCC-NorESM1-M_SMHI-RCA4",
			    "NOAA-GFDL-GFDL-ESM2M_SMHI-RCA4"];
