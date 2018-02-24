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
	displayMenu();
});

//need to display products for sale
function displayMenu() {
//query the database for all the items being auctioned
	inquirer
    .prompt( {
      type: 'rawlist',
      name: 'menu',
      message: 'What do you want to do?',
      choices: [
        'View products for sale',
        'View low inventory',
        'Add to inventory',
        'Add new products',
        'End program'
      ]
    },)
    .then(answers => {
    //console.log(JSON.stringify(answers, null, '  '));
    //console.log(answers.menu);
    //console.log(JSON.strinify(answers));

    if (answers.menu === "View products for sale") {
    	displayProducts();
    }
    if (answers.menu === "View low inventory") {
    	displayLowInventory();
    }
    if (answers.menu === "Add to inventory") {
    	updateProduct();
    }
    if (answers.menu === "Add new products") {
    	addProduct();
    }
    if (answers.menu === "End program") {
    	connection.end();
    }

  });
     
}

function displayProducts() {
	console.log("Selecting all Bamazon Products\n");
	connection.query("SELECT * FROM products", function(err, results) {
		if (err) throw err;
		//commands from npm table
		let dataheader, data, output, output2, config;
		dataheader = [
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
		output = table(dataheader, config);
		console.log(output);
 		for (var i = 0; i < results.length; i++) {
 			//not quite working the way I want, but moving on with this display for now
			data = [
				[results[i].item_id, results[i].product_name, results[i].price, results[i].department_name, results[i].stock_quantity]
			];

			output2 = table(data, config)
			console.log(output2);
 		}
		displayMenu();
	});
}

function displayLowInventory() {
	connection.query("SELECT * FROM products", function(err, result) {
			if (err) throw err;

			for (var i = 0; i < result.length; i++) {

				if (result[i].stock_quantity < 5) {
					console.log("==========================\nItem with less than 5 in stock: \n==========================\n" + result[i].product_name + "\n==========================");
				}
			};
			displayMenu();
	});
}

function updateProduct() {
  inquirer
		.prompt([
			{
				name: "item",
				type: "input",
				message: "Enter the intem number you would like to increase in inventory: ",
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
    			console.log("stock_quantity: " + result[0].stock_quantity);
    			console.log("Ordered quantity: " + answer.quantity);

				var updateQuantity = result[0].stock_quantity + parseInt(answer.quantity);
                console.log("==========================\nYou have orderd " + answer.quantity + " " + result[0].product_name + "(s).\nYour total quantity will be: " + updateQuantity + ", when the item arrives in the warehouse in 5 days.\n==========================");
				
				connection.query("UPDATE products SET ? WHERE ?",
				[{
					stock_quantity: updateQuantity
				},
				{	
					item_id: answer.item
				}], function(err, result){
					console.log(result[0].stock_quantity);
				})
			});
			displayMenu();
		});
}

function addProduct() {
   	inquirer
    	.prompt([
	      {
	        name: "product",
	        type: "input",
	        message: "What is the product you would like to submit?"
	      },
	      {
	        name: "department",
	        type: "input",
	        message: "What department would this product belong to?"
	      },
	      {
	        name: "price",
	        type: "input",
	        message: "What is the price that should be listed for this product?",
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
	        message: "What is the starting quantity for this product?",
	        validate: function(value) {
	          if (isNaN(value) === false) {
	            return true;
	          }
	          return false;
	        }
	      }
	    ])
	    .then(function(answer) {
	      // when finished prompting, insert a new item into the db with that info
	      	connection.query("INSERT INTO products SET ?",
	        {
	          product_name: answer.product,
	          department_name: answer.department,
	          price: answer.price,
	          stock_quantity: answer.quantity
	        },
	        function(err) {
	          if (err) throw err;
	          console.log("Your product was created successfully!");      
	        });
	    });
	    connection.end();
}