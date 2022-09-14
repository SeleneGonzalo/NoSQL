
const button = document.getElementById('buttonBuscarH');
const Searchbutton = document.getElementById('buttonBuscar');
const Randombutton = document.getElementById('buttonRandom');

button.addEventListener('click', function(e) {
    // realizar la busqueda y generar la lista 
    fetch('/peliculas-hardcode', {method: 'GET'})
    .then(function(response) {
      if(response.ok) {
        return response.json();
      }
      throw new Error('Request failed.');
    })
    .then((data) => {
        let lista = "";
        data.forEach((peli)=>
        {
            lista = lista + "<p>" + peli.title + " (" + peli.year + ") " + peli.runtime + " min" + "</p>";
        })
        const divRes = document.getElementById("resultados_hardcode");
        divRes.innerHTML = lista;
        return;
    } )
    .catch(function(error) {
      console.log(error);
    });
});

Searchbutton.addEventListener('click', function(e) {
  // realizar la busqueda y generar la lista 
  const title = document.getElementById("title").value;
  fetch('/peliculas?title='+title, {method: 'GET'})
  .then(function(response) {
    if(response.ok) {
      return response.json();
    }
    throw new Error('Request failed.');
  })
  .then((data) => {
      let lista = "";
      data.forEach((peli)=>
      {
          lista = lista + "<p>" + peli.title + " (" + peli.year + ")" + "</p>" + peli.fullplot + "</p>" + "IMDB rating " + peli.imdb + "</p>" + "Tomatoes rating " + peli.tomatoes + "</p>" + "Metacritic rating " + peli.metacritic + "</p>";
      })
      const divRes = document.getElementById("resultados");
      divRes.innerHTML = lista;
      return;
  } )
  .catch(function(error) {
    console.log(error);
  });
});

Randombutton.addEventListener('click', function(e) {
  fetch('/peliculas-random', {method: 'GET'})
  .then(function(response) {
    if(response.ok) {
      return response.json();
    }
    throw new Error('Request failed.');
  })
  .then((data) => {
      let lista = "";
      data.forEach((peli)=>
      {
        lista = lista + "<p>" + peli.title + " (" + peli.year + ")" + "</p>" + peli.fullplot + "</p>" + "IMDB rating " + peli.imdb + "</p>" + "Tomatoes rating " + peli.tomatoes + "</p>" + "Metacritic rating " + peli.metacritic + "</p>";
      })
      const divRes = document.getElementById("resultados");
      divRes.innerHTML = lista;
      fetch('/peliculas', {
        method: 'POST',  
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          title: data[0].title,
          fullplot: data[1].fullplot,
          cast: data[2].cast,
          poster: data[3].poster,
          year: data[4].year}
        )}
      )
      return;
  } )
  .catch(function(error) {
    console.log(error);
  });
});