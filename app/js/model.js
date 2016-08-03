//sets up the model for the food items that will appear in the
//bar to the right upon searching
var foodItem = Backbone.Model.extend({
    defaults: {
        title: 'no title',
        author: 'unknown',
        keywords: 'none'
    }
});

//model for the foods the user clicks to add to the 
//"what I've eaten today" section
var savedFoodItem = Backbone.Model.extend({
    defaults: {
        Item: "no food selected yet!"
    }
});

var additionalItem = Backbone.Model.extend({
	defaults: {
		item: "nothing selected yet!"
	}
});

var storedItem = Backbone.Model.extend({
    defaults: {
        item: "nothing stored locally!"
    }
});