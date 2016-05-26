
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
		events: {
			"click button.add": "addTo",
			"click button.bfast": "addFast"
		},
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
			//var formHead = [];
			//var formItem = [];
			console.log(this.el);
			console.log(this.el.innerText);
			//console.log(el);
		/*	if( this.el.innerText !='') {
				
				formData[this.el.innerText] = this.el.innerText;

			}*/
		//	console.log(formData);
			$('.meal').slideDown();
		},

		addFast: function(){
			console.log('most important meal of the day!');
		}
	});

	//console.log($('a.bfast')[0]);

	var foodListView = Backbone.View.extend({
		el: '.search-fill',

		initialize: function( initialFoods ) {


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

					new foodListView( foodInfo );	
				}	
			})	
		},
	};
	
	foodSet.query();

});





