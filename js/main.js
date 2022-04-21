var $form = document.querySelector('form');
var $searchBar = document.querySelector('input');
var $recipeContainer = document.querySelector('.recipe-container');
var $searchView = document.querySelector('.home-page');
var $recipeCard = document.querySelector('.recipe-card');
var $addButton = document.querySelector('.add-button');
var add = null;
var query = null;
var recipeId = null;
var recipe = null;

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  if ($recipeContainer.firstElementChild) {
    while ($recipeContainer.firstElementChild) {
      $recipeContainer.children[0].remove();
    }
  }
  query = $searchBar.value;
  parseQuery();
  serverRequest();
  $form.reset();
});

$recipeContainer.addEventListener('click', function (event) {
  if (event.target.matches('button')) {
    recipeId = event.target.getAttribute('recipeid');
  }
  recipeRequest();
  $searchView.className = 'hidden';
  $addButton.classList.remove('hidden');
});

$recipeCard.addEventListener('click', function (event) {
  if (event.target.matches('button')) {
    $searchView.classList.remove('hidden');
    if ($recipeCard.firstElementChild) {
      while ($recipeCard.firstElementChild) {
        $recipeCard.children[0].remove();
      }
    }
    $addButton.classList.add('hidden');
    add = false;
    addButtonToggle();
  }
});

$addButton.addEventListener('click', function () {
  if (!add) {
    add = true;
    addButtonToggle();
    data.savedRecipes.push(recipe);
  } else {
    add = false;
    addButtonToggle();
    data.savedRecipes.pop();
  }
});

function addButtonToggle() {
  if (add) {
    $addButton.textContent = '✔️ ADDED';
    $addButton.className = 'added-button';
  } else {
    $addButton.textContent = '+ ADD';
    $addButton.className = 'add-button';
  }
}

function parseQuery() {
  query = query.trim();
  query = query.replaceAll(' ', ',+');
}

function recipePreview(index) {
  var $recipePreviewEntry = document.createElement('div');
  $recipePreviewEntry.className = 'column-third margin-bot-media recipe-preview-entry';

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
  $recipeInfoButton.setAttribute('recipeid', query[index].id);

  $recipePreviewCard.append($recipeImage, $recipeName, $recipeInfoButton);
  $recipePreviewEntry.append($recipePreviewCard);
  $recipeContainer.append($recipePreviewEntry);
}

function recipeWindows() {
  var $windowsDiv = document.createElement('div');
  $windowsDiv.className = 'windows-recipe-card row';
  $recipeCard.append($windowsDiv);

  var $columnOne = document.createElement('div');
  var $columnTwo = document.createElement('div');
  $columnOne.className = 'column-half';
  $columnTwo.className = 'column-half';

  $windowsDiv.append($columnOne, $columnTwo);

  var $recipeImage = document.createElement('img');
  $recipeImage.className = 'recipe-img margin-bot-media';
  $recipeImage.src = recipe.image;

  var $ingredientsBlock = document.createElement('div');
  $ingredientsBlock.className = 'margin-bot-thirty ingredients-block';

  $columnOne.append($recipeImage, $ingredientsBlock);

  var $ingredientsTitle = document.createElement('p');
  $ingredientsTitle.className = 'divider-title margin-0';
  $ingredientsTitle.textContent = 'INGREDIENTS';

  var $ingredientsDivider = document.createElement('div');
  $ingredientsDivider.className = 'divider margin-0';

  var $ingredientsList = document.createElement('ul');
  $ingredientsList.className = 'ingredients-list padding-bottom-15';

  $ingredientsBlock.append($ingredientsTitle, $ingredientsDivider, $ingredientsList);

  for (var ingredientsIndex = 0; ingredientsIndex < recipe.extendedIngredients.length; ingredientsIndex++) {
    var $ingredientItem = document.createElement('li');
    $ingredientItem.textContent = recipe.extendedIngredients[ingredientsIndex].original;
    $ingredientsList.append($ingredientItem);
  }

  var $titleContainer = document.createElement('div');
  $titleContainer.className = 'text-center title-container';

  var $instructionsBlock = document.createElement('div');
  $instructionsBlock.className = 'margin-bot-thirty instructions-block';
  $columnTwo.append($titleContainer, $instructionsBlock);

  var $recipeTitle = document.createElement('p');
  $recipeTitle.className = 'recipe-title';
  $recipeTitle.textContent = recipe.title;

  var $timeServe = document.createElement('div');
  $timeServe.className = 'row justify-around';

  $titleContainer.append($recipeTitle, $timeServe);

  var $cookTime = document.createElement('p');
  $cookTime.textContent = 'Cook Time: ' + recipe.readyInMinutes + ' minutes';

  var $servings = document.createElement('p');
  $servings.textContent = 'Servings: ' + recipe.servings;

  $timeServe.append($cookTime, $servings);

  var $instructionsTitle = document.createElement('p');
  $instructionsTitle.textContent = 'INSTRUCTIONS';
  $instructionsTitle.className = 'divider-title margin-0';

  var $instructionsDivider = document.createElement('div');
  $instructionsDivider.className = 'divider margin-0';

  var $instructionsList = document.createElement('ul');

  $instructionsBlock.append($instructionsTitle, $instructionsDivider, $instructionsList);

  for (var instructionsIndex = 0; instructionsIndex < recipe.analyzedInstructions[0].steps.length; instructionsIndex++) {
    var $instructionItem = document.createElement('li');
    $instructionItem.textContent = recipe.analyzedInstructions[0].steps[instructionsIndex].step;
    $instructionsList.append($instructionItem);
  }
}

function recipeMobile() {
  var $mediaDiv = document.createElement('div');
  $mediaDiv.className = 'media-recipe-card row flex-column';
  $recipeCard.append($mediaDiv);

  var $recipeImage = document.createElement('img');
  $recipeImage.className = 'margin-bot-media';
  $recipeImage.src = recipe.image;

  var $titleContainer = document.createElement('div');
  $titleContainer.className = 'text-center title-container';

  var $recipeTitle = document.createElement('p');
  $recipeTitle.className = 'recipe-title';
  $recipeTitle.textContent = recipe.title;

  var $timeServe = document.createElement('div');
  $timeServe.className = 'row justify-around';

  $titleContainer.append($recipeTitle, $timeServe);

  var $cookTime = document.createElement('p');
  $cookTime.textContent = 'Cook Time: ' + recipe.readyInMinutes + ' minutes';

  var $servings = document.createElement('p');
  $servings.textContent = 'Servings: ' + recipe.servings;

  $timeServe.append($cookTime, $servings);

  var $ingredientsBlock = document.createElement('div');
  $ingredientsBlock.className = 'ingredients-block';

  var $ingredientsTitle = document.createElement('p');
  $ingredientsTitle.className = 'divider-title margin-0';
  $ingredientsTitle.textContent = 'INGREDIENTS';

  var $ingredientsDivider = document.createElement('div');
  $ingredientsDivider.className = 'divider margin-0';

  var $ingredientsList = document.createElement('ul');
  $ingredientsList.className = 'ingredients-list padding-bottom-15';

  $ingredientsBlock.append($ingredientsTitle, $ingredientsDivider, $ingredientsList);

  for (var ingredientsIndex = 0; ingredientsIndex < recipe.extendedIngredients.length; ingredientsIndex++) {
    var $ingredientItem = document.createElement('li');
    $ingredientItem.textContent = recipe.extendedIngredients[ingredientsIndex].original;
    $ingredientsList.append($ingredientItem);
  }

  var $instructionsBlock = document.createElement('div');
  $instructionsBlock.className = 'margin-bot-thirty instructions-block';

  var $instructionsTitle = document.createElement('p');
  $instructionsTitle.textContent = 'INSTRUCTIONS';
  $instructionsTitle.className = 'divider-title margin-0';

  var $instructionsDivider = document.createElement('div');
  $instructionsDivider.className = 'divider margin-0';

  var $instructionsList = document.createElement('ul');

  $instructionsBlock.append($instructionsTitle, $instructionsDivider, $instructionsList);

  for (var instructionsIndex = 0; instructionsIndex < recipe.analyzedInstructions[0].steps.length; instructionsIndex++) {
    var $instructionItem = document.createElement('li');
    $instructionItem.textContent = recipe.analyzedInstructions[0].steps[instructionsIndex].step;
    $instructionsList.append($instructionItem);
  }
  var $buttonDiv = document.createElement('div');
  $buttonDiv.className = 'row flex-button';

  var $backButton = document.createElement('button');
  $backButton.textContent = 'BACK';
  $backButton.className = 'text-white back-button margin-bot-media';

  $buttonDiv.append($backButton);

  $mediaDiv.append($recipeImage, $titleContainer, $ingredientsBlock, $instructionsBlock);
  $recipeCard.append($mediaDiv, $buttonDiv);

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

function recipeRequest() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.spoonacular.com/recipes/' + recipeId + '/information?apiKey=a264ae5f3ca9445d94cfeb08761ae88b');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    recipe = xhr.response;
    recipeWindows();
    recipeMobile();
  });
  xhr.send();
}
