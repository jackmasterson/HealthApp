Health-App - Calorie and Food Tracker

Jack Masterson
June 3, 2016

What is it?
-----------

A way for users to keep track of the food they eat by searching the Nutiritionix API database of foods.

Typing a food in the search bar (with the optional parameters in the search bars below for calorie maximum and minimum) will populate a section that appears on the left hand side, each food containing an "Add" button. 

When the user selects the "Add" button, each meal option appears as a button. Clicking one of them will add the food to a section that appears under the "Foods I've Eaten Today", with the corresponding meal, calorie count, food type, and brand along with a [delete] button.

There is a calorie count in the top right that adds or subtracts as foods are added or deleted to the "I've Eaten Today" section. If the calories are decimals, it rounds down using "reduce."

API
---

This app uses the Nutritionix API, a database of foods, calories, and other useful information on the selected food. This app only tracks food type ("Item"), Brand, and Calories. 

Backbone 
--------

Utilizes Backbones Model View Collection approach, separating the concerns into different files for both the searched food div and the selected/added/saved food div. Underscore is also utilized.

To Use
------

The site is hosted using Github Pages (gh-pages) at the link below: 

	[https://jackmasterson.github.io/HealthApp/]