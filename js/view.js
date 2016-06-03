
//declares the global variable for the calories array;
//info will be pushed here from the calorie tracker down below
var calsArr = [];

//sets up the table for the tracked meals
var savedMealView = Backbone.View.extend({
    tagName: 'tr',
    className: 'saved-div',
    template: _.template($('.saved-temp').html()),
    events: {
        "click a.delete": "deleteIt"
    },

    render: function() {

        var that = this;

        //calls on the template established in index.html
        that.$el.html(this.template(this.model.attributes));

        //runs the function for what happens when the 'delete' button
        //is clicked
        this.countIt();
        return this;
    },

    //function for setting the calorie count after an item
    //is deleted
    deleteIt: function() {

        this.$el.remove();

        var calSpan = document.getElementsByClassName('cal-count-span')[0];

        this.$('.cals.saved-li').each(function(i, el) {

            var parse = parseInt(el.innerText);
            var index = calsArr.indexOf(parse);

            //removes the item that matches the index variable
            calsArr.splice(index, 1);
            var sum = calsArr.reduce(add, 0);

            //adds the remaining values in the array
            function add(a, b) {
                return a + b;
            }

            //sets the array's inner text to the answer from the
            //'add' function above
            calSpan.innerText = sum;

        });
    },

    countIt: function() {

        var sum;

        this.$('.cals').each(function(i, el) {

            var parsed = parseInt(el.innerText);
            calsArr.push(parsed);
            sum = calsArr.reduce(add, 0);

            //adds the values in the array 
            function add(a, b) {
                return a + b;
            }
        });

        var calSpan = document.getElementsByClassName('cal-count-span')[0];
        
        //makes the calorie counter inner text that of the sum of this
        //function
        calSpan.innerText = sum;

    }
});

//view established for the searched food
//also adds click function events when an 'add' or [meal] button
//is pressed
var foodView = Backbone.View.extend({
    tagName: 'div',
    className: 'food-div',
    events: {
        "click button.add": "addTo",
        "click button.bfast": "bfastID",
        "click button.lunch": "lunchID",
        "click button.dinner": "dinnerID"
    },

    //calls on the template established in index.html
    template: _.template($('.food-template').html()),

    render: function() {
        this.$el.html(this.template(this.model.attributes));

        return this;
    },

    addTo: function(e) {
        e.preventDefault();

        this.$('.meal').slideDown();

    },

    getInfo: function() {
        var that = this;
        var classy = that.$('.temp-item').attr('id');

        var formData = {
            id: classy
        };

        this.$('.food-temp li span').each(function(i, er) {

            //sets the formData (which already contains the meal ID)
            //to the info below
            for (var r = 0; r < 3; r++) {

                //tempItem is the actual food item in the template;
                //tempHead is the header for the food item (Food, Brand, etc);
                var tempItemInf = that.$('.temp-item')[r].innerText;
                var tempHeadInf = that.$('.temp-head')[r].innerText;
                formData[tempHeadInf] = tempItemInf;

            }

        });

        $('.eat-record').slideDown();

        new savedFoodView(formData);

    },

    //the following three functions set the ID for the object
    //based on which button was pressed;
    //breakfast gets the Breakfast ID, lunch the Lunch, etc.;
    //this is used later in the savedFoodItem div to label which meal
    //each food was for
    bfastID: function() {
        var that = this;

        that.$('.temp-item').attr('id', 'Breakfast');
        this.getInfo();
    },

    lunchID: function() {
        var that = this;
        that.$('.temp-item').attr('id', 'Lunch');
        this.getInfo();
    },

    dinnerID: function() {
        var that = this;
        that.$('.temp-item').attr('id', 'Dinner');
        this.getInfo();
    }

});

//establishes the food view for the 'Items I've eaten today' div,
//the savedFood div
var savedFoodView = Backbone.View.extend({

    el: '.meals-eaten-table',

    initialize: function(eatenMeals) {
        this.collection = new savedFoodList(eatenMeals);
        this.render();
    },

    render: function() {

        this.collection.each(function(items) {

            this.renderSaved(items);
        }, this);
    },

    renderSaved: function(items) {
        var savedView = new savedMealView({
            model: items
        });

        $('.meals-eaten-table').prepend(savedView.render().el);
    }
});

//actuallly appends the foodView to the '.search-fill' div
var foodListView = Backbone.View.extend({
    el: '.search-fill',

    initialize: function(initialFoods) {
        this.$el.empty();
        this.collection = new foodList(initialFoods);
        this.render();
    },

    render: function() {

        this.collection.each(function(item) {
            this.renderFood(item);
        }, this);
    },

    renderFood: function(item) {

        var eatView = new foodView({
            model: item
        });

        this.$el.append(eatView.render().el);

    }
});