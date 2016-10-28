var Horseman = require('../node_modules/node-horseman');
// var jsdom = require('jsdom').jsdom;
var jsdom = require("../node_modules/jsdom");
var window = jsdom.jsdom().parentWindow;
// jquery relies on the DOM envronment provided by jsdom
jsdom.jQueryify(window, "http://code.jquery.com/jquery.js", function () {
  $ = window.$;
});
var phantom = require('../node_modules/phantom');

exports.capture = function(req, res){
	var snapshot = req.query;
	console.log('come into the screen shot function ... with snapshot parameters: ' + snapshot);
	// construct the url and redirect to same page and save images
	// the web page would redo all the stuff according to the parameters from the url in $(document).ready() function
    var baseUrl = 'https://watersvr.dtn.asu.edu:8843/index.html?';
    var encodedUrl = baseUrl + $.param(snapshot);
    console.log('encoded url is: ' + encodedUrl);
    var horseman = new Horseman();
    var width = snapshot.webWidth;
    var height = snapshot.webHeight;
    // get the console message from the browser
    // horseman.on('consoleMessage', function(msg){
    //     console.log(msg);
    // });
    horseman.on("error", function(msg, trace){
        console.log("message is: " + msg);
        console.log("trace is : " + trace);
    });
   	var filename = '/screenshot-pic/' + snapshot.user + "_" + snapshot.title + ".png";
    var path = __dirname + filename;
    horseman.on('loadFinished', function(status){
        if(status!=="success"){
            console.log("Failing to open the page from the url " + encodedUrl);
        }
        else{
            console.log("manipulating javascript below...");
            // setTimeout(function () {
            horseman.screenshot(path);
        }
    });
    var status = horseman
          .userAgent("Chrome/37.0.2062.120")
          .authentication('foresight', 'asungaFS')
          .viewport(width, height)
          .open(encodedUrl)
          .status();
    console.log("status is " + status);
    res.jsonp({userID: snapshot.user, location: path});
}