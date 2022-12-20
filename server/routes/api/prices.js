const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PWD,
    database: process.env.MYSQL_DB
}).promise();

// Get gold prices
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const prices = await getGoldPricesAsync(id);
    res.send(prices);
});

async function getGoldPricesAsync(id) {
    const [rows] = await pool.query(`SELECT * from led WHERE weight = 0 AND nid = ?`, [id]);
    return {
        buy: rows[0]?.muavao,
        sell: rows[0]?.banra
    };
};

module.exports = router;