const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParcer = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(fileUpload());
app.use(bodyParcer.json());
app.use(bodyParcer .urlencoded({ extended: false }));

app.use('/public/uploads', express.static(__dirname + '/public/uploads'));

app.post('/upload', (req, res, next) => {
    let imageFile = req.files.file;
    // Constante para gerar um nome unico para a imagem.
    const fileName =  Date.now();

    imageFile.mv(`${__dirname}/public/uploads/${fileName}.jpg`,
    function (err){
        if(err){
            return res.status(500).send(err)
            
        }
        res.json({ file : `public/uploads/${fileName}.jpg`});
    });
});

app.listen( 8000,() => {
    console.log('8000');
});

module.exports = app;



