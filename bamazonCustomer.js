var mysql = require('mysql');
var inquire = require('inquirer');
var Table = require('cli-table');

var connection = mysql.createConnection ({
    host: 'localhost',
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    start();
});

function start() {
    console.log("Welcome to the Bamazon shop, here are our current available items.");
    connection.query("SELECT * FROM products", function (err, results) {
    // instantiate and build our table nicely
var itemsArray = []

var table = new Table({
    head: ['ID', 'Product', 'Department', 'Price', 'Quantity']
    , colAligns: [10, 10, 10, 10, 10]
    })
    results.forEach(function(row) {
      var newRow = [row.id, row.product_name, row.department_name, "$" + row.price, row.stock_quantity]
        table.push(newRow)
        itemsArray.push(row.id)
  })
console.log(table.toString());
});
}
