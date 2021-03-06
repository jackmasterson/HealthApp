
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
        that.$el.html(this.template(this.model.attributes));
        that.$el.attr('class', foodView.mealClass);

        return this;
    },

    deleteIt: function() {
        var that = this;
        var cals = parseInt($('.calorie-number')[0].innerText);
      //  function deleteMath() {
            var deleteCals = that.$el[0].children[0].children[2].children[0].innerText;
            console.log(cals);
            cals = cals - parseInt(deleteCals);
           // console.log(cals);    
     //   };
       // deleteMath();
        console.log(cals);
        $('.calorie-number')[0].innerHTML = cals;

       // console.log(deleteCals, cals);
        this.remove();



    }
});

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
    today: [],
    val: [],

    //calls on the template established in index.html
    template: _.template($('.food-template').html()),

    render: function() {
        this.$el.html(this.template(this.model.attributes));
        return this;
    },

    hover: function() {
        this.$('.meal').slideDown();

    },

    hoverOut: function() {
        this.$('.meal').hide();

    },

    addTo: function(e) {
        e.preventDefault();
        var that = this;


      //  alert('great - thanks! please continue');
        $('.save-div').slideUp();
        $('.search-ul').slideDown();
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

    //    this.$el.append(workoutView.render().html);
    
    },

    calorieAdd: function() {

        this.calorieArray.push(this.clickedCalories);
        this.calorieMath();
    },

    calorieSubtract: function() {

    },

    calorieMath: function() {
    //    console.log(this.calorieArray);
        var len = this.calorieArray.length;
        
        for(var i=0; i<len; i++){
      //      console.log(this.calorieArray[i]);
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
      //          console.log(formData);
       
            }
        });


        $('.eat-record').slideDown();
        
        new savedFoodView(formData);
        new moreInfoView(formData);
        
        this.val.push(formData);
        console.log(this.val);
      //  var key = $('.save-input').val();
      //  console.log(key);
      //  localStorage.setItem(key, JSON.stringify(this.val));
     //   console.log(localStorage.getItem('today'));

        $('.save-button').click(function(){
            var date = new Date();
            var day = date.getDate();
            var month = date.getMonth() + 1;
            var year = date.getFullYear();
            var dateFormatted = month + '/' + day + '/' +
                year;

              console.log(dateFormatted);
            var key = dateFormatted;
            localStorage.setItem(key, JSON.stringify(that.val));
            console.log(localStorage);
        });
    }

});

var additionalView = Backbone.View.extend({
    tagName: 'div',
    className: 'additional-info',
    template: _.template($('.additional-template').html()),

    initialize: function() {
      //  var additionalData = {};
    //    console.log(this);
        $('.additional-fill').append(this.$el.html(this.template(this.model.attributes)));
    //    console.log(this.$el.html(this.template(this.model.attributes)));
        return this;

    }
});

var storedItView = Backbone.View.extend({
    tagName: 'div',
    className: 'stored-info',
    template: _.template($('.saved-temp').html()),

    initialize: function() {
        $('.stored-fill').append(this.$el.html(this.template(this.model.attributes)));
        
        return this;
    }
});

var storedKeyHeaderView = Backbone.View.extend({
    tagName: 'ul',
    className: 'stored-key-ul',
    template: _.template($('.key-header').html()),
    events: {
        "click .keys": "saveThat"
    },

    initialize: function() {
        var that = this;
        $('.save-it').append(this.$el.html(this.template(this.model.attributes)));
  

        $('.keys').click(function(clicked){

            var currentKey = this.innerText;
            var storedInfo = JSON.parse(localStorage.
                getItem(currentKey));
            $('.stored-fill').prepend(currentKey);

            new storedView(storedInfo);
        
        });

        $('.clearStorage').click(function(){
            localStorage.clear();
        });
    },

    saveThat: function(clicked) {
        console.log('save it N0W');
        console.log(this);
        console.log(clicked);
        this.$el.hide();
    }
})

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
     //   this.storeIt();
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
    //    console.log(initialAdditional);

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
});

var storedView = Backbone.View.extend({
    el: '.stored-fill',

    initialize: function(storedInfo){
        this.collection = new storedInfoList(storedInfo);
        this.render();
    },

    render: function() {
        this.collection.each(function(item){
            this.renderStored(item);
        }, this);
    },

    renderStored: function(item){
        var stored = new storedItView({
            model: item
        });
        this.$el.append(stored.render().el);
    }
});

var storedKeyView = Backbone.View.extend({
    el: '.stored-info',

    initialize: function(storedKey){
        this.collection = new storedKeyList(storedKey);
        this.render();
    },

    render: function() {
        this.collection.each(function(item){
            this.renderKey(item);
        }, this);
    },

    renderKey: function(item){
        var storedKey = new storedKeyHeaderView({
            model: item
        });
        this.$el.append(storedKey.render().el);
    }
});








