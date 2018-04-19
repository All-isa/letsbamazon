/* CREATE IF NOT EXISTS bamazon_db; */
DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
id INTEGER(10) AUTO_INCREMENT NOT NULL,
product_name VARCHAR(50) NOT NULL,
department_name VARCHAR(50) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock_quantity INTEGER(10) DEFAULT 10,
PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price)
VALUES ("banana", "produce", .25)
,("steak", "meat", 16.50)
,("apple", "produce", 2.75)
,("chips", "snacks", 2.50)
,("milk", "dairy", 4.00)
,("broccoli", "produce", 2.75)
,("salmon", "meat", 12.50)
,("carrots", "produce", 3.00)
,("bread", "bakery", 4.50)
,("potatoes", "produce", 5.00);


