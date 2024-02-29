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
const idChoiceArray = [];
const quantityInStockArray = [];
const quantityRequestedArray = [];
const selectedItemPriceArray = [];






const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: password,
    database: 'bamazon'
});

// Connect to the mysql server

connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL database:', err);
      return;
    }
    console.log('Connected to MySQL database');
    readAllProducts();
    
    // You can now execute queries or perform other database operations here
  });



function readAllProducts(){
  console.log(divider + "\nWELCOME TO BAMAZON\n" + divider);
  connection.query("SELECT * from products", function (err, res){
    if(err) throw err;
    for(let i = 0; i < res.length; i++){
      idNumberArray.push(res[i].item_id);
    }
    console.table(res);
    console.log(divider);
    singleItemChoice();
  })
}



function singleItemChoice() {
  inquirer.prompt([
    {

      type: "input",
      name: "idQuery",
      message: "What is the ID of the product you would like to buy?"

    }
  ]).then(answers => {
    if(!isNaN(answers.idQuery)){


      const numberValue = parseInt(answers.idQuery);
      const isInArray = idNumberArray.includes(numberValue);
      
      if(isInArray){

        console.log("\n\n Here is your item! "+ divider);
        connection.query("SELECT * from products WHERE item_id = " + answers.idQuery, function(err, res){
          if(err) throw err;
          console.table(res);
          console.log(divider);
          idChoiceArray.push(numberValue);
          selectedItemPriceArray.push(res[0].item_price);
          // quantityChoice();
        });


      }else {
        console.log("\n\n That ID doesn't match a product in our system. Please try again. \n\n");
        singleItemChoice();
      }



    } else {
      console.log("\n\n Bamazon only uses numbers to identify their products. Please try again. \n\n");
      singleItemChoice();
    }
  });
}
