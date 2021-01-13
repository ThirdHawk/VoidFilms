const express = require('express');
const cors = require('cors')

const app = express();
const PORT = 8080;

let mysql = require('mysql');
const connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.db
});
connection.connect()

app.use(cors());

app.listen(PORT, () => console.log(`Express server currently running on port ${PORT}`));

app.get('/api/films', (request, response, next) => {
    connection.query('SELECT * FROM filmproposti ORDER BY nome_film ASC', (err, result, fields) => {
        if(err) throw err
        response.json(result)
    })
})

app.get('/api/films-to-watch', (request, response, next) => {
    console.log(request.query)
    let sort = ""
    if(request.query.hasOwnProperty("sort")){
        sort = `${request.query.sort}, `
    }
    connection.query(`SELECT * FROM filmproposti WHERE stato_visione = 0 ORDER BY ${sort}nome_film ASC`, (err, result, fields) => {
        if(err) throw err
        response.json(result)
    })
})

app.get('/api/films-watched', (request, response, next) => {
    connection.query('SELECT * FROM filmproposti WHERE stato_visione = 1 ORDER BY nome_film ASC', (err, result, fields) => {
        if(err) throw err
        response.json(result)
    })
})