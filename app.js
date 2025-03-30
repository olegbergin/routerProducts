const express = require('express');
const app = express();
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');

const port = process.env.PORT || 3000;

// Middleware for JSON processing (if required)
app.use(express.json());
app.use(express.static('public'));

// Routers
app.use('/api/users', userRoutes); // All user routes
app.use('/api/products', productRoutes); // All user routes

// Main Page
app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Main Page</h1>');
});

// Processing route 404
app.use((req, res) => {
  res.status(404).send('<h1>404 Not Found</h1>');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

