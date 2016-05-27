
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
			title: "no food selected"
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
			"click button.info": "getInfo",
	//		"click button.bfast": "addFast",
	//		"click button.lunch": "addLunch",
	//		"click button.dinner": "addDin"
		},
	//	savedInfo: [],
		template: _.template( $( '.food-template' ).html() ),

		render: function() {
			this.$el.html( this.template( this.model.attributes ) );

			return this;
		},

		addTo: function(e){
			//console.log(e);
			e.preventDefault();
			var clicked;
			var formData = {};

			this.$('.meal').slideDown();

		},

		getInfo: function(){
			var that = this;
			var formData = {};
			console.log('most important meal of the day!');
			var foodToAdd = document.getElementsByClassName('food-temp');
			this.$('.food-temp li span').each(function(i, er){
				
				for(var r=0; r<3; r++){
					
					var tempItemInf = that.$('.temp-item')[r].innerText;
					var tempHeadInf = that.$('.temp-head')[r].innerText;
					formData[tempHeadInf] = tempItemInf;

				}
				
				var formItem = formData.Item;
					
			});

			new savedFoodView( formData );

		}

	});

	

	var savedMealView = Backbone.View.extend({
		tagName: 'div',
		className: 'saved-div',
		template: _.template( $('.saved-temp').html() ),
		events: {
			"click a.delete": "deleteIt"
		},

		render: function(){
			//console.log(eatenMeals);
			var list = document.getElementsByClassName('saved-div');
			console.log(this);
			console.log(this.$el);
			this.$el.html( this.template( this.model.attributes ) );

			return this;
		},

		deleteIt: function() {
			console.log('gone!');
			this.$el.remove();
		}
	})

	var savedFoodView = Backbone.View.extend({
		el: '.meals-eaten',
		//bfast: '.breakfast-save',
		//lmeal: '.lunch-save',
		//dmeal: '.dinner-save',

		initialize: function( eatenMeals ){
			//console.log(eatenMeals);
			//var eatString = JSON.stringify(eatenMeals);
			//console.log(eatString);


			this.collection = new savedFoodList( eatenMeals );
			this.render();
			//this.collection = new 
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
		//	console.log(this.$el[0].innerHTML);
			this.$el.append(savedView.render().el);
		}
	});

	//console.log($('a.bfast')[0]);

	var foodListView = Backbone.View.extend({
		el: '.search-fill',

		initialize: function( initialFoods ) {
		//	console.log(initialFoods);

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
			var eatView = new foodView({
				model: item
			});
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
			

	     //   $(".search-fill").slideDown();
	        $(".searchButton").click(function(){

		        that.searched = $(search[0]).val();
		        console.log(that.searched);
		        that.calMin = $(calMin[0]).val();
		        that.calMax = $(calMax[0]).val();
		        that.nutrInit(); 
		     //   $('.search-fill').slideDown();
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
				//	console.log(foodInfo);
					new foodListView( foodInfo );	
				}	
			})	
		},
	};
	
	foodSet.query();

});





