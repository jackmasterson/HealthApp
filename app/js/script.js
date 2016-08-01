
//function to set the searchbar and API information
$(function() {

    var foodSet = {
        query: function() {
            var that = this;
            var search = document.getElementsByClassName("searchBar");
            var calMin = document.getElementsByClassName("minBar");
            var calMax = document.getElementsByClassName("maxBar");

            //when user clicks the search button, this function
            //grabs the information out of the search,
            //calorie minimum, and calorie maximum bars;
            //if left blank, the search will return random foods
            $(".searchButton").click(function() {

                that.searched = $(search[0]).val();
                that.calMin = $(calMin[0]).val();
                that.calMax = $(calMax[0]).val();
                that.nutrInit();
                $('.search-fill').slideDown();

            });

        },

        //initializes the API call to Nutritionix API
        nutrInit: function() {
            var apiID = "20ca6dec";
            var apiKey = "2926b7be1f28ff2f6cb361a23678110c";
            this.nutrUrl =
                "https://api.nutritionix.com/v1_1/search/" +
                this.searched +
                "?results=" + "0%3A20"/*&cal_min=" +
                this.calMin +
                "&cal_max=" +
                this.calMax +*/+
                "&fields=*&appId=" +
                apiID +
                "&appKey=" +
                apiKey;

            this.nutrRender();
        },

        //renders said API call
        nutrRender: function() {

            $.ajax({
                url: this.nutrUrl,
                dataType: 'json',
            })
            .done(function(response) {
         //       console.log(response);
                var foodInfo = [];
             //   var additionalInfo = [];

                for (var i = 0; i < response.hits.length; i++) {
                    var fields = response.hits[i].fields;
                    var item = fields.item_name;
                    var brand = fields.brand_name;
                    var cal = fields.nf_calories;
                    var serving = fields.nf_serving_size_qty;
                    var unit = fields.nf_serving_size_unit;
                    var fat = fields.nf_total_fat;
                    var calsFromFat = fields.nf_calories_from_fat;
                    var chol = fields.nf_cholesterol;
                    var sodium = fields.nf_sodium;
                    var sugar = fields.nf_sugars;
                    var carbs = fields.nf_total_carbohydrate;

                    //sends the information from the for loop
                    //into the foodInfo array with headings used
                    //by the template established in index.html
                    foodInfo.push({
                        "item": item,
                        "brand": brand,
                        "cal": cal,
                        "serving": serving + " " + unit,
                        "fat": fat,
                        "caloriesFromFat": calsFromFat,
                        "cholesterol": chol,
                        "sodium": sodium,
                        "sugar": sugar,
                        "carbs": carbs
                    });


                }

                //using Underscore, makes sure the array foodInfo
                //doesn't contain duplicates, then initiates
                //a foodListView from those unique strings
                var uniqueFood = _.uniq(foodInfo);
            //    var uniqueAdditional = _.uniq(additionalInfo);
                new foodListView(uniqueFood);
            //    new additionalInfoView(uniqueAdditional);

            });
        },
    };

    foodSet.query();

});