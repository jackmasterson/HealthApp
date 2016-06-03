var foodItem = Backbone.Model.extend({
    defaults: {
        title: 'no title',
        author: 'unknown',
        keywords: 'none'
    }
});

var savedFoodItem = Backbone.Model.extend({
    defaults: {
        Item: "no food selected yet!"
    }
});