var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app = express();
app.use(function(req, res) {
    var url = req.url;
    request(url, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
		var headers = response.headers;
		var type = headers['content-type'];
		if(typeof(type)!="undefined" && type.indexOf("text/html")>=0){			
			var host = 	req.headers['host'];
			if(host == "www.zrmm.com"){
				var zrmm = require("./site_conf/www_zrmm_com.js");
				newBody = zrmm.handle(body);
				res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
				res.end(newBody);
				return;
			}
			if(host == "www.zhisland.com"){
				var zhisland = require("./site_conf/www_zhisland_com.js");
				newBody = zhisland.handle(body);
				res.send(newBody);
				return;
			}
			req.pipe(request(url)).pipe(res);	
		}else{
			req.pipe(request(url)).pipe(res);
		}
	  }
    });
});
app.listen(process.env.PORT || 9003);
