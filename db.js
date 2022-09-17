const { MongoClient, ObjectId } = require('mongodb')

const connectionUrl = 'mongodb://127.0.0.1:27017'
const dbName = 'peliculas'

let db

const init = () =>
  MongoClient.connect(connectionUrl, { useNewUrlParser: true }).then((client) => {
    db = client.db(dbName)
  })

const insertItem = (item) => {
  const collection = db.collection('movies')
  return collection.insertOne(item)
}


const getPelis = () => {
  // hardcodeado: peliculas de Harry Potter
  const filter = {
    'title': {
      '$regex': 'Harry Potter'
    }, 
    'cast': {
      '$in': [
        'Emma Watson'
      ]
    }, 
    'runtime': {
      '$gte': 140, 
      '$lte': 165
    }
  };
  const projection = {
    '_id': 0, 
    'title': 1, 
    'year': 1, 
    'runtime': 1
  };
  const sort = {
    'runtime': 1
  };
  
  const coll = db.collection('movies');
  const cursor = coll.find(filter, { projection, sort });
  const result = cursor.toArray();
  return result;
}

const getFilms = (title) => {
  const filter = {
    '$text': {
      '$search': title
    }
  };
  const projection = {
    '_id': 0,
    'poster': 1,
    'title': 1, 
    'year': 1,
    'fullplot' : 1,
    'imdb': {
      'rating': 1
    },
    'tomatoes': {
      'critic': {
        'rating': 1
      }
    },
    'metacritic' : 1,
  };
  const coll = db.collection('movies');
  const cursor = coll.find(filter, { projection });
  const result = cursor.toArray();
  return result;
}

const getRandomFilms = () => {
  const agregation = [
    {
      '$sample': {
        'size': 5
      }
    }
  ];
  const coll = db.collection('movies');
  const cursor = coll.aggregate(agregation);
  const result = cursor.toArray();
  return result;
}

module.exports = { init, insertItem, getPelis, getFilms, getRandomFilms }
