const pool = require('../db');
const createProduct = async (product) => {
 const { name, price, description } = product;
 const [result] = await pool.query('INSERT INTO products (name, price, description) VALUES (?, ?, ?)',
[name, price, description]);
 return result.insertId;
};
const getAllProducts = async () => {
 const [rows] = await pool.query('SELECT * FROM products');
 return rows;
};
const getProductById = async (productId) => {
 const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [productId]);
 return rows[0];
};
const updateProduct = async (productId, updatedProduct) => {
 const { name, price, description } = updatedProduct;
 await pool.query('UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?', [name,
price, description, productId]);
 return true;
};
const deleteProduct = async (productId) => {
 await pool.query('DELETE FROM products WHERE id = ?', [productId]);
 return true;
};
module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };