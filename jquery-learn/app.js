// 1. Создание элемента
// var newDiv = document.createElement('div');

// // 2. Установка свойств для этого элемента
// newDiv.innerHTML = 'Привет, мир!';
// newDiv.id = 'myNewDiv';
// newDiv.className = 'someClass';

// // 3. Добавление элемента в DOM
// document.body.appendChild(newDiv);

// Создание элемента
var container = $("<div></div>").css({
  display: "flex",
  "justify-content": "center",
  "align-items": "center",
  height: "100vh",
  "flex-direction": "column",
});

var newDiv = $("<div>Привет, мир!</div>")
  .attr("id", "myNewDiv")
  .addClass("someClass");
var newButton = $("<button>Нажми меня</button>")
  .css({
    "background-color": "red",
    color: "white",
    padding: "10px 20px",
    border: "none",
    "border-radius": "5px",
    margin: "10px",
  })
  .click(function () {
    alert("Привет, мир!");
  });

container.append(newDiv, newButton);
$("body").append(container);
