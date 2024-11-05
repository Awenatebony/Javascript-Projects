const fs = require('fs'); 
const mysql = require('mysql2'); 
const nodemailer = require('nodemailer');


const databaseConnection = mysql.createConnection({
    host: 'localhost', 
    user: 'root',     
    password: 'awenate098',
    database: 'Microfinance' 
});

// Connect to the database
databaseConnection.connect((error) => {
    if (error) {
        throw error; // If there's a connection error, stop the program
    }
    console.log('Connected to the database!');
});


fs.readFile('./Capstone1/customer_data.txt', 'utf-8', (error, fileContent) => {
    if (error) throw error;

    const allLines = fileContent.split('\n');

   
    allLines.slice(1).forEach((line) => {
        const [customerName, accountBalance, phoneNumber, emailAddress] = line.split('\t'); // Split each line into parts

        
        const saveToDatabase = 'INSERT INTO customers (name, balance, phone, email) VALUES (?, ?, ?, ?)';
        databaseConnection.query(saveToDatabase, [customerName, parseFloat(accountBalance), phoneNumber, emailAddress], (error) => {
            if (error) throw error
            console.log(`Saved ${customerName} to the database.`);
        });

        // Step 4: Send email to the customer with their balance
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
