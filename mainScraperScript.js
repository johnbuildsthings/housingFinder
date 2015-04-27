var request = require('request');
var cheerio = require('cheerio');
var cities = [];

request('http://sfbay.craigslist.org/search/roo', function(error, response, html){
	if(!error && response.statusCode == 200) {
		var $ = cheerio.load(html);
		$('p.row').each(function(i, element){
			var city = $('p.row').find('span.pnr').find('small').text();
			cities.push(city);	
		});
	}
	console.log(cities);
});