var mysql = require("mysql");
var inquire = require("inquirer");
var Table = require("cli-table");
var colors = require("colors");

var connection = mysql.createConnection ({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_db"
});

var inventory = [];
var total = 0;

connection.connect(function(err) {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    display();
});

function display() {
    console.log("Welcome to the Bamazon grocery shop, here are our current stock of available items.");
    connection.query("SELECT * FROM products", function (err, results) {
    var table = new Table({
    head: ['ID', 'Product', 'Department', 'Price', 'Quantity']
    , colWidths: [10,10,10,10,10]
    })
    results.forEach(function(row) {
      var newRow = [row.id, row.product_name, row.department_name, "$" + row.price, row.stock_quantity];
        table.push(newRow);
        inventory.push(row.id);
  })
console.log(table.toString());
pickItem();
});
}

function pickItem() {
	inquire.prompt([
	{
		name: "id",
		message: "Type in the ID number of the item you'd like to purchase".yellow,
		validate: (value) => !isNaN(value)
	},
	{
		name: "qty",
		message: "How many would you like to buy?".yellow,
		validate: (value) => !isNaN(value)
	}
	]).then((ans) => {
		itemPicked(ans.id, ans.qty);
	})
}


function itemPicked(id, qty) {
	connection.query(`SELECT * FROM products WHERE id=${id}`, (err,res) => {
		if (err) {
			console.log(`\nYou've encountered an error.`.red);
		}

		if (qty > res[0].quantity) {
			console.log(`\nInsufficient Quantity, please try again...\n`.red);
		} else {
			if (qty == 1) {
				console.log(`\nYou have selected ${qty} ${res[0].description} for $${res[0].price}.`.green);
				let total = qty*res[0].price;
				console.log(`Your total amount due is: $${total}.\n`);
				buyItem(id, res[0].quantity, qty, total);
			} else if (qty > 1) {
				console.log(`\nYou have selected ${qty} ${res[0].description} for $${res[0].price} each.`.green);
				let total = qty*res[0].price;
				console.log(`Your total amount due is: $${total}.\n`);
				buyItem(id, res[0].quantity, qty, total);
			}
		}
	});
}


function buyItem(id, itemQty, customerQty, total) {
	let newQty = itemQty - customerQty;
	inquire.prompt([
	{
		name: `payment`,
		message: `Please Enter your Credit Card #`.cyan,
		validate: (value) => !isNaN(value)
	},
	{
		name: `confirm`,
		message: `Are you sure you want to make this purchase?`.cyan,
		type: 'confirm'
	}
	]).then((ans) => {
		if (ans.confirm) {
			console.log(`\nCongratulations on your new item.\n`.green);
			updateDataQTY(id, newQty, total);
		} else {
			display();
		}
	})
}

function updateDataQTY(id, qty, total) {
	connection.query("UPDATE products SET quantity=${qty}  WHERE id=${id}", (err, res) => {
		if (err) throw err;
	})
}
