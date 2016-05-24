
var model = {
	foodInfo: []
};

var nutr = {
	query: function(){
		var search = document.getElementsByClassName("searchBar");
		var calMin = document.getElementsByClassName("minBar");
		var calMax = document.getElementsByClassName("maxBar");
		var self = this;
		$(".searchButton").click(function(event){
		      self.searched = $(search[0]).val();
		      self.calMin = $(calMin[0]).val();
		      self.calMax = $(calMax[0]).val();
		      self.init();
		   
		});	
	},

	init: function() {
		console.log(this.query);
		var apiID = "20ca6dec";
		var apiKey = "2926b7be1f28ff2f6cb361a23678110c";
		this.nutrUrl = /*"https://api.nutritionix.com/v1_1/search/"+
			this.searched +
			"?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories"+
			"%2Cnf_total_fat&appId="+ apiID+"&appKey="+apiKey;*/
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
		this.render();
	},

	render: function() {

		$.ajax({
			url: this.nutrUrl,
			dataType: 'json',
		})
		.done(function(response){
			console.log(response);
			for(var i=0; i<response.hits.length; i++){
				//console.log(response.hits[i].fields);
				var fields = response.hits[i].fields;
				console.log(fields);
				var item = fields.item_name;
				var brand = fields.brand_name;
				var cal = fields.nf_calories;
				var serving = fields.nf_serving_size_qty;
				var unit = fields.nf_serving_size_unit;
				var fat = fields.nf_total_fat;
			//	console.log(item, brand, cal, serving, fat);
				model.foodInfo = [];
				model.foodInfo.push({
					"item": item,
					"brand": brand,
					"cal": cal,
					"serving": serving + " " + unit,
					"fat": fat
				});
			//	console.log(model.foodInfo);
				var itemHead = '<h4><a onClick="add.init()">'+item+'-'+brand+'</h4>'+
					'<h4>'+cal+' '+serving+' '+unit+'</h4></a>';
				$('.search-fill').append(itemHead);
			}
		})

	}
};

var add = {
	init: function() {
		console.log('hey');
	}
};

nutr.query()