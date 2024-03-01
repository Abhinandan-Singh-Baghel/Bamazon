// const mysql = require('mysql');
import mysql from 'mysql'

// require('dotenv').config();

import dotenv from 'dotenv';
dotenv.config();

// const inquirer = require('inquirer');

import inquirer from 'inquirer';
import cTable from 'console.table'

// const cTable = require('console.table')
const divider = "\n----------------------------------------------------------------------"



const password = process.env.PASSWORD;

const idNumberArray = [];
let idChoiceArray = [];
let quantityInStockArray = [];

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: password,
    database: 'bamazon'
});


connection.connect(function (err){
    if(err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    pushIdNumbers();
    managerOptions("Please Select from the following:");

});


function managerOptions(message){
    idChoiceArray = [];
    quantityInStockArray = [];
    inquirer.prompt([
        {
            type: "list",
            name: "managerChoice",
            message: message,
            choices: [
                "Products for Sale",
                "Low Inventory",
                "Add to Inventory",
                "Add New Product",
                "Quit"
            ]
        }
    ]).then(answers => {
        switch(answers.managerChoice){
            case "Products for Sale":
            showAllProducts();
            break;
            case "Low Inventory":
                showLowInventory();
                break;
            case "Add to Inventory":
                itemChoice();
                break;
            case "Add New Product":
                addNewProduct();
                break;
            case "Quit":
                console.log("\n Have a Great Day!");
                connection.end();
        }
    });
}





function pushIdNumbers(){
    connection.query("SELECT * from products", function (err, res){
        if(err) throw err;
        for(i = 0; i< res.length; i++){
            idNumberArray.push(res[i].item_id);
        }
    });
}


