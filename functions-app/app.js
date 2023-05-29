const survey = {
    question: 'What programming language would you like to learn?',
    options: ['0: JavaScript', '1: Python', '2: Ruby', '3: Java', '4: C#'],
    answers: new Array(5).fill(0),
    
    logNewAnswer: function() {
      let answer = parseInt(prompt(this.question + '\n' + this.options.join('\n') + '\n(Enter option number)'));
      if (!isNaN(answer) && answer >= 0 && answer < this.options.length) {
        this.answers[answer]++;
        this.printResults('string');
      } else {
        alert('Invalid input. Please enter a valid option number.');
      }
    },
    
    printResults: function(type = 'array') {
      if (type === 'string') {
        console.log("Survey results: " + this.answers.join(', '));
      } else {
        console.log(this.answers);
      }
    }
};
  
document.querySelector('#poll').addEventListener('click', survey.logNewAnswer.bind(survey));


// survey.printResults.call({answers: [5, 2, 3]}, 'string');


// Замыкания (Closures)

const safeBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

// const booker = safeBooking();

// booker();
// booker();
// booker();

// console.dir(booker);


(function () {
    const h2 = document.querySelector('h2');
    h2.style.color = 'orange';
  
    document.body.addEventListener('click', function() {
      h2.style.color = 'green';
    });
  })();
  
//   Пояснение:
// Функции в JavaScript обладают свойством замыкания, то есть они сохраняют ссылки на переменные из области видимости, в которой они были созданы. Таким образом, даже когда выполнение основной функции IIFE закончено, вложенная функция (которую мы передаем в addEventListener в качестве обработчика событий) все еще сохраняет ссылку на переменную h2.

// Это значит, что в момент, когда обработчик событий вызывается (то есть когда мы кликаем по элементу body), он все еще может доступиться к переменной h2 и изменять ее свойства, в данном случае свойство style.color.

// Также стоит отметить, что обработчик событий не вызывается немедленно, а выполняется при наступлении события (в данном случае, когда происходит клик по телу страницы).




