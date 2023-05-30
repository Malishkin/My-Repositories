"use strict";

// Simply Bank App

const account1 = {
  userName: "Cecil Ireland",
  transactions: [500, 250, -300, 5000, -850, -110, -170, 1100],
  interest: 1.5,
  pin: 1111,
};

const account2 = {
  userName: "Amani Salt",
  transactions: [2000, 6400, -1350, -70, -210, -2000, 5500, -30],
  interest: 1.3,
  pin: 2222,
};

const account3 = {
  userName: "Corey Martinez",
  transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
  interest: 0.8,
  pin: 3333,
};

const account4 = {
  userName: "Kamile Searle",
  transactions: [530, 1300, 500, 40, 190],
  interest: 1,
  pin: 4444,
};

const account5 = {
  userName: "Oliver Avila",
  transactions: [630, 800, 300, 50, 120],
  interest: 1.1,
  pin: 5555,
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".total__value--in");
const labelSumOut = document.querySelector(".total__value--out");
const labelSumInterest = document.querySelector(".total__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerTransactions = document.querySelector(".transactions");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

function displayTransactions(transactions) {
  containerTransactions.innerHTML = "";
  transactions.forEach(function (trans, index) {
    const transType = trans > 0 ? "deposit" : "withdrawal";
    const transactionRow = `
   <div class="transactions__row">
   <div class="transactions__type transactions__type--${transType}">
     ${index + 1} ${transType}
   </div>
  
   <div class="transactions__value">${trans}</div>
 </div>
 `;
    containerTransactions.insertAdjacentHTML("afterbegin", transactionRow);
  });
}

displayTransactions(account1.transactions);

// console.log(containerTransactions.innerHTML);

const userName = "Oliver Avila"; //nickname = 'oa'
const nickName1 = userName
  .toLowerCase()
  .split(" ")
  .map(function (word) {
    return word[0];
  })
  .join("");

const nickName = userName
  .toLowerCase()
  .split(" ")
  .map((word) => word[0])
  .join("");

// console.log(nickName1, nickName);

function createNickName(accounts) {
  accounts.forEach(function (account) {
    account.nickName = account.userName
      .toLowerCase()
      .split(" ")
      .map((word) => word[0])
      .join("");
  });
}

// createNickName(accounts);
// console.log(accounts);

// const transactions = [500, 200, 1100, -800];

// const withDrawls = transactions.filter(function (trans) {
//   return trans < 0;
// });

// const deposits = transactions.filter((trans) => trans > 0);

// const balanceTrans = transactions.reduce((x, y) => x + y, 0);
// const balanceTrans1 = transactions.reduce(function (acc, item, index, arr) {
//   // console.log(`Iteration ${index}: ${acc}`);
//   return acc + item;
// }, 0);

// console.log(balanceTrans1);
// console.log("-------------------------------");
// let sum = 0;
// for (const trans of transactions) {
//   sum += trans;
//   console.log(sum);
// }

//Get min value of transactions

// const minValue = transactions.reduce((x, y) => {
//   if (x < y) {
//     return x;
//   } else {
//     return y;
//   }
// }, transactions[0]);

// const maxValue = transactions.reduce(
//   (x, y) => (x > y ? x : y),
//   transactions[0]
// );

// console.log(minValue, maxValue);
const displayBalance = function (transactions) {
  const balance = transactions.reduce((x, y) => x + y, 0);
  labelBalance.textContent = `${balance}$`;
};

displayBalance(account1.transactions);

const displayTotal = function (transactions) {
  const depositTotal = transactions
    .filter((transaction) => transaction > 0)
    .reduce((x, y) => x + y, 0);
  labelSumIn.textContent = `${depositTotal}$`;

  const withdrawTotal = transactions
    .filter((transaction) => transaction < 0)
    .reduce((x, y) => x + y, 0);
  labelSumOut.textContent = `${withdrawTotal}$`;

  const interestTotal = transactions
    .filter((transaction) => transaction > 0)
    .map((deposit) => (deposit * account1.interest) / 100)
    .filter((interest, index, array) => {
      console.log(array);
      return interest >= 5;
    })
    .reduce((x, y) => x + y, 0);
  labelSumInterest.textContent = `${interestTotal}$`;
};

displayTotal(account1.transactions);
