const bcrypt = require('bcrypt');
const pool = require('../db'); // Asigură-te că calea către modulul de bază de date este corectă
const createUser = async (user) => {
 const { username, password } = user;
 const hashedPassword = await bcrypt.hash(password, 10); // Asigură-te că bcrypt este importat și
instalat
 const [result] = await pool.query('INSERT INTO users (username, password) VALUES (?, ?)',
[username, hashedPassword]);
 return result.insertId;
};
const findUserByUsername = async (username) => {
 const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
 return rows[0];
};
module.exports = { createUser, findUserByUsername };