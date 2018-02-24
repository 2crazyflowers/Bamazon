# Bamazon - Node.js & MySQL

### Description
This is an Amazon-like storefront using MySQL. The app displays products for sales, takes in orders from customers and depletes stock from the store's inventory listed in MySQL after a purchase. This app also provides a manager view which allows the user to display product information, add to inventory, view low inventory items and add new products.

### Built With
1. Node.js
1. JavaScript
1. MySQL
1. NPM Inquirer
1. NPM Dotenv
1. NPM Table
1. NPM MySQL

### To Use
1. You will need to fork the repository to your own github, the pull it into your local drive. You will need installed on your local computer:
* MySQL Workbench: https://www.mysql.com/products/workbench/
* Node.js: https://nodejs.org/en/
1. Once you have these items on your computer and the repository folder on your computer open in git bash you can enter the code: _npm install_ 
This will install the required npm packages. To view these required npms look into the package.json file. The include: inquirer, dotenv, table and mysql. 
1. You will need to open mySQL Workbench and add the database and table.
1. You will need to create a .env file that contains your password for mySQL in the following format (enter your password where the stars are:
MYSQL_PASSWORD="*********"
1. YOu can choose either bamazonCustomer.js or bamazonManager.js to node to start the application. Do this by opening your gitbash and go into the folder where the repository is held and in the command line type _node bamazoncustomer.js_ for the customer option or _node bamazonmanager.js_ for the manager view. 
__Please note: if there is an error or issue with node not ending the program - press *CNTRL C*__


# View Options

### Customer View (bamazonCustomer.js)
1. Displays product information information including:
	* item_id (unique id for each product)
	* product_name (Name of product)
	* department_name
	* price (cost to customer)
	* stock_quantity (how much of the product is available in stores)
	![Product Table](/images/displayproducts.png)

1. The app prompts the user the ID of the product they would like to buy.
1. The second prompt asks how many of selected product they would like to buy.
1. Once the user has placed the order, the application checks:
	* if the store has enough of the product to meet the user's request.
	* if not, the app log the phrase "Insufficient quantity!", and prevents the order from going through.
	* if the store does have enough of the product, the order is filled and the total price, the item and quantity is logged.
	![Creating An Order](/images/order.png)
	* The app then updates the SQL database to reflect the remaining quantity.
	

### Manager View (bamazonManager.js)
1. List a set of menu options:
	* View Products for Sale
	* View Low Inventory
	* Add to Inventory
	* Add New Product
	* End Program
	![Manager Menu](./images/managermenu.png)
1. If a manager selects View Products for Sale, the app list every available item: the item IDs, names, prices, and quantities.
![Display Order](./images/displayproductsmanager.png)
1. If a manager selects View Low Inventory, then it lists all items with an inventory count lower than five.
![View Low Inventory](./images/viewlowinventory.png)
1. If a manager selects Add to Inventory, the app displays a prompt that will let the manager "add more" of any item currently in the store.
![Add to Inventory](./images/addtoinventory.png)
1. If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.
![Add New Product](./images/addnewproduct.png)


### Add To Your Portfolio
After completing the homework please add the piece to your portfolio. Make sure to add a link to your updated portfolio in the comments section of your homework so the TAs can easily ensure you completed this step when they are grading the assignment. To receive an 'A' on any assignment, you must link to it from your portfolio.

### One More Thing
If you have any questions about this project or the material we have covered, please post them in the community channels in slack so that your fellow developers can help you! If you're still having trouble, you can come to office hours for assistance from your instructor and TAs.

Good Luck!