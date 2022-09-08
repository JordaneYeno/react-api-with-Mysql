var express = require("express")
var mysql = require("mysql")
var app = express()

app.use(express.json())

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'eshop'
})


con.connect((err)=>{
    if(err)
    {
        console.log(err)
    }else{
        console.log('connexion établie');
    }
})


app.get('/', (req, res)=>{
    res.send('Hello');
})


app.get('/api/get', (req, res)=>{
    
    con.query('SELECT * FROM chaussures',(err,result)=>{
        if(err) res.status(500).send(err)
        
        res.status(200).json(result)
    })
})


app.get('/api/get/:id', (req, res)=>{
    
    con.query('SELECT * FROM chaussures WHERE idxChaussure=?',[req.params.idxChaussure],(err,result)=>{
        if(err) res.status(500).send(err)
        
        res.status(200).json(result)
    })
})


app.post('/api/post', (req, res)=>{
    const idxMarque = req.body.idxMarque;
    const taille = req.body.taille;
    const couleur = req.body.couleur;
    const prix = req.body.prix;
    const nomChaussure = req.body.nomChaussure;

    
    con.query('INSERT INTO chaussures VALUES(NULL,?,?,?,?,?)',[idxMarque,taille,couleur,prix,nomChaussure],(err,result)=>{
        if(err)
    {
        console.log(err)
    }else{
        res.send('POSTED');
    }
    })
})


app.listen(3000, (err)=>{
    if(err)
    {
        console.log(err)
    }else{
        console.log('on port 3000');
    }
})