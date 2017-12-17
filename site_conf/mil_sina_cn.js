var shell = require("shelljs");

var handle = function(url) {
  var execStr = './phantomjs/bin/phantomjs ./phantomjs/js/get_html.js ' + url + ' t.png' + ' 1080*1920';
  var ret = shell.exec(execStr);
  if(ret.code !== 0){
	console.log(execStr);
	return 'exec run';
   }
  var data = ret.stdout; 
  return data
};

module.exports.handle = handle;
