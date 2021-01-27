const express = require('express');
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 80;

app.use(cors());
let mysql = require('mysql');
const connection = mysql.createConnection({
    host: process.env.dbhost,
    user: process.env.dbuser,
    password: process.env.dbpassword,
    database: process.env.db
});
connection.connect()

const filmTable = "filmproposti"
const linkTable = "film_link"

function getCurrentDate(){
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth()+1
    let day = date.getDate()
    return (`${year}-${month}-${day}`)
}

app.listen(PORT, () => console.log(`Express server currently running on port ${PORT}`));

app.get('/api/films', cors(), (request, response, next) => {
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

app.get('/api/films/check-if-exists', (request, response, next) => {
    console.log(request.query)
    if(!request.query.hasOwnProperty('imdbId')) response.error("Missing parameter imdbId")
    connection.query(`SELECT * FROM film_link WHERE imdb = '${request.query.imdbId}'` , (err, result, fields) => {
        if(err) throw err
        response.json(result)
    })
})

app.post("/api/films/add-film", express.json(), (request, response, next) => {
    console.log(request.body)

    let dateAdded = getCurrentDate()
    let film = request.body.film
    let length = film.length + ''
    length = length.split("m")[0]

    let stmt = `INSERT INTO ${filmTable} (nome_film,nome_richiedente, durata, genere, poster, data_aggiunta, priorita)
        VALUES("${film.Title}","web","${length}","${film.Genre}","${film.Poster}","${dateAdded}", 0)`
    connection.query(stmt, (err, result, fields) => {
        if(err) throw err

        if(result.affectedRows === 1){
            let linkStmt = `INSERT INTO ${linkTable} (id_film, imdb) VALUES('${result.insertId}','${film.imdbID}')`
            connection.query(linkStmt, (err2, result2, fields2) => {
                if(err2) throw err2
                response.json(result2)
            })
        }
    })
})

app.post("/api/films/remove-film", express.json(), (request, response, next) => {
    console.log(request.body)
    let film = request.body.film
    connection.query(`DELETE FROM ${filmTable} WHERE id = ${film.id}`, (err, result, fields) => {
        if(err) throw err

        connection.query(`DELETE FROM ${linkTable} WHERE id_film = ${film.id}`, (err2, result2, fields2) => {
            if(err2) throw err2

            response.json(result2)
        })
    })
})
