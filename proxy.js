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
				newBody = unescape(newBody.replace(/&#x/g,'%u').replace(/;/g,''));
       				res.send(newBody); 
				return;
			}
			if(host == "ent.sina.cn"){
				var ent_sina = require("./site_conf/ent_sina_cn.js");
				newBody = ent_sina.handle(url);
				res.send(newBody);
				return;	
			}
			if(host == "sports.sina.cn"){
				var mil_sina = require("./site_conf/mil_sina_cn.js");
				newBody = mil_sina.handle(url);
				res.send(newBody);
				return;	
			}
			if(host == "mil.sina.cn"){
				var sports_sina = require("./site_conf/sports_sina_cn.js");
				newBody = sports_sina.handle(url);
				res.send(newBody);
				return;	
			}
			if(host == "baozou.com"){
				var baozou = require("./site_conf/baozou_com.js");
				newBody = baozou.handle(url);
				res.send(newBody);
				return;	
			}
			if(host == "www.zhisland.com"){
				var zhisland = require("./site_conf/www_zhisland_com.js");
				newBody = zhisland.handle(body);
				newBody = unescape(newBody.replace(/&#x/g,'%u').replace(/;/g,''));
				res.send(newBody);
				return;
			}
			req.on('error', function (err) {
 				console.error('error ', err);
				req.end();
			}).pipe(request(url)).on('error', function (err) {
 				console.error('error ', err);
				req.end();
			}).pipe(res).on('error', function (err) {
 				console.error('error ', err);
				req.end();
			});	
		}else{
			req.on('error', function (err) {
 				console.error('error ', err);
				req.end();
			}).pipe(request(url)).on('error', function (err) {
 				console.error('error ', err);
				req.end();
			}).pipe(res).on('error', function (err) {
 				console.error('error ', err);
				req.end();
			});
		}
	  }
    });
});
app.listen(process.env.PORT || 9003);
