var drink = "rum";

const drinkApi = {
	"async": true,
	"crossDomain": true,
	"url": "https://the-cocktail-db.p.rapidapi.com/filter.php?i=" + drink,
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
		"x-rapidapi-key": "d1da64892bmsh47c5b4a3453cdaap15ba00jsn958f359ad4d3"
	}
};

$.ajax(drinkApi).done(function (response) {
	console.log(response);
});

const mealApi = {
	"async": true,
	"crossDomain": true,
	"url": "https://themealdb.p.rapidapi.com/filter.php?i=chicken",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "themealdb.p.rapidapi.com",
		"x-rapidapi-key": "d1da64892bmsh47c5b4a3453cdaap15ba00jsn958f359ad4d3"
	}
};

$.ajax(mealApi).done(function (response) {
	console.log(response);
});