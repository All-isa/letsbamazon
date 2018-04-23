# letsbamazon
Amazon like storefront command line application using mysql and CLI.

Begin as a customer with Node bamazonCustomer.js and you'll be shown a table of products in the CLI. You'll be prompted to choose an item you'd like to purchase by ID number. Afterwards you'll be given your total price for the seleted quantity of selected items and then prompted for "Credit Card Number" (Please fake this). 

Technology Used

node.js 
npm packages: inquirer, mysql, cli-table, colors
MySQL

Installation

Download all files from repo: https://github.com/nomamanomama/bamazon
Create database: Run bamazon_db.sql to create database with products and department tables and initial seed data.
Install packages: npm install

Run

Navigate to install directory and run selected node. Customer: from command line enter: node bamazonCustomer.js

Future Development

Create other positions and options for the CLI application, including a manager and supervisor roles. Extend on accounting options for other roles.
