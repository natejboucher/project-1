var mealSearch = $('#inputMeal');
var drinkSearch = $('#inputDrink');
var meals = [];
var drinks = [];


// const drinkApi = {
// 	"async": true,
// 	"crossDomain": true,
// 	"url": "https://the-cocktail-db.p.rapidapi.com/filter.php?i=" + drink,
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
// 		"x-rapidapi-key": "d1da64892bmsh47c5b4a3453cdaap15ba00jsn958f359ad4d3"
// 	}
// };

// $.ajax(drinkApi).done(function (response) {
// 	console.log(response);
// });

// const mealApi = {
// 	"async": true,
// 	"crossDomain": true,
// 	"url": "https://themealdb.p.rapidapi.com/filter.php?i=chicken",
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "themealdb.p.rapidapi.com",
// 		"x-rapidapi-key": "d1da64892bmsh47c5b4a3453cdaap15ba00jsn958f359ad4d3"
// 	}
// };

// $.ajax(mealApi).done(function (response) {
// 	console.log(response);
// });

//  function to create meal buttons
function createMealButtons() {
    $('#inputMeal').val("");
    $('#logMeal').empty();
    for (var i = 0; i < meals.length; i++) {
        var savedMeal = $("<button>")
            .addClass('button is-primary is-outlined control m-1')
            .text(meals[i])
            .attr('id', 'savedMeal');
        $("#logMeal").append(savedMeal);
    }
};

// function to create drink buttons
function createDrinkButtons() {
    $('#inputDrink').val("");
    $('#logDrink').empty();
    for (var i = 0; i < drinks.length; i++) {
        var savedDrinks = $("<button>")
            .addClass('button is-primary is-outlined control m-1')
            .text(drinks[i])
            .attr('id', 'savedMeal');
        $("#logDrink").append(savedDrinks);
    }
};
// save searched meals to local storage
function saveMeals() {
    localStorage.setItem("meals", JSON.stringify(meals));
};
// save searched drinks to local storage
function saveDrinks() {
    localStorage.setItem("drinks", JSON.stringify(drinks));
};
// pull searched meals from local storage
function loadMeals() {
    meals = JSON.parse(localStorage.getItem("meals"));
    if (!meals) {
        meals = [];
    } else {
        createMealButtons();
    }
};
// pull searched drinks from local storage
function loadDrinks() {
    drinks = JSON.parse(localStorage.getItem("drinks"));
    if (!drinks) {
        drinks = [];
    } else {
        createDrinkButtons();
    }
};



// collect inputted meal search
$('#mealForm').on('submit', function(event)  {
    event.preventDefault();
    if (mealSearch.val())  {
        var mealInput = mealSearch.val();
        meals.push(mealInput);
        saveMeals();
        createMealButtons();
        //loadMealId(mealInput);
        console.log(meals);
    }  else  {
        console.log("Temporary Error");
    }
});

// collect inputted drink search
$('#drinkForm').on('submit', function(event)  {
    event.preventDefault();
    if (drinkSearch.val())  {
        var drinkInput = drinkSearch.val();
        drinks.push(drinkInput);
        saveDrinks();
        createDrinkButtons();
        //loadMealId(mealInput);
        console.log(drinks);
    }  else  {
        console.log("Temporary Error");
    }
});
// listener for delete meals button
$('#deleteMeal').on("click", function(event)  {
    event.preventDefault();
    $('#logMeal').empty();
    meals = [];
    localStorage.setItem('meals', JSON.stringify(meals));
})
// listener for delete drinks button
$('#deleteDrink').on("click", function(event)  {
    event.preventDefault();
    $('#logDrink').empty();
    drinks = [];
    localStorage.setItem('drinks', JSON.stringify(drinks));
})

loadMeals();
loadDrinks();

