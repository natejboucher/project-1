var mealSearch = $('#inputMeal');
var drinkSearch = $('#inputDrink');
var meals = [];
var drinks = [];

// load meal id from searched ingredient
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
// load saved meals from buttons
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
        var mealName = response.meals[0].strMeal;
        var mealPic = response.meals[0].strMealThumb;
        var mealLink = response.meals[0].strYoutube;
        mealRecipeEl(mealName, mealLink);
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
        $('#mealRecipeName').empty();
        $('#mealInstructions').empty();
        var mealName = response.meals[0].strMeal;
        var mealLink = response.meals[0].strYoutube;
        meals.push(mealName);
        saveMeals();
        createMealButtons();
        mealRecipeEl(mealName, mealLink);
    });
};
// function to display recipe info on page
function mealRecipeEl(name, link) {
    var linkSliced = link.slice("32");
    var mealEmbed = 'https://www.youtube.com/embed/' + linkSliced;
    var mealVid = $('<iframe width="560" height="315" src="'+mealEmbed+'" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
    $('#mealRecipeName').text(name);
    $('#mealInstructions').append(mealVid);
    console.log(mealVid);
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
// pull searched meals from local storage
function loadMeals() {
    meals = JSON.parse(localStorage.getItem("meals"));
    if (!meals) {
        meals = [];
    } else {
        createMealButtons();
    }
};
// save searched meals to local storage
function saveMeals() {
    localStorage.setItem("meals", JSON.stringify(meals));
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

// load drink id from searched ingredient
function loadDrinkId(input) {
    var drinkID = "";
    var inputIngred = input;
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://the-cocktail-db.p.rapidapi.com/filter.php?i=" + inputIngred,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
            "x-rapidapi-key": "d1da64892bmsh47c5b4a3453cdaap15ba00jsn958f359ad4d3"
        }
    };

    $.ajax(settings).done(function (response) {
        var randomDrinkNum = Math.floor((Math.random() * response.drinks.length));
        drinkId = response.drinks[randomDrinkNum].idDrink;
        console.log(drinkId);
        loadDrinkRecipe(drinkId);
    });
};
// load drink recipe
function loadDrinkRecipe(id) {
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://the-cocktail-db.p.rapidapi.com/lookup.php?i=" + id,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
            "x-rapidapi-key": "d1da64892bmsh47c5b4a3453cdaap15ba00jsn958f359ad4d3"
        }
    };

    $.ajax(settings).done(function (response) {
        $('#drinkRecipeName').empty();
        $('#drinkInstructions').empty();
        $('#drinkPic').empty();
        var mealName = response.drinks[0].strDrink;
        var mealPic = response.drinks[0].strDrinkThumb;
        var mealInstructions = response.drinks[0].strInstructions;
        drinkRecipeEl(mealName, mealPic, mealInstructions);
    });
};
// display information on drink el
function drinkRecipeEl(name, thumb, inst) {
    $('#drinkRecipeName').text(name);
    var drinkPicture = $('<img>').addClass('img').attr('src', thumb);
    var drinkVid = inst;
    $('#drinkPic').append(drinkPicture);
    $('#drinkInstructions').append(drinkVid);
}
// save searched drinks to local storage
function saveDrinks() {
    localStorage.setItem("drinks", JSON.stringify(drinks));
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
        loadDrinkId(drinkInput);
        drinks.push(drinkInput);
        createDrinkButtons();
        saveDrinks();
    } else {
        console.log("Temporary Error");
    }
});
// listener for delete meals button
$('#deleteMeal').on("click", function (event) {
    event.preventDefault();
    $('#logMeal').empty();
    $('#mealRecipeName').empty();
    $('#mealInstructions').empty();
    $('#mealPic').empty();
    meals = [];
    localStorage.setItem('meals', JSON.stringify(meals));
})
// listener for delete drinks button
$('#deleteDrink').on("click", function (event) {
    event.preventDefault();
    $('#logDrink').empty();
    $('#mealRecipeName').empty();
    $('#mealInstructions').empty();
    $('#mealPic').empty();
    drinks = [];
    localStorage.setItem('drinks', JSON.stringify(drinks));
})

// listener for saved meals buttons
$('#logMeal').on('click', 'button', function (event) {
    var savedName = $(this).text().trim();
    loadSavedMeal(savedName);
});
// listener for saved drinks buttons
$('#logDrink').on('click', 'button', function (event) {
    var savedName = $(this).text().trim();
    loadDrinkId(savedName);
});
loadMeals();
loadDrinks();