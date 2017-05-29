const express = require('express');
const bodyParser = require('body-parser');

var https = require('https');
const restService = express();
var subscriberCount="";

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());




restService.post('/echo', function(req, res) {
    var speech = req.body.result && req.body.result.parameters && req.body.result.parameters.echoText ? req.body.result.parameters.echoText : "Seems like some problem. Speak again."
    console.log(req.body);
     var endpoint = "https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=NISTzgt0sTmuTa0LWjF-OQ,UCNISTzgt0sTmuTa0LWjF-OQ&key=AIzaSyAY5ItJuC8JUWlPPoUaeYvNyDAZRf1Jl44" // ENDPOINT GOES HERE
            var body = ""
            https.get(endpoint, (response) => {
              response.on('data', (chunk) => { body += chunk })
              response.on('end', () => {
                var data = JSON.parse(body)
                 subscriberCount = data.items[0].statistics.subscriberCount
                
              })
            })
   
    
    
    return res.json({
        speech: "hii ".concat(subscriberCount),
        displayText: "hii ".concat(subscriberCount),
        source: 'webhook-echo-sample'
    });
});

restService.post('/slack-test', function(req, res) {

    var slack_message = {
        "text": "Details of JIRA board for Browse and Commerce",
        "attachments": [{
            "title": "JIRA Board",
            "title_link": "http://www.google.com",
            "color": "#36a64f",

            "fields": [{
                "title": "Epic Count",
                "value": "50",
                "short": "false"
            }, {
                "title": "Story Count",
                "value": "40",
                "short": "false"
            }],

            "thumb_url": "https://stiltsoft.com/blog/wp-content/uploads/2016/01/5.jira_.png"
        }, {
            "title": "Story status count",
            "title_link": "http://www.google.com",
            "color": "#f49e42",

            "fields": [{
                "title": "Not started",
                "value": "50",
                "short": "false"
            }, {
                "title": "Development",
                "value": "40",
                "short": "false"
            }, {
                "title": "Development",
                "value": "40",
                "short": "false"
            }, {
                "title": "Development",
                "value": "40",
                "short": "false"
            }]
        }]
    }
    return res.json({
        speech: "speech",
        displayText: "speech",
        source: 'webhook-echo-sample',
        data: {
            "slack": slack_message
        }
        
    });
});




restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening")
    
});
