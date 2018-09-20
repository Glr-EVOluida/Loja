const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
    host: '192.168.200.147',
    user: 'root',
    password: '',
    database: 'loja'
});

connection.connect(err =>{
    if(err){
        return err;
    }
});

console.log(connection);

app.use(cors());

app.get('/show', (req, res) => {
    const { table } = req.query;
    const select = `SELECT * FROM ${table}`;
    connection.query(select, (err,results) =>{
        if(err){
            return res.send(err);
        }else{
            return res.json({
                data:results
            })
        }
    });
});

app.get('/add', (req, res) => {
    const { table, campos, valores } = req.query;
    const insert = `INSERT INTO ${table} (${campos}) VALUES (${valores})`;
    connection.query(insert, (err, results) =>{
        if(err){
            return err;
        }else{
            return res.send('enviado')
        }
    })
});

app.get('/update', (req, res) => {
    const { table, alt, id } = req.query;
    const update = `UPDATE ${table} SET ${alt} WHERE id=${id}`;
    connection.query(update, (err, results) =>{
        if(err){
            return err;
        }else{
            return res.send('update')
        }
    })
});

app.get('/remove', (req, res) => {
    const { table, id } = req.query;
    const remove = `DELETE FROM ${table} WHERE id=${id}`;
    connection.query(remove, (err, results) =>{
        if(err){
            return err;
        }else{
            return res.send('remove')
        }
    })
});

app.listen(4000, () => {})