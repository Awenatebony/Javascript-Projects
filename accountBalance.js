const fs = require("fs");
const mysql = require("mysql2");
const nodemailer = require('nodemailer');

const databaseConnection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"awenate098",
    database:"Microfinance"
});

databaseConnection.connect((err)=>{
    if(err){
        console.log(err.message)
    }
    else{
        console.log("connected to the Database");
    }
});

//  Reading a Data From a file .....

fs.readFile("file.txt", "utf8", (err, data) => {
    if(err){
        console.error(err)
        return;
    }

    console.log(data);

    
    // Spliting the Data IN the File into Lines!!!!
        const dataLines = data.split("\n");

        dataLines.slice(1).forEach((line)=>{
        const [customerName, accountBalance, phoneNumber, emailAddress] = line.split(/\s+/);

        const saveToDatabase = "INSERT INTO customers (name, balance, phone, email) VALUES (?, ?, ?, ?)";

        databaseConnection.query(saveToDatabase, [customerName, parseFloat(accountBalance), phoneNumber, emailAddress], (err)=>{
            if(err){
                console.log(err.message);
                return;
            }
            console.log(`Saved ${customerName} to the database.`);
        });



        const mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'awennaambonaventure@gmail.com', // Your email address
                pass: 'awenate098' // Your email password
            }
        });

        const emailDetails = {
            from: 'awennaambonaventure@gmail.com', // Sender's email
            to: emailAddress, // Customer's email from the file
            subject: 'Your Account Balance',
            text: `Hello ${customerName},\n\nYour current balance is $${accountBalance}.\n\nThank you for banking with us!`
        };

        // Send the email
        mailTransporter.sendMail(emailDetails, (error, info) => {
            if (error) throw error; // If there is a problem sending the email, stop the program
            console.log(`Email sent to ${customerName}: ${info.response}`);
        });





    });

       

});



