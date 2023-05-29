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


Замыкания (Closures)

const safeBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = safeBooking();

booker();
booker();
booker();

console.dir(booker);
  

