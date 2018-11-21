var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app = express();
app.use(function(req, res) {
    var url = req.url;
    console.log('ACCESS LOG :' + Date() + " URL :" + url);
    var host =      req.headers['host'];
    if(host == "www.66ip.cn"){
                                var www_66ip = require("./site_conf/www_66ip_cn.js");
                                newBody = www_66ip.handle(url);
                                console.log(newBody);
                                res.send(newBody);
                                return;
    }
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
				var sports_sina = require("./site_conf/sports_sina_cn.js");
				newBody = sports_sina.handle(url);
				res.send(newBody);
				return;	
			}
			if(host == "mil.sina.cn"){
				var mil_sina = require("./site_conf/mil_sina_cn.js");
				newBody = mil_sina.handle(url);
				res.send(newBody);
				return;	
			}
			if(host == "baozou.com"){
				var baozou = require("./site_conf/baozou_com.js");
				newBody = baozou.handle(url);
				res.send(newBody);
				return;	
			}
			if(host == "m.guokr.com"){
				var guokr = require("./site_conf/m_guokr_com.js");
				newBody = guokr.handle(url);
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
				res.send('error pipe');
				return;
			}).pipe(request(url)).on('error', function (err) {
 				console.error('error ', err);
				res.send('error pipe');
				return;
			}).pipe(res).on('error', function (err) {
 				console.error('error ', err);
				res.send('error pipe');
				return;
			});	
		}else{
			req.on('error', function (err) {
 				console.error('error ', err);
				res.send('error pipe');
				return;
			}).pipe(request(url)).on('error', function (err) {
 				console.error('error ', err);
				res.send('error pipe');
				return;
			}).pipe(res).on('error', function (err) {
 				console.error('error ', err);
				res.send('error pipe');
				return;
			});
		}
	  }
    });
});
app.listen(process.env.PORT || 9003);
