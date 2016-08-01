
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
     //   this.countIt();
        return this;
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
        console.log(this);
        var that = this;
        var target = $(e.currentTarget);
        var str = target[0].className;
        console.log(that.$('.temp-item'));
        
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
    //    this.$el.append(workoutView.render().html);
    
    },

    calorieAdd: function() {

        this.calorieArray.push(this.clickedCalories);
        this.calorieMath();
    },

    calorieSubtract: function() {

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
     //   console.log(that);
        var formData = {
            classes: foodView.mealClass
        };

        var additionalData = {};
        

        $('.calorie-counter').show();

        this.$('.food-temp li span').each(function(i, er) {
        //    console.log(i);
          //  console.log(er);
            //sets the formData (which already contains the meal ID)
            //to the info below
            for (var r = 0; r < 9; r++) {
                //tempItem is the actual food item in the template;
                //tempHead is the header for the food item (Food, Brand, etc);
                var tempItemInf = that.$('.temp-item')[r].innerText;
                var tempHeadInf = that.$('.temp-head')[r].innerText;
                formData[tempHeadInf] = tempItemInf;
       //         console.log(formData);
                console.log(formData);
       
            }
        });


        $('.eat-record').slideDown();
      //  console.log(formData);
        
        new savedFoodView(formData);
        new moreInfoView(formData);

    }

});

var additionalView = Backbone.View.extend({
    tagName: 'div',
    className: 'additional-info',
    template: _.template($('.additional-template').html()),

    initialize: function() {
      //  var additionalData = {};
        console.log(this);
        $('.additional-fill').append(this.$el.html(this.template(this.model.attributes)));
        console.log(this.$el.html(this.template(this.model.attributes)));
        return this;

    }
});

var moreInfoView = Backbone.View.extend({
    el: '.additional-fill',

    initialize: function(moreInfo){
        this.collection = new additionalList(moreInfo);
        this.render();
    },

    render: function() {
        this.collection.each(function(items){
            this.renderMore(items);
        }, this);
    },

    renderMore: function(items) {
        var moreView = new additionalView({
            model: items
        });
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

var additionalInfoView = Backbone.View.extend({
    el: '.additional-fill',

    initialize: function(initialAdditional){
        this.$el.empty();
        this.collection = new additionalList(initialAdditional);
        this.render();
        console.log(initialAdditional);

    },

    render: function() {
        this.collection.each(function(item){
            this.renderAdditional(item);
        }, this);
    },
    renderAdditional: function(item){
        var additional = new additionalView({
            model: item
        });
        this.$el.append(additional.render().el);
    }
})