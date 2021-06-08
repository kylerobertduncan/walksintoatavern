const app = [];

const variables = ['alignments', 'races', 'classes', 'monsters', 'weapon', 'spells', 'skills', 'conditions']

//  Choose each variable and submit to functions

app.callNewItems = function() {
  variables.forEach(function(variable){
    app.getVariableArray(variable);
  });
}

//  Get variable API path

app.getVariableArray = function(variable) {
  if(variable !='weapon') {
    $.ajax({
      url: `https://www.dnd5eapi.co/api/${variable}`,
      method: 'GET',
      dataType: 'json',
    }).then(function(data) {
      const itemArray = (data.results);
      app.getRandomFromArray(itemArray, variable);
    });
  } else {
    $.ajax({
      url: `https://www.dnd5eapi.co/api/equipment-categories/weapon`,
      method: 'GET',
      dataType: 'json',
    }).then(function(data) {
      const itemArray = (data.equipment);
      app.getRandomFromArray(itemArray, variable);
    });
  }
}

//  Select random item from array

app.getRandomFromArray = function(data, variable) {
  randomIndex = Math.floor(Math.random() * data.length);
  const selectedItem = (data[randomIndex]);
  app.showItemsToUser(selectedItem.name, variable);
}

//  Return item name in DOM

app.showItemsToUser = function(item, variable){
  $(`.${variable}`).text(item);
}

//  init and document ready setup

app.init = function(){
  app.callNewItems();
  $('button').on('click', function(){
    app.callNewItems();
    $('html, body').animate({ scrollTop: 0 }, 'fast');
  });
}

$(document).ready(function(){
  app.init();
});