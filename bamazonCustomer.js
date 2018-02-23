var mysql = require("mysql");
var inquirer = require("inquirer");
//var keys = require("./keys.js");
require("dotenv").config();
//twitter npm specific call to get keys to twitter account
//var password = new mysql(keys.mysql);


var connection = mysql.createConnection({
	host: "localhost",

	//by default sql port is 3306
	port: 3306,

	user: "root",

	password: process.env.MYSQL_PASSWORD,

	database: "bamazon_db"
});

connection.connect(function(err) {
	if (err) throw err;
	console.log("connected as id " + connection.threadId);

	displayItems();
});
//need to display products for sale
function displayItems() {
//query the database for all the items being auctioned
	console.log("Selecting all products...\n");
	connection.query("SELECT * FROM products", function(err, results) {
		if (err) throw err;

		console.log(results);
		// connection.end();
		chooseItem();

	});

}

function chooseItem() {
//prompt the user for which item they want
		inquirer
		.prompt([
			{
				name: "item",
				type: "input",
				message: "What is the item number of the product you would like to buy?",
				validate: function(value) {
        			if (isNaN(value) === false) {
            			return true;
			      	}
			      	return false;
			    }
			},
			{
		        name: "quantity",
		        type: "input",
		        message: "How many of that item would you like to buy?",
		        validate: function(value) {
        			if (isNaN(value) === false) {
            			return true;
			      	}
			      	return false;
			    }
			}
		])

		.then(function(answer) {
		//need to check quantity requested of the specific item

			connection.query("SELECT * FROM products WHERE ?", {item_id: answer.item}, function(err, result) {
    			if (err) throw err;
   				//Log the quanity of item requested
   				//gives me result of item chosen
				console.log(result);
				//gives me item number of chosen
				console.log(answer.item);
				//gives me quantity of item chosen
				console.log(result[0].stock_quantity);

				//this gives me the price of each item
				console.log(result[0].price);

				//this shows the department name of each item
				console.log(result[0].department_name);

				if (result[0].stock_quantity > answer.quantity) {
					console.log("Item and quantity are available for purchase");
					var cost = result[0].price * answer.quantity
					var updateQuantity = result[0].stock_quantity - answer.quantity
                    console.log("You owe: $" + cost + " for " + answer.quantity + "\nYour order has been placed, thank you, shop with us again!");
					
					connection.query("UPDATE products SET ? WHERE ?",
					[{
						stock_quantity: updateQuantity,
					},
					{	
						item_id: answer.item
					}], function(err, result){})
				}
				else {
					console.log("Item unavailable");
				}
				// console.log(result[0].stock_quantity);
				connection.end();
			});
		});
}



