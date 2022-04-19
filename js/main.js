var $form = document.querySelector('form');
var $searchBar = document.querySelector('input');
var $recipeContainer = document.querySelector('.recipe-container');
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
    for (var queryIndex = 0; queryIndex < query.length; queryIndex++) {
      recipePreview(queryIndex);
    }
  });
  xhr.send();
}

function recipePreview(index) {
  var $recipePreviewEntry = document.createElement('div');
  $recipePreviewEntry.className = 'column-third margin-bot-fifteen';

  var $recipePreviewCard = document.createElement('div');
  $recipePreviewCard.className = 'row flex-column align-center';

  var $recipeImage = document.createElement('img');
  $recipeImage.src = query[index].image;
  $recipeImage.className = 'recipe-img';

  var $recipeName = document.createElement('p');
  $recipeName.textContent = query[index].title;
  $recipeName.className = 'recipe-name';

  var $recipeInfoButton = document.createElement('button');
  $recipeInfoButton.className = 'info-button text-white';
  $recipeInfoButton.textContent = 'READ MORE';
  $recipeInfoButton.setAttribute('recipeId', query[index].id);

  $recipePreviewCard.append($recipeImage, $recipeName, $recipeInfoButton);
  $recipePreviewEntry.append($recipePreviewCard);
  $recipeContainer.append($recipePreviewEntry);
}

$recipeContainer.addEventListener('click', function (event) {
  if (event.target.matches('button')) {
    return null;
  }
});
