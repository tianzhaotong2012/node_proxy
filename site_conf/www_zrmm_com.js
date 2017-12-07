var cheerio = require('cheerio');

var handle = function(body) {
  const $ = cheerio.load(body);
  $("a").each(function(i, e) {
		var href = $(e).attr("href");
		if(typeof(href)!="undefined" && $(e).attr("href").indexOf("http")<0){
				var afterHref = "http://www.zrmm.com" + $(e).attr("href");
				$(e).attr("href",afterHref).html();	
		}
   });
   //$(".conpage").children().first().html("<p></p>");
   return $.html();
};

module.exports.handle = handle;
