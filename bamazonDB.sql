-- drop bamazon_db if already exists --
drop database if exists bamazon_db;
-- create bamazon_db database --
create database bamazon_db;

-- makes it so the following code uses the bamazon_db --
use bamazon_db;

-- create table called products --
create table products (
  -- makes a numeric column called item_id which gives a unique number to each item --
  item_id integer(11) auto_increment not null,
  -- makes a string column for the name of each product --
  product_name varchar(30) not null,
  -- makes a string column for the department name of each item --
  department_name varchar(30) not null,
  -- makes a numeric column for the price of each item --
  price integer(11) not null,
  -- makes a numeric column for the stock quantity of each item --
  stock_quantity integer(11) not null,

  primary key(item_id)
  );

-- adding items into product table --
insert into products (product_name, department_name, price, stock_quantity)
values ("jewelry sets", "jewelry", 30, 100), 
("cell phones", "electronics", 200, 20),
("tablets", "electronics", 100, 50),
("craft sets", "crafts", 20, 10),
("file folders", "office supplies", 10, 10),
("marker set", "office supplies", 5 , 40),
("vacuum cleaner", "household", 300, 20),
("aquarium kit", "pets", 80, 5),
("top 10 movies", "entertainment", 10, 100),
("blankets", "household", 40, 50)