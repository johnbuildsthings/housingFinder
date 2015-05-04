var request = require('request');
var cheerio = require('cheerio');
var list = require('./list.js');
var ap = new list.List();

function Apartment(location, linkText, link, price){
	this.location = location,
	this.linkText = linkText,
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
				var link = "http://sfbay.craigslist.org" + (base.parent().find('a.hdrlnk').attr('href'));
				var linkText = base.parent().find('a.hdrlnk').text();
				var price = base.find('span.price').text() || null;
				var a = new Apartment(city, linkText, link, price);
				ap.append(a);
			});
			callback(ap);
		}
	});
}

function filter(list){
	console.log(list.length());
	var locations = ['vallejo', 'western addition', 'burlingame', 'mission district'];
	for(var i = 0; i<list.length(); i++){
		console.log(list.length());
		list.moveTo(i);
		var element = list.getElement();
		var loc = element['location'];
		var count = 0;
		for(var l=0; l<locations.length; l++){
			if(loc.match(/locations[l]/gi)){
				//console.log(loc.match(/locations/gi));
				count++;
			}
		}
		//console.log('count '+i);
		//console.log(element);
		if (count == 0){
			list.remove(element);
		}else{
			count = 0;
			console.log(element);
		}
	}
	//console.log(list.toString());
	console.log(list.length());
	return list.length();
}


//getApartment(filter(list));


getApartment(function(list){
	list.front();
	console.log(list.length());
	filter(list);
	//console.log(list.getElement());
	//console.log('current pos: '+list.currPos());
});
