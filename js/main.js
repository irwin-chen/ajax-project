var $form = document.querySelector('form');
var $searchBar = document.querySelector('input');
var query;

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  query = $searchBar.value;
  parseQuery();
  $form.reset();
  serverRequest();
});

function parseQuery() {
  query = query.trim();
  query = query.replaceAll(' ', ',+');
}

function serverRequest() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.spoonacular.com/recipes/findByIngredients' + '?ingredients=' + query + '&number=6&ranking=1&ignorePantry=true&apiKey=a264ae5f3ca9445d94cfeb08761ae88b');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    query = xhr.response;
  });
  xhr.send();
}
