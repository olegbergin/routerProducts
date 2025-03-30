const express = require('express');
const router = express.Router();
const data = require('../data');


function validateProductFields({ id, name, price, stock }, isUpdate = false) {
  const errors = [];

  if (!isUpdate && id === undefined) errors.push("'id' is required");
  if (!name) errors.push("'name' is required");
  if (price === undefined) errors.push("'price' is required");

  if (price !== undefined && price <= 0) errors.push("'price' must be greater than 0");
  if (stock !== undefined && stock <= 0) errors.push("'stock' must be greater than 0");

  return errors;
}

function findProductIndexById(products, id) {
  return products.findIndex(p => p.id === id);
}

// GET /api/products
router.get('/', (req, res) => {
  res.json({ products: data.products });
});

// GET /api/products/:id
router.get('/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = data.products.find(p => p.id === productId);

  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

// POST /api/products
router.post('/', (req, res) => {
  const validationErrors = validateProductFields(req.body);
  if (validationErrors.length > 0) {
    return res.status(400).json({ errors: validationErrors });
  }

  if (data.products.some(p => p.id === req.body.id)) {
    return res.status(400).json({ message: 'Product ID already exists' });
  }

  const newProduct = { ...req.body };
  data.products.push(newProduct);

  res.json({ message: 'Product added', product: newProduct });
});

// PUT /api/products/:id
router.put('/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const productIndex = findProductIndexById(data.products, productId);

  if (productIndex === -1) return res.status(404).json({ message: 'Product not found' });

  const validationErrors = validateProductFields(req.body, true);
  if (validationErrors.length > 0) {
    return res.status(400).json({ errors: validationErrors });
  }

  const updatedProduct = { id: productId, ...req.body };
  data.products[productIndex] = updatedProduct;

  res.json({ message: 'Product updated', product: updatedProduct });
});

// DELETE /api/products/:id
router.delete('/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const productIndex = findProductIndexById(data.products, productId);

  if (productIndex === -1) return res.status(404).json({ message: 'Product not found' });

  data.products.splice(productIndex, 1);
  res.json({ message: 'Product deleted' });
});

module.exports = router;