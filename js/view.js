
var calsArr = [];

var savedMealView = Backbone.View.extend({
    tagName: 'tr',
    className: 'saved-div',
    template: _.template($('.saved-temp').html()),
    events: {
        "click a.delete": "deleteIt"
    },

    render: function() {
        var that = this;

        that.$el.html(this.template(this.model.attributes));

        this.countIt();
        return this;
    },

    deleteIt: function() {

        this.$el.remove();

        var calSpan = document.getElementsByClassName('cal-count-span')[0];

        this.$('.cals.saved-li').each(function(i, el) {

            var parse = parseInt(el.innerText);
            var index = calsArr.indexOf(parse);

            calsArr.splice(index, 1);
            var sum = calsArr.reduce(add, 0);

            function add(a, b) {
                return a + b;
            }

            calSpan.innerText = sum;

        });
    },

    countIt: function() {

        var sum;

        this.$('.cals').each(function(i, el) {

            var parsed = parseInt(el.innerText);
            calsArr.push(parsed);
            sum = calsArr.reduce(add, 0);

            function add(a, b) {
                return a + b;
            }
        });

        var calSpan = document.getElementsByClassName('cal-count-span')[0];
        calSpan.innerText = sum;

    }
});

var foodView = Backbone.View.extend({
    tagName: 'div',
    className: 'food-div',
    events: {
        "click button.add": "addTo",
        "click button.bfast": "bfastID",
        "click button.lunch": "lunchID",
        "click button.dinner": "dinnerID"
    },

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

            for (var r = 0; r < 3; r++) {

                var tempItemInf = that.$('.temp-item')[r].innerText;
                var tempHeadInf = that.$('.temp-head')[r].innerText;
                formData[tempHeadInf] = tempItemInf;

            }

        });

        $('.eat-record').slideDown();

        new savedFoodView(formData);

    },

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


        if (this.$('.food-div').length > 0) {

        }

        this.$el.append(eatView.render().el);

    }
});