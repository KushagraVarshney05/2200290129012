const express = require('express');
const app = express();
const db= require('../config/db');

const getCompany = (req, res) => {
    const query = 'SELECT * FROM companies';
    db.query(query, (err, result) => {
        if (err) {
            res.status(400).send
            ('Error fetching companies');
            return;
        }
        res.status(200).send(result
            );
    }
    );
}
const insertCompany = (req, res) => {
    const { name } = req.body;
    const query = `INSERT INTO companies (company_name) VALUES ('${name}')`;
    db.query(query, (err, result) => {
        if (err) {
            res.status(400).send('Error inserting company');
            return;
        }
        res.status(200).send('Company inserted');
    });
}
module.exports = {
    getCompany,
    insertCompany
};
