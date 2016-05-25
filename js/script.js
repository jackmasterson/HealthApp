
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

	var foodView = Backbone.View.extend({
		tagName: 'div',
		className: 'food-div',
		template: _.template( $( '.food-template' ).html() ),

		render: function() {
			this.$el.html( this.template( this.model.attributes ) );

			return this;
		}
	});

	var foodListView = Backbone.View.extend({
		el: '.search-fill',


		initialize: function( initialFoods ) {

	//		console.log(initialFoods);
			this.collection = new foodList( initialFoods );
	//		console.log(this.collection);
			this.render();
		},

		render: function() {
		//	console.log(this.collection);
			this.collection.each(function( item ) {
				console.log(item);
				this.renderFood( item );
			}, this );
		},

		renderFood: function( item ){
			console.log(item);
			var eatView = new foodView({
				model: item
			});
			this.$el.append( eatView.render().el );
		}
	});

var foodInfo = [];
$(function() {
	

	var foodSet = {
		query: function(){

			var search = document.getElementsByClassName("searchBar");
			var calMin = document.getElementsByClassName("minBar");
			var calMax = document.getElementsByClassName("maxBar");
			var self = this;

	        self.searched = $(search[0]).val();
	        self.calMin = $(calMin[0]).val();
	        self.calMax = $(calMax[0]).val();
	        $(".search-fill").slideDown();
	        self.nutrInit();  
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
			//		$('ul', this.el).append(itemView.render().el);
//make this a template.////////////
				/*	var itemHead = 
						'<div>'+
							'<h2 class="food-head">' +
								'<a class="foodAdd">'
									+item+'-'+brand+
								'</a>'+
							'</h2>'+
							'<h4 class="food-sub-head">'
								+cal+' calories, '+serving+' '+unit+
							'</h4>'+
						'</div><br>';

					$('.search-fill').append(itemHead);*/
					new foodListView( foodInfo );
					
				}
				
			})	
		},
	};
	foodSet.query();
	

});



/*(function($){


	var List = Backbone.Collection.extend({
		model: Item
	});

	var ItemView = Backbone.View.extend({
		tagName: 'li', 
		initialize: function() {
			_.bindAll(this, 'render');
		},
		render: function() {
			console.log(this.model);

			//$(this.el).html('<span>'+this.model.get('items')+'</span>');
			//return this;
		}
	});

	var ListView = Backbone.View.extend({
		el: $('body'),
		events: {
			'click button.searchButton': 'query',
			'click a.foodAdd': 'addTo'
		},

		initialize: function() {
		_.bindAll(this, 'render', 'query', 'addTo');
		
		this.collection = new List();
		this.collection.bind('add', this.query, this.addTo);

	//	this.counter = 0;
		this.render();

		},

		render: function() {
			var self = this;

			$(this.el).prepend("<button class='searchButton'>Click to Search!</button>");
			//$(this.el).append("<ul></ul>");
			_(this.collection.models).each(function(item){
				self.appendItem(item);
			}, this);

		},

		query: function(){

			var search = document.getElementsByClassName("searchBar");
			var calMin = document.getElementsByClassName("minBar");
			var calMax = document.getElementsByClassName("maxBar");
			var self = this;

	        self.searched = $(search[0]).val();
	        self.calMin = $(calMin[0]).val();
	        self.calMax = $(calMax[0]).val();
	        $(".search-fill").slideDown();
	        self.nutrInit();  
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
					Item.foodInfo = [];
					Item.foodInfo.push({
						"item": item,
						"brand": brand,
						"cal": cal,
						"serving": serving + " " + unit,
						"fat": fat
					});

					var itemView = new ItemView({
						model: item
					});
			//		$('ul', this.el).append(itemView.render().el);
//make this a template.////////////
					var itemHead = 
						'<div>'+
							'<h2 class="food-head">' +
								'<a class="foodAdd">'
									+item+'-'+brand+
								'</a>'+
							'</h2>'+
							'<h4 class="food-sub-head">'
								+cal+' calories, '+serving+' '+unit+
							'</h4>'+
						'</div><br>';

					$('.search-fill').append(itemHead);
				}
			})
		},

		addTo: function() {
			var that = this;
			console.log('hey');
			console.log(this.$('.foodAdd')[0]);
		}
	});

	var listView = new ListView();

}) (jQuery);*/


