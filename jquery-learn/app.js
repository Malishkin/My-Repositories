// 1. Создание элемента
// var newDiv = document.createElement('div');

// // 2. Установка свойств для этого элемента
// newDiv.innerHTML = 'Привет, мир!';
// newDiv.id = 'myNewDiv';
// newDiv.className = 'someClass';

// // 3. Добавление элемента в DOM
// document.body.appendChild(newDiv);

// 1. Создание элемента
var newDiv = $("<div></div>");

// 2. Установка свойств для этого элемента
newDiv.text("Привет, мир!");
newDiv.attr("id", "myNewDiv");
newDiv.addClass("someClass");

// 3. Добавление элемента в DOM
$("body").append(newDiv);

var newButton = $("<button>Нажми меня</button>");
newButton.click(function () {
  alert("Привет, мир!");
});
