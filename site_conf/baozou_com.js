var cheerio = require('cheerio');

var handle = function(body) {
  const $ = cheerio.load(body);
  $("a").each(function(i, e) {
		var href = $(e).attr("href");
		if(typeof(href)!="undefined" && $(e).attr("href").indexOf("http")<0){
				var afterHref = "http://baozou.com" + $(e).attr("href");
				$(e).attr("href",afterHref).html();	
		}
   });
   return $.html();
};

module.exports.handle = handle;
