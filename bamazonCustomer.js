var mysql = require("mysql");
var inquirer = require("inquirer");
const {table} = require('table');
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
	//console.log("connected as id " + connection.threadId);
	displayItems();
});

//need to display products for sale
function displayItems() {
//query the database for all the items being auctioned
	console.log("Selecting all Bamazon Products\n");
	connection.query("SELECT * FROM products", function(err, results) {
		if (err) throw err;
		//commands from npm table
		let data, output, config;
		data = [
			["item id", "product name", "price", "department name", "stock quantity"]
			];
		config = {
			    columns: {
			        0: {
			            alignment: 'left',
			            width: 7
			        },
			        1: {
			            alignment: 'left',
			            width: 15
			        },
			        2: {
			            alignment: 'left',
			            width: 5
			        },
			        3: {
			        	alignment: 'left',
			        	width: 15
			        },
			        4: {
			        	alignment: 'left',
			        	width: 15
			        }
			    }
			};
		output = table(data, config);
		console.log(output);
 		for (var i = 0; i < results.length; i++) {
 			//not quite working the way I want, but moving on with this display for now
			data2 = [
				[results[i].item_id, results[i].product_name, results[i].price, results[i].department_name, results[i].stock_quantity]
			];

			output2 = table(data2, config);
			console.log(output2);
 		}
		// console.log(results);
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
   				
				if (result[0].stock_quantity > answer.quantity) {
					console.log("==========================\nThe item and quantity you are requesting are available for purchase.\n==========================\n");
					var cost = result[0].price * answer.quantity
					var updateQuantity = result[0].stock_quantity - parseInt(answer.quantity);
                    console.log("==========================\nYou have orderd " + answer.quantity + " " + result[0].product_name + "(s).\nYour total cost is: $" + cost + ".\nYour order has been placed and will shipped to you in 5 days.\nThank you for shopping with Bamazon and have a great day!\n==========================");
					
					connection.query("UPDATE products SET ? WHERE ?",
					[{
						stock_quantity: updateQuantity
					},
					{	
						item_id: answer.item
					}], function(err, result){})
				}
				else {
					console.log("Item unavailable");
				}
				// console.log(result[0].stock_quantity);
				startOver();
			});
		});
}
function startOver() {
	inquirer
		.prompt(
		{
			name: "endOrBuy",
			type: "rawlist",
			message: "Would you like to [BUY] another product or [END] the program?",
			choices: ["BUY", "END"]
		})
		.then(function(answer) {
			// based on their answer, either call the bid or the post functions
			if (answer.endOrBuy.toUpperCase() === "BUY") {
				displayItems();
			}
			else {
				connection.end();
			}
		});
}



