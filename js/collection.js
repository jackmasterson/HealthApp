//collections for the food items and list of foods eaten that day
var foodList = Backbone.Collection.extend({
    model: foodItem
});

var savedFoodList = Backbone.Collection.extend({
    model: savedFoodItem
});