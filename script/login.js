
// Select elements
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('loginButton');
const errorMessage = document.getElementById('errorMessage');

// Function to check input fields
function checkInputFields() {
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (username && password) {
    // Enable the login button if both fields are filled
    loginButton.disabled = false;
    errorMessage.style.display = 'none';
  } else {
    // Disable the login button and show error message if any field is empty
    loginButton.disabled = true;
    errorMessage.style.display = 'block';
  }
}

// Add event listeners to check the input fields on keyup
usernameInput.addEventListener('keyup', checkInputFields);
passwordInput.addEventListener('keyup', checkInputFields);

// Optional: Add a click event listener to the button if you want to handle the form submission
loginButton.addEventListener('click', (e) => {
  e.preventDefault(); // Prevent the form from submitting
  alert('Form submitted successfully!'); // Dummy success message
  // Add your form submission logic here
});
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

// Set up MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'yourUsername', // replace with your MySQL username
  password: 'yourPassword', // replace with your MySQL password
  database: 'user_info' // replace with your database name
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define a route to handle form submission
app.post('/submit', (req, res) => {
  const name = req.body.name;
  const phone = req.body.phone;
  if (!name || !phone) {
    return res.status(400).json({ message: 'Name and phone are required' });
  }

  // Insert into database
  const query = 'INSERT INTO users (name, phone) VALUES (?, ?)';
  db.query(query, [name, phone], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err });
    }
    res.status(200).json({ message: 'User information saved successfully' });
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
