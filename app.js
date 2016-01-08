/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */
/*global */
/*
A simple node.js application intended to read data from Analog pins on the Intel based development boards 
such as the Intel(R) Galileo and Edison with Arduino breakout board, and display it in a browser running on the client.

This demonstrates use of http.createServer, and fs.

MRAA - Low Level Skeleton Library for Communication on GNU/Linux platforms
Library in C/C++ to interface with Galileo & other Intel platforms, in a structured and sane API with port nanmes/numbering that match boards & with bindings to javascript & python.
  
Steps for installing MRAA & UPM Library on Intel IoT Platform with IoTDevKit Linux* image
Using a ssh client: 
1. echo "src maa-upm http://iotdk.intel.com/repos/1.1/intelgalactic" > /etc/opkg/intel-iotdk.conf
2. opkg update
3. opkg upgrade

Article: https://software.intel.com/en-us/xdk-sample-creating-a-web-server
*/

// Set this to the ip address of your board (not 127.0.0.1)
//var ipAddress = '10.10.0.162'; 
var ipAddress = '127.0.0.1';
var port = 3000;
var firstLight = 5;
var secondLight = 6;

//var mraa = require('mraa'); //require mraa
var log = require('bog'); // bog logging library
var util = require('util')

//log.info('MRAA Version: ' + mraa.getVersion()); //write the mraa version to the console

///////// init //////////
// use express
var express = require('express');
var app = express();

app.listen(port,ipAddress, function() {
            log.info(util.format('%s: Node server started on %s:%d ...',
                        Date(Date.now() ), ipAddress, port));
});

var service = (function() {
    var that = {};
    
    that.updateLightState = function(id,value) {
        
        
    };
    
    that.getLightState = function(id) {
        return 1;
    };
    
    return that;

})();

///////////// Web functions //////////////////
// blink light on/off 
app.put('/light/:id/:stateValue',function(req,res) {
    var lightId = req.params.id;
    var value = req.params.stateValue;
    log.info(util.format('Flipping light sensor %d to state %d',lightId,value));
    
    service.updateLightState(lightId,value);
    
    res.sendStatus(200);
});
app.get('/light/:id',function(req,res) {
    log.info('params=' + req.params);
    var id = req.params.id;
    log.info(util.format('Getting value for light sensor %d',id));
    
    var value = service.getLightState(id);
    
    log.info(util.format('Light sensor value for sensor %d is %d',id,value));
    //res.status(200);
    res.send({value:value});
});