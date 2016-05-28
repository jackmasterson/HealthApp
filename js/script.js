

	var foodItem = Backbone.Model.extend({
		defaults: {
			title: 'no title',
			author: 'unknown',
			keywords: 'none'
		}
	});

	var foodList = Backbone.Collection.extend({
		model: foodItem
	});

	var savedFoodItem = Backbone.Model.extend({
		defaults: {
			Item: "no food selected yet!"
		}
	});

	var savedFoodList = Backbone.Collection.extend({
		model: savedFoodItem
	});

	var foodView = Backbone.View.extend({
		tagName: 'div',
		className: 'food-div',		
		events: {
			"click button.add": "addTo",
			//"click button.info": "getInfo",
			"click button.bfast": "bfastID",
			"click button.lunch": "lunchID",
			"click button.dinner": "dinnerID"
	//		"click button.bfast": "addFast",
	//		"click button.lunch": "addLunch",
	//		"click button.dinner": "addDin"
		},

		template: _.template( $( '.food-template' ).html() ),

		render: function() {
			this.$el.html( this.template( this.model.attributes ) );
		//	(console.log(this.$el));
			return this;
		},

		addTo: function(e){
			e.preventDefault();
			var clicked;
			var formData = {};

			this.$('.meal').slideDown();

		},

		getInfo: function(){
			var that = this;
			var classed = that.$('.temp-item');
			var classy = that.$('.temp-item').attr('id')

			var formData = {id: classy};
			var allForm = {
						   breakfastData: {},
						   lunchData: {},
						   dinnerData: {}
						  };
			//console.log(that.$('.temp-item'));
			
			var foodToAdd = document.getElementsByClassName('food-temp');
			this.$('.food-temp li span').each(function(i, er){
				
				for(var r=0; r<3; r++){
					
					var tempItemInf = that.$('.temp-item')[r].innerText;
					var tempHeadInf = that.$('.temp-head')[r].innerText;
					formData[tempHeadInf] = tempItemInf;

				}
			//	console.log(formData);
			

		
			});
			var hasClassFast = classed.hasClass('fast-it');
			var hasClassLunch = classed.hasClass('lunch-it');
			var hasClassDinner = classed.hasClass('dinner-it');

			$('.eat-record').slideDown();

			new savedFoodView( formData );

		},

		bfastID: function() {
			var that = this;
			//this.bfastData = {};
			//var classed = document.getElementsByClassName('.temp-item');

			that.$('.temp-item').attr('id', 'Breakfast');
			this.getInfo();
		},

		lunchID: function() {
			var that = this;
			that.$('.temp-item').attr('id', 'Lunch');
		//	console.log(that.$('.temp-item'));
			this.getInfo();
		},

		dinnerID: function() {
			var that = this;
			that.$('.temp-item').attr('id', 'Dinner');
			this.getInfo();
		}

	});

	var calsArr = [];

	var savedMealView = Backbone.View.extend({
		tagName: 'tr',
		className: 'saved-div',
		template: _.template( $('.saved-temp').html() ),
		events: {
			"click a.delete": "deleteIt"
		},

		render: function(){
			var that = this;
			var list = document.getElementsByClassName('saved-div');
		//	console.log(that.$el);
		//	console.log($('.food-div'));

			that.$el.html( this.template( this.model.attributes ) );


			
			this.countIt();
			return this;
		},

		deleteIt: function() {

			var that = this;
			this.$el.remove();

			var calSpan = document.getElementsByClassName('cal-count-span')[0];
			var calSaved = document.getElementsByClassName('cals saved-li');

			this.$('.cals.saved-li').each(function(i, el){

				var parse = parseInt(el.innerText);
				var index = calsArr.indexOf(parse);
	
				calsArr.splice(index, 1);
			//	console.log(calsArr);
				var sum = calsArr.reduce(add, 0);
				function add(a, b){
					return a+b;
				};
				console.log(sum);
				calSpan.innerText = sum;

			})
		},

		countIt: function() {

			var sum;

			this.$('.cals').each(function(i, el){

				var parsed = parseInt(el.innerText);
				calsArr.push(parsed);
				sum = calsArr.reduce(add, 0);

				function add(a, b) {
					return a + b;
				};
				

			});

			var calSpan = document.getElementsByClassName('cal-count-span')[0];
		//	console.log(calSpan);
			calSpan.innerText = sum;

		}
	})

	var savedFoodView = Backbone.View.extend({
		
		el: '.meals-eaten-table',
		//fast: '.fast-it-eaten-table',

		initialize: function( eatenMeals ){
			console.log(eatenMeals);
			console.log(eatenMeals.id);
			this.collection = new savedFoodList( eatenMeals );
			this.render();
		},

		render: function() {

			this.collection.each(function(items){
		
				this.renderSaved(items);
			}, this);
		},

		renderSaved: function( items ) {
			var savedView = new savedMealView({
				model: items
			});
			console.log(this.$el[0]);
		/*	$('.temp-item').each(function(i, el){
			//	console.log(el);

				if($('.temp-item').hasClass('fast-it')){
		//			console.log(el.innerText, 'fast!');
				//	that.$el.html( that.template( that.model.attributes ) );
					//$('.fast-it-eaten-table').prepend(savedView.render().el);
				}

			})*/
	//		var hasClassFast = classed.hasClass('fast-it');
	//		var hasClassLunch = classed.hasClass('lunch-it');
	//		var hasClassDinner = classed.hasClass('dinner-it');
		
		$('.meals-eaten-table').prepend(savedView.render().el);
		//$('.dinner-it-eaten-table').prepend(savedView.render().el);
		}
	});

	//console.log($('a.bfast')[0]);

	var foodListView = Backbone.View.extend({
		el: '.search-fill',

		initialize: function( initialFoods ) {
		//	console.log(initialFoods);
			this.$el.empty();
			this.collection = new foodList( initialFoods );
			this.render();
		},

		render: function() {

			this.collection.each(function( item ) {
				//console.log(item);
				this.renderFood( item );
			}, this );
		},

		renderFood: function( item ){
			//console.log(item);
			//
			var eatView = new foodView({
				model: item
			});


			var foodDiv = this.$('.food-div')
			if(this.$('.food-div').length > 0){

			}

				this.$el.append( eatView.render().el );

			
		}
	});
/*			$('.search-fill div ul li span.temp-head').each(function(i, el){
				console.log(el.innerText);
			//	console.log(el.innerText);
		//	console.log(head);
		//		console.log(el);

		//	for(var t=0; t<3; t++){
			//	console.log(head[t].innerHTML);
			//	var header = head[t].innerHTML;
			//	var headItem = tempItem[t].innerHTML;

			//	formData[tex];
				
		//		console.log(el);
			
			//	console.log(i);

				//console.log($(el).val());
				if( el.innerText !='')
				{
					formData[el.innerText] = el.innerText;
				}
		//	}
			//	console.log(formData);
			});*/


var foodInfo = [];

$(function() {
	
	var foodSet = {
		query: function(){
			var that = this;
			var search = document.getElementsByClassName("searchBar");
			var calMin = document.getElementsByClassName("minBar");
			var calMax = document.getElementsByClassName("maxBar");
			
	        $(".searchButton").click(function(){

		        that.searched = $(search[0]).val();
		       	that.calMin = $(calMin[0]).val();
		        that.calMax = $(calMax[0]).val();
		        that.nutrInit(); 
		        $('.search-fill').slideDown();

		    });

		},	

		nutrInit: function() {
			var apiID = "20ca6dec";
			var apiKey = "2926b7be1f28ff2f6cb361a23678110c";
			this.nutrUrl =	
			"https://api.nutritionix.com/v1_1/search/"+
					this.searched+
					"?results="+"0%3A20&cal_min="+
					this.calMin+
					"&cal_max="+
					this.calMax+
					"&fields=*&appId="+
					apiID+
					"&appKey="+
					apiKey;

			this.nutrRender();
		},

		nutrRender: function() {

			$.ajax({
				url: this.nutrUrl,
				dataType: 'json',
			})
			.done(function(response){
				foodInfo = [];
				for(var i=0; i<response.hits.length; i++){
					var fields = response.hits[i].fields;
					var item = fields.item_name;
					var brand = fields.brand_name;
					var cal = fields.nf_calories;
					var serving = fields.nf_serving_size_qty;
					var unit = fields.nf_serving_size_unit;
					var fat = fields.nf_total_fat;
					
					foodInfo.push({
						"item": item,
						"brand": brand,
						"cal": cal,
						"serving": serving + " " + unit,
						"fat": fat
					});

				}	

				var unique = _.uniq(foodInfo);
				new foodListView( unique );
			})	
		},
	};
	
	foodSet.query();

});





