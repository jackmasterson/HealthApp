
//declares the global variable for the calories array;
//info will be pushed here from the calorie tracker down below
var calsArr = [];

//sets up the table for the tracked meals
var savedMealView = Backbone.View.extend({
    tagName: 'div',
    template: _.template($('.saved-temp').html()),
    events: {
        "click a.delete": "deleteIt"
    },

    render: function() {

        var that = this;

        //calls on the template established in index.html
        that.$el.html(this.template(this.model.attributes));
        that.$el.attr('class', foodView.mealClass);

        //runs the function for what happens when the 'delete' button
        //is clicked
        this.countIt();
        return this;
    },

    //function for setting the calorie count after an item
    //is deleted
    deleteIt: function() {
      //  console.log($('.calorie-number')[0].innerHTML);

        this.$el.remove();
/*
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

        });*/
    },

    countIt: function() {

    /*    var sum;

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
        calSpan.innerText = sum;*/

    }
});

//view established for the searched food
//also adds click function events when an 'add' or [meal] button
//is pressed
var foodView = Backbone.View.extend({
    tagName: 'div',
    className: 'food-div',
    events: {
        "mouseenter": "hover",
        "mouseleave": "hoverOut",
        "click button.info": "addTo"
    },
    calorieArray: [],
    totalCalories: 0,

    //calls on the template established in index.html
    template: _.template($('.food-template').html()),

    render: function() {

        this.$el.html(this.template(this.model.attributes));
        return this;
    },

    hover: function() {
        this.$('.meal').slideDown();

    },

    legDay: function() {
        console.log('today\s a leg day!');
        

    },

    armDay: function() {
        console.log('today\s an arm day!');
    },

    hoverOut: function() {
        this.$('.meal').hide();
    },

    addTo: function(e) {
        e.preventDefault();
        var that = this;
        var target = $(e.currentTarget);
        var str = target[0].className;
        
        function assignMealId(meal) {
            that.$('.temp-item').addClass(meal);


            that.getInfo();
        };
 
        assignMealId(str);
        
        this.clickedCalories = this.$('.temp-item.calories')[0]
            .innerHTML;
        
        
        $('.delete').click(function(){
            that.calorieSubtract();
        });
        $('.food-div').hide();
        this.calorieAdd();
        this.$el.append(workoutView.render().html);
    
    },

    calorieAdd: function() {

        this.calorieArray.push(this.clickedCalories);
        this.calorieMath();
    },

    calorieSubtract: function() {
        console.log('subtract!');
    //    console.log(this.calorieArray);
        console.log(this.$('.cals.saved-li'));
        console.log(this.clickedCalories);
    //    this.calorieArray.remove(this.clickedCalories);
       // this.calorieMath();
    },

    calorieMath: function() {
        console.log(this.calorieArray);
        var len = this.calorieArray.length;
        
        for(var i=0; i<len; i++){
            console.log(this.calorieArray[i]);
            this.totalCalories += parseInt(this.calorieArray[i]);
            
        }

        $('.calorie-number')[0].innerHTML = this.totalCalories;

    },

    getInfo: function() {
        var that = this;
        var classy = this.$('.temp-item').attr('class');
        var classed = classy.split(' ');
        foodView.mealClass = classed[1];

        var formData = {
            classes: foodView.mealClass
        };
        $('.calorie-counter').show();
        this.$('.food-temp li span').each(function(i, er) {

            //sets the formData (which already contains the meal ID)
            //to the info below
            for (var r = 0; r < 3; r++) {
                //tempItem is the actual food item in the template;
                //tempHead is the header for the food item (Food, Brand, etc);
                var tempItemInf = that.$('.temp-item')[r].innerText;
                var tempHeadInf = that.$('.temp-head')[r].innerText;
                formData[tempHeadInf] = tempItemInf;
        //        console.log(formData);

            }

        });

        $('.eat-record').slideDown();
        
        new savedFoodView(formData);

    }

});

var workoutView = Backbone.View.extend({
    tagName: 'div',
    className: 'daily-workout',
    template: _.template($('.workout-template').html()),

    render: function() {
        console.log('ahhiaii');
        var today = new Date();
        var day = today.getDay();

        console.log(day);
        if(day % 2 == 0) {
            this.legDay();
        }
        else {
            this.armDay();
        }
        console.log(this.$el);
        this.$el.html(this.template(this.model.attributes));
        return this;

    }
})

//establishes the food view for the 'Items I've eaten today' div,
//the savedFood div
var savedFoodView = Backbone.View.extend({

    el: '.meals-eaten-table',

    initialize: function(eatenMeals) {
       // console.log(eatenMeals);
        this.collection = new savedFoodList(eatenMeals);
     //   console.log(this.collection);
    //    this.class = eatenMeals.classes;
     //   console.log(this.collection);
       // console.log(eatenMeals);
        this.render();
    },

    render: function() {

        this.collection.each(function(items) {
        //    console.log(items.attributes);
            this.renderSaved(items);
        }, this);
    },

    renderSaved: function(items) {
        var that = this;
     //   console.log(items.attributes.classes);
        var savedView = new savedMealView({
            model: items
        });
        var classed = '.'+items.attributes.classes + '-save';
        $(classed).show();
        $('.eat-list-div').show();
        $(classed).append(savedView.render().el);
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