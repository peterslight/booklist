const express = require('express')
const mustacheExpress = require('mustache-express')
require('dotenv').config()
const bodyParser = require('body-parser')
const app = express()
const {Client} = require('pg')

module.exports = {
    development: {
        username: "root",
        password: "ppeterstev",
        database: "booklist",
        host: "127.0.0.1",
        dialect: 'postgres'
    }
}

const mustache = mustacheExpress()
mustache.cache = null;
app.engine('mustache', mustache)
app.set('view engine', 'mustache')

//static file handling
app.use(express.static('public'))

app.use(bodyParser.urlencoded({
    extended: false
}))

// /list here is just a route
app.get('/list', (req,
                  res) => {
        //render the viewfile called list.
        res.render('list')
    }
)

app.get('/book/add', (req, res) => {
    res.render('book-form')
})

app.post('/book/add', (req, res) => {
    console.log('body: ', req.body)
    //connect to db, run query and redirect to list page
    const client = new Client()
    client.connect().then(() => {
        const sql = 'INSERT INTO books(title, authors) VALUES ($1, $2)'
        const params = [req.body.title, req.body.authors]
        return client.query(sql, params)
    }).then((result) => {
        console.log('result', result)
        res.redirect('/list')
    }).catch((error) => {
        console.log(error.message)
        res.redirect('/list')
    })


})

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})