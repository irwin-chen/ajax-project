/* exported data */

var data = {
  savedRecipes: []
};

var storedJSON = window.localStorage.getItem('javascript-local-storage');
if (storedJSON !== null) {
  data = JSON.parse(storedJSON);
}

window.addEventListener('beforeunload', function () {
  var dataJSON = JSON.stringify(data);
  window.localStorage.setItem('javascript-local-storage', dataJSON);
});
