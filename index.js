var express = require('express');
var path = require('path');
var app = express();

app.set('port', (process.env.PORT || 5000));



app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/:data', function(request, response) {	
	var jso = {
		"unix" : "",
		"natural" : ""
	};
	var month =  {0:'January', 1:'February', 2:'March', 3:'April', 4:'May', 5:'June', 			6:'July', 7:'August', 8:'September', 9:'October', 10:'November', 11:'December'}
	var date;
	if(isNaN(parseInt(request.params.data))){
		date = new Date(request.params.data);
	}else{
		date = new Date(parseInt(request.params.data));
	}
  	if ( Object.prototype.toString.call(date) === "[object Date]" ) {
		if ( isNaN( date.valueOf() ) ) {  // d.valueOf() could also work
    			jso = {
			"unix" : "null",
			"natural" : "null"
			};
			response.json(jso);
  		}
  		
		else {
			jso.unix = date.getTime();
			jso.natural = month[date.getMonth()] + " " + date.getDate() 
				+ ", " + date.getFullYear();
			response.json(jso);
	    	}
	}
	else{
		jso = {
			"unix" : "null",
			"natural" : "null"
			};
			response.json(jso);
	}	
			   
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
