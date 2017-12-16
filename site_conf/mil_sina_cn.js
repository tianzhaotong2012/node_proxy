require('shelljs/global');

var handle = function(url) {
  var execStr = './phantomjs/bin/phantomjs ./phantomjs/js/get_html.js ' + url + ' t.png' + ' 1080*1920';
  var data = exec(execStr,{silent:true}).stdout;
  return data
};

module.exports.handle = handle;
