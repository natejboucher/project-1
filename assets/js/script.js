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
// function to load meal ID
function loadMealId(input) {
    var mealID = "";
    var inputIngred = input;
    const mealApi = {
        "async": true,
        "crossDomain": true,
        "url": "https://themealdb.p.rapidapi.com/filter.php?i=" + inputIngred,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "themealdb.p.rapidapi.com",
            "x-rapidapi-key": "d1da64892bmsh47c5b4a3453cdaap15ba00jsn958f359ad4d3"
        }
    };
    $.ajax(mealApi).done(function (response) {
        var randomMealNum = Math.floor((Math.random() * response.meals.length));
        mealId = response.meals[randomMealNum].idMeal;
        loadMealRecipe(mealId);
    });
};
function loadSavedMeal(name) {
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://themealdb.p.rapidapi.com/search.php?s=" + name,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "themealdb.p.rapidapi.com",
            "x-rapidapi-key": "d1da64892bmsh47c5b4a3453cdaap15ba00jsn958f359ad4d3"
        }
    };

    $.ajax(settings).done(function (response) {
        $('#mealRecipeName').empty();
        $('#mealInstructions').empty();
        $('#mealPic').empty();
        console.log(response);
        var mealName = response.meals[0].strMeal;
        var mealPic = response.meals[0].strMealThumb;
        var mealInstructions = response.meals[0].strInstructions
        mealRecipeEl(mealName, mealPic, mealInstructions);
    });
};

// function to load meal recipe
function loadMealRecipe(mealId) {
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://themealdb.p.rapidapi.com/lookup.php?i=" + mealId,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "themealdb.p.rapidapi.com",
            "x-rapidapi-key": "d1da64892bmsh47c5b4a3453cdaap15ba00jsn958f359ad4d3"
        }
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        var mealName = response.meals[0].strMeal;
        var mealPic = response.meals[0].strMealThumb;
        var mealInstructions = response.meals[0].strInstructions
        meals.push(mealName);
        saveMeals();
        createMealButtons();
        mealRecipeEl(mealName, mealPic, mealInstructions);
    });
};
// function to display recipe info on page
function mealRecipeEl(name, thumb, instructions) {
    $('#mealRecipeName').text(name);
    $('#mealInstructions').text(instructions)
    var mealPicture = $('<img>').addClass('img').attr('src', thumb);
    $('#mealPic').append(mealPicture);
}

//  function to create meal buttons
function createMealButtons(mealName) {
    $('#inputMeal').val("");
    $('#logMeal').empty();
    for (var i = 0; i < meals.length; i++) {
        var savedMealBtn = $("<button>")
            .addClass('button is-primary is-outlined control m-1 wrap-button-text')
            .text(meals[i])
            .attr('id', 'savedMeal')
        $("#logMeal").append(savedMealBtn);
    }
};
// function to create drink buttons
function createDrinkButtons() {
    $('#inputDrink').val("");
    $('#logDrink').empty();
    for (var i = 0; i < drinks.length; i++) {
        var savedDrinks = $("<button>")
            .addClass('button is-primary is-outlined control m-1 wrap-button-text')
            .text(drinks[i])
            .attr('id', 'savedDrink');
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
$('#mealForm').on('submit', function (event) {
    event.preventDefault();
    if (mealSearch.val()) {
        var mealInput = mealSearch.val();
        loadMealId(mealInput);
    } else {
        console.log("Temporary Error");
    }
});
// collect inputted drink search
$('#drinkForm').on('submit', function (event) {
    event.preventDefault();
    if (drinkSearch.val()) {
        var drinkInput = drinkSearch.val();
        drinks.push(drinkInput);
        saveDrinks();
        createDrinkButtons();
        //loadDrinkId(mealInput);
        console.log(drinks);
    } else {
        console.log("Temporary Error");
    }
});
// listener for delete meals button
$('#deleteMeal').on("click", function (event) {
    event.preventDefault();
    $('#logMeal').empty();
    meals = [];
    localStorage.setItem('meals', JSON.stringify(meals));
})
// listener for delete drinks button
$('#deleteDrink').on("click", function (event) {
    event.preventDefault();
    $('#logDrink').empty();
    drinks = [];
    localStorage.setItem('drinks', JSON.stringify(drinks));
})

// listener for saved meals buttons
$('#logMeal').on('click', 'button', function (event) {
    var savedName = $(this).text().trim();
    console.log(savedName);
    loadSavedMeal(savedName);
});
loadMeals();
loadDrinks();

