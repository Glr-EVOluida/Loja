const express = require('express');
const fileUpload = require("express-fileupload");
const bodyParcer = require("body-parser");
const cors = require('cors');
const mysql = require('mysql');

var fs = require('file-system');

const app = express();

app.use(fileUpload());
app.use(bodyParcer.json());
app.use(bodyParcer .urlencoded({ extended: false }));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'loja'
});

connection.connect(err =>{
    if(err){
        return err;
    }
});


app.use(cors());

app.get('/show', (req, res) => {
    let order = '';
    let limit = '';
    let where = '';

    if(req.query.order) {
        order = 'ORDER BY '+req.query.order;
    }
    
    if(req.query.where) {
        where = 'WHERE '+req.query.where;
        where = where.replace(/@@@/g, "%");
    }

    if(req.query.limit) {
        limit = 'LIMIT '+req.query.limit;
    }


    const { table } = req.query;

    const select = `SELECT * FROM ${table} ${where} ${order} ${limit}`;
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
    const { table, campos } = req.query;

    let { valores } = req.query;

    valores = valores.replace(/@br/g, "<br/>");
    valores = valores.replace(/@b/g, "<b>");
    valores = valores.replace(/~b/g, "</b>");
    valores = valores.replace(/@i/g, "<i>");
    valores = valores.replace(/~i/g, "</i>");

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
    const { table, id } = req.query;

    let {alt} = req.query;

    alt = alt.replace(/@br/g, "<br/>");
    alt = alt.replace(/@b/g, "<b>");
    alt = alt.replace(/~b/g, "</b>");
    alt = alt.replace(/@i/g, "<i>");
    alt = alt.replace(/~i/g, "</i>");

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

app.use('/uploads', express.static(__dirname + '/uploads'));

//remover imagem da pasta do diretorio
app.post('/removeImg/:name',(req,res,next) => {
    // nome do arquivo que serar removido
    const filename = req.params.name;

    // verificação se existe o arquivo na pasta 
    fs.stat(`http://localhost:3000/uploads/${filename}`, function (err, stats) {
        // console.log(stats); aqui temos todas as informações do arquivo na variável stats
     
        console.log('a')

        if (err) {
            return console.error(err);
        }
        // remover arquivo
        fs.unlink(`http://localhost:3000/uploads/${filename}`,function(err){
             if(err) return console.log(err);
        });  
     });
});

app.post('/upload', (req, res, next) => {
    let imageFile = req.files.file;
    // Constante para gerar um nome unico para a imagem.
    const fileName =  Date.now();
    // local para onde é copiada a imagem
    imageFile.mv(`${__dirname}/public/uploads/${fileName}.jpg`,

    function (err){
        if(err){    
            return res.status(500).send(err)
        }
        // retornar o caminho da imagem
        res.json({ file : `${fileName}.jpg`});
        
    });

});

app.listen(4000, () => {
    console.log("4000");
})
