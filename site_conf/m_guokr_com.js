var shell = require("shelljs");
var cheerio = require('cheerio');

var handle = function(url) {
  if(url == "http://m.guokr.com/scientific/"){
	var execStr = "curl https://m.guokr.com/apis/minisite/article.json?retrieve_type=by_subject_v2&channel_key=&subject_key=all&limit=20&offset=0";
      var ret = shell.exec(execStr);
	if(ret.code !== 0){
		console.log(execStr);
		return 'exec run';
      }else{
		var str = "";
	  	var obj = eval('(' + ret.stdout + ')');
	  	for(var item in obj.result) {
			str += "<a href='";
			str += obj.result[item].url;
			str += "'>";
			str += item;
			str += "</a><br>";
	   	}
		return str;
	}
  }
  var execStr = "./phantomjs/bin/phantomjs ./phantomjs/js/get_html.js '" + url + "' t.png" + " 1080*1920";
  var ret = shell.exec(execStr);
  if(ret.code !== 0){
	console.log(execStr);
	return 'exec run';
   }
  var data = ret.stdout; 
  return data;
};

module.exports.handle = handle;
