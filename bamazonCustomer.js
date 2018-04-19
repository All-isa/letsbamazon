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

var inventory = [];

connection.connect(function(err) {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    display();
});


function display() {
    console.log("Welcome to the Bamazon grocery shop, here are our current available items.");
    connection.query("SELECT * FROM products", function (err, results) {
    var table = new Table({
    head: ['ID', 'Product', 'Department', 'Price', 'Quantity']
    })
    results.forEach(function(row) {
      var newRow = [row.id, row.product_name, row.department_name, "$" + row.price, row.stock_quantity]
        table.push(newRow)
        inventory.push(row.id)
  })
console.log(table.toString());
start();
});

function start() {
inquire.prompt ([
    {
        type: "input",
        name: "whatItem",
        message: "Please select which item you would like to purchase by typing the ID?",
        validate: function(input) {
            if (Number.isInteger(parseInt(input)) === true && (inventory.indexOf(parseFloat(input)) !== -1)) {
              return true
            }
            else {
              console.log("\nPlease enter a valid item ID to continue.")
            }
        }
    },
    {
        type: "input",
        name: "quantity",
        message: "How much of this item would you like?",
        validate: function (value) {
            if (isNaN(value) === false) {
                return true;
            } else {
            console.log("\nPlease enter a valid quantity");
                return false;
        }}
    },
]).then(function(answer) {
    var choice;
    var quantity = parseInt(answer.quantity);
    connection.query("SELECT * FROM products", function(err, res) {
        res.forEach(function(row) {
            if (parseInt(answer.whatItem) === row.id) {
                choice = row;
            }
        })
        if ((choice.stock_quantity) > 0) {
            // buyItems(choice, quantity);
        } else {
            console.log("Sorry we are out of stock for that size of order");
        }
    });
}
)}
// function buyItems(item, quantity) {
//     var sales = (item.price * quantity);
//     connection.query(`SELECT department_name FROM products WHERE id=${item.id}`, function(err, res) {
//         if (err) throw err;
//         var department = res[0].department_name;
        
//         connection.query(`SELECT product_sales FROM departments WHERE department_name="${department}"`,function(err, res) {
//         var totalSales = res[0].product_sales;
//         totalSales = parseFloat(totalSales) + parseFloat(sales);
        
//             connection.query(`UPDATE departments SET product_sales=${totalSales} WHERE department_name="${department}"`, function(err, res) {
        
//                 connection.query(`UPDATE products SET stock_quantity=(${parseFloat(item.stock_quantity)} - ${parseFloat(quantity)}), product_sales=(product_sales + (${parseFloat(item.price)} * ${parseFloat(quantity)})) WHERE id=${item.id}`, function(err, res) {
//                 if (err) throw err;

//             console.log("\nYour order was placed successfully!");
//             console.log("Item: " + item.product_name);
//             console.log("Quantity: " + quantity);
//             console.log("Total cost: " + sales + "\n");
//             display();
//             }
// )}
}