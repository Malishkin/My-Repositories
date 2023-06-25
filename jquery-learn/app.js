
// JQuery
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


//JavaScript 
// Создание элемента
// var container = document.createElement('div');
// container.style.display = "flex";
// container.style.justifyContent = "center";
// container.style.alignItems = "center";
// container.style.height = "100vh";
// container.style.flexDirection = "column";

// var newDiv = document.createElement('div');
// newDiv.textContent = "Привет, мир!";
// newDiv.id = "myNewDiv";
// newDiv.className = "someClass";

// var newButton = document.createElement('button');
// newButton.textContent = "Нажми меня";
// newButton.style.backgroundColor = "red";
// newButton.style.color = "white";
// newButton.style.padding = "10px 20px";
// newButton.style.border = "none";
// newButton.style.borderRadius = "5px";
// newButton.style.margin = "10px";
// newButton.addEventListener('click', function () {
//     alert("Привет, мир!");
// });

// container.appendChild(newDiv);
// container.appendChild(newButton);
// document.body.appendChild(container);
