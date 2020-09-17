const express = require('express')
const mustacheExpress = require('mustache-express')
require('dotenv').config()
const app = express()

const mustache = mustacheExpress()
mustache.cache = null;
app.engine('mustache', mustache)
app.set('view engine', 'mustache')

// /list here is just a route
app.get('/list', (req,
                  res) => {
        //render the viewfile called list.
        res.render('list')
    }
)

//static file handling
app.use(express.static('public'))

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})