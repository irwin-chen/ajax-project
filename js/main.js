var $form = document.querySelector('form');
var $searchBar = document.querySelector('input');
var $recipeContainerDiv = document.querySelector('.recipe-container-div');
var $searchRecipeContainer = document.querySelector('.search-recipe-container');
var $savedRecipeContainer = document.querySelector('.saved-recipe-container');
var $searchView = document.querySelector('.home-page');
var $recipeCard = document.querySelector('.recipe-card');
var $addButton = document.querySelector('.add-button');
var $savedRecipesView = document.querySelector('.saved-recipes-button');
var $divText = document.querySelector('.div-text');
var add = null;
var query = null;
var recipeId = null;
var recipe = null;
var apiKey = '';

for (var i = 0; i < data.savedRecipes.length; i++) {
  query = data.savedRecipes;
  var branch = recipePreview(query[i]);
  $savedRecipeContainer.append(branch);
}

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  if ($searchRecipeContainer.firstElementChild) {
    while ($searchRecipeContainer.firstElementChild) {
      $searchRecipeContainer.children[0].remove();
    }
  }
  query = $searchBar.value;
  parseQuery();
  serverRequest();
  $divText.textContent = 'Search';
  $searchRecipeContainer.classList.remove('hidden');
  $savedRecipeContainer.classList.add('hidden');
  $form.reset();
});

$recipeContainerDiv.addEventListener('click', function (event) {
  if (event.target.matches('button')) {
    recipeId = event.target.getAttribute('recipeid');

    var counter = 0;
    for (var i = 0; i < data.savedRecipes.length; i++) {
      if (data.savedRecipes[i].id === parseInt(recipeId)) {
        recipe = data.savedRecipes[i];
        recipeWindows();
        recipeMobile();
        break;
      } else {
        counter++;
      }
    }
    if (counter === data.savedRecipes.length) {
      recipeRequest();
    }

    $searchView.className = 'hidden';
    $addButton.classList.remove('hidden');

    for (i = 0; i < data.savedRecipes.length; i++) {
      if (data.savedRecipes[i].id === parseInt(recipeId)) {
        add = true;
        addButtonToggle();
      }
    }
  }
});

$recipeCard.addEventListener('click', function (event) {
  if (event.target.matches('button')) {
    back();
  }
});

function back() {
  $searchView.classList.remove('hidden');
  if ($recipeCard.firstElementChild) {
    while ($recipeCard.firstElementChild) {
      $recipeCard.children[0].remove();
    }
  }
  add = false;
  addButtonToggle();
  $addButton.classList.add('hidden');
  if (document.querySelectorAll('.saved-recipe-container div.recipe-preview-entry').length === 0) {
    document.querySelector('.no-entries-text').classList.remove('hidden');
  } else {
    document.querySelector('.no-entries-text').className = 'no-entries-text hidden';
  }
}

$addButton.addEventListener('click', function () {
  if (!add) {
    add = true;
    addButtonToggle();
    data.savedRecipes.push(recipe);
    var addedRecipe = recipePreview(recipe);
    $savedRecipeContainer.append(addedRecipe);
  } else {
    for (var i = 0; i < data.savedRecipes.length; i++) {
      if (data.savedRecipes[i].id === parseInt(recipeId)) {
        data.savedRecipes.splice(i, 1);
        document.querySelectorAll('.saved-recipe-container div.recipe-preview-entry')[i].remove();
      }
    }
    add = false;
    addButtonToggle();
  }
});

$savedRecipesView.addEventListener('click', function () {
  if (event.target.matches('a')) {
    $divText.textContent = 'Saved';
    $savedRecipeContainer.classList.remove('hidden');
    $searchRecipeContainer.classList.add('hidden');
    back();
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

function recipePreview(recipeObject) {
  var $recipePreviewEntry = document.createElement('div');
  $recipePreviewEntry.className = 'column-third margin-bot-media recipe-preview-entry';

  var $recipePreviewCard = document.createElement('div');
  $recipePreviewCard.className = 'row flex-column align-center';

  var $recipeImage = document.createElement('img');
  $recipeImage.src = recipeObject.image;
  $recipeImage.className = 'recipe-img';

  var $recipeName = document.createElement('p');
  $recipeName.textContent = recipeObject.title;
  $recipeName.className = 'recipe-name';

  var $recipeInfoButton = document.createElement('button');
  $recipeInfoButton.className = 'info-button text-white';
  $recipeInfoButton.textContent = 'READ MORE';
  $recipeInfoButton.setAttribute('recipeid', recipeObject.id);

  $recipePreviewCard.append($recipeImage, $recipeName, $recipeInfoButton);
  $recipePreviewEntry.append($recipePreviewCard);
  return $recipePreviewEntry;
}

function recipeWindows(recipeObject) {
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
  xhr.open('GET', 'https://api.spoonacular.com/recipes/findByIngredients' + '?ingredients=' + query + '&number=6&ranking=1&ignorePantry=true&apiKey=' + apiKey);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    query = xhr.response;
    for (var queryIndex = 0; queryIndex < query.length; queryIndex++) {
      var branch = recipePreview(query[queryIndex]);
      $searchRecipeContainer.append(branch);
    }
  });
  xhr.send();
}

function recipeRequest() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.spoonacular.com/recipes/' + recipeId + '/information?apiKey=' + apiKey);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    recipe = xhr.response;
    recipeWindows();
    recipeMobile();
  });
  xhr.send();
}
