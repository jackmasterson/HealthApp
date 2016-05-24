
var nutr = {
	query: function(){
		var search = document.getElementsByClassName("searchBar");
		var self = this;
		$(".searchBar").keyup(function(event){
		    if(event.keyCode == 13){
		      self.searched = $(search[0]).val();
		      self.init();
		    }
		});

		
	},

	init: function() {
		console.log(this.query);
		var apiID = "20ca6dec";
		var apiKey = "2926b7be1f28ff2f6cb361a23678110c";
		this.nutrUrl = "https://api.nutritionix.com/v1_1/search/"+
			this.searched +
			"?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories"+
			"%2Cnf_total_fat&appId="+ apiID+"&appKey="+apiKey;

		this.render();
	},

	render: function() {

		$.ajax({
			url: this.nutrUrl,
			dataType: 'json',
		})
		.done(function(response){
			console.log(response);
		})
	}
};

nutr.query()