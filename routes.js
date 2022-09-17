const express = require('express')
const { insertItem,  getPelis, getFilms, getRandomFilms } = require('./db')

const router = express.Router()

router.get('/public',(req,res) => {
  res.sendFile(__dirname + "/public");
})

// Obtener las peliculas solicitadas hardcodeado
router.get('/peliculas-hardcode', (req, res) => {
  getPelis()
    .then((items) => {
      items = items.map((item) => ({
        title: item.title,
        year: item.year,
        runtime: item.runtime,
      }))
      res.json(items)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).end()
    })
})

function existTomatoe (item){
  if (item.tomatoe !== undefined && item.tomatoe.critic !== undefined &&
    item.tomatoe.critic.rating !== undefined){
    return item.tomatoe.critic.rating
  } else{
    return "desconocido"  ;
  }
}

function existIMDB (item){
  if (item.imdb !== undefined && item.imdb.rating !== undefined){
    return item.imdb.rating
  } else {
    return "desconocido";
  }
}

//Obtener peliculas solicitadas
router.get('/peliculas', (req, res) => {
  getFilms(req.query.title)
    .then((items) => {
      items = items.map((item) => ({
        poster: item.poster || "desconocido",
        title: item.title,
        year: item.year,
        fullplot: item.fullplot,
        imdb : existIMDB(item),
        tomatoes : existTomatoe(item),
        metacritic: item.metacritic || "desconocido",
      }))
      res.json(items)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).end()
    })
})

router.get('/peliculas-random', (req, res) => {
  getRandomFilms()
    .then((items) => {
      items = items.map((item) => ({
        title: item.title,
        year: item.year,
        fullplot: item.fullplot,
        cast: item.cast,
        imdb: existIMDB(item),
        tomatoes: existTomatoe(item),
        metacritic: item.metacritic,
      }))
      res.json(items)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).end()
    })
})

// Postear una pelicula
router.post('/peliculas', (req, res) => {
  const item = req.body
  console.log(req.body)
  const result = itemSchema.validate(item)
  if (result.error) {
    console.log(result.error)
    res.status(400).end()
    return
  }
  insertItem(item)
    .then(() => {
      res.status(200).end()
    })
    .catch((err) => {
      console.log(err)
      res.status(500).end()
    })
})


module.exports = router
