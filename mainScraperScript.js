var request = require('request');
var cheerio = require('cheerio');
var list = require('./list.js');
var ap = new list.List();

function Apartment(location, link, price){
	this.location = location,
	this.link = link,
	this.price = price
}

function getApartment(callback){
	request('http://sfbay.craigslist.org/search/roo', function(error, response, html){
		if(!error && response.statusCode == 200) {
			var $ = cheerio.load(html);
			$('p.row').each(function(){
				var base = $(this).find('span.l2');
				var city = base.find('small').text().trim() || null;
				var link = base.parent().find('a').attr('href');
				var price = base.find('span.price').text() || null;
				var a = new Apartment(city, link, price);
				ap.append(a);
			});
			callback(ap);
		}
	});
}

getApartment(function(list){console.log(list.toString())});
