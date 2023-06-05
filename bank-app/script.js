"use strict";

// Simply Bank App

const account1 = {
  userName: "Cecil Ireland",
  transactions: [500, 250, -300, 5000, -850, -110, -170, 1100],
  interest: 1.5,
  pin: 1111,
  transactionsDates: [
    "2020-10-02T14:43:31.074Z",
    "2020-10-29T11:24:19.761Z",
    "2020-11-15T10:45:23.907Z",
    "2021-01-22T12:17:46.255Z",
    "2021-02-12T15:14:06.486Z",
    "2021-03-09T11:42:26.371Z",
    "2021-05-21T07:43:59.331Z",
    "2021-06-22T15:21:20.814Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account2 = {
  userName: "Amani Salt",
  transactions: [2000, 6400, -1350, -70, -210, -2000, 5500, -30],
  interest: 1.3,
  pin: 2222,
  transactionsDates: [
    "2020-10-02T14:43:31.074Z",
    "2020-10-29T11:24:19.761Z",
    "2020-11-15T10:45:23.907Z",
    "2021-01-22T12:17:46.255Z",
    "2021-02-12T15:14:06.486Z",
    "2021-03-09T11:42:26.371Z",
    "2021-05-21T07:43:59.331Z",
    "2021-06-22T15:21:20.814Z",
  ],
  currency: "UAH",
  locale: "uk-UA",
};

const account3 = {
  userName: "Corey Martinez",
  transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
  interest: 0.8,
  pin: 3333,
  transactionsDates: [
    "2020-10-02T14:43:31.074Z",
    "2020-10-29T11:24:19.761Z",
    "2020-11-15T10:45:23.907Z",
    "2021-01-22T12:17:46.255Z",
    "2021-02-12T15:14:06.486Z",
    "2021-03-09T11:42:26.371Z",
    "2021-05-21T07:43:59.331Z",
    "2021-06-22T15:21:20.814Z",
  ],
  currency: "RUB",
  locale: "ru-RU",
};

const account4 = {
  userName: "Kamile Searle",
  transactions: [530, 1300, 500, 40, 190],
  interest: 1,
  pin: 4444,
  transactionsDates: [
    "2020-10-02T14:43:31.074Z",
    "2020-10-29T11:24:19.761Z",
    "2020-11-15T10:45:23.907Z",
    "2021-01-22T12:17:46.255Z",
    "2021-02-12T15:14:06.486Z",
  ],
  currency: "EUR",
  locale: "fr-CA",
};

const account5 = {
  userName: "Oliver Avila",
  transactions: [630, 800, 300, 50, 120],
  interest: 1.1,
  pin: 5555,
  transactionsDates: [
    "2020-10-02T14:43:31.074Z",
    "2020-10-29T11:24:19.761Z",
    "2020-11-15T10:45:23.907Z",
    "2021-01-22T12:17:46.255Z",
    "2021-02-12T15:14:06.486Z",
  ],
  currency: "USD",
  locale: "en-US",
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

function displayTransactions(account, sort = false) {
  containerTransactions.innerHTML = "";
  const transacs = sort
    ? account.transactions.slice().sort((a, b) => a - b)
    : account.transactions;
  transacs.forEach(function (trans, index) {
    const transType = trans > 0 ? "deposit" : "withdrawal";

    const date = new Date(account.transactionsDates[index]);

    const day = `${date.getDate()}`.padStart(2, 0);
    const month = `${date.getMonth() + 1}`.padStart(2, 0);
    const year = date.getFullYear();
    const transDate = `${day}/${month}/${year}`;
    // const transDate = new Intl.DateTimeFormat(account.locale, {}).format(date);
    const transactionRow = `
   <div class="transactions__row">
   <div class="transactions__type transactions__type--${transType}">
     ${index + 1} ${transType}
   </div>
   <div class="transactions__date">${transDate}</div>
  
   <div class="transactions__value">${trans.toFixed(2)}</div>
 </div>
 `;
    containerTransactions.insertAdjacentHTML("afterbegin", transactionRow);
  });
}

// displayTransactions(account1.transactions);

// console.log(containerTransactions.innerHTML);

// const userName = "Oliver Avila"; //nickname = 'oa'
// const nickName1 = userName
//   .toLowerCase()
//   .split(" ")
//   .map(function (word) {
//     return word[0];
//   })
//   .join("");
const createNicknames = function (accs) {
  accs.forEach(function (acc) {
    acc.nickname = acc.userName
      .toLowerCase()
      .split(" ")
      .map((word) => word[0])
      .join("");
  });
};

createNicknames(accounts);

// const nickName = userName
//   .toLowerCase()
//   .split(" ")
//   .map((word) => word[0])
//   .join("");

// console.log(nickName1, nickName);

// function createNickName(accounts) {
//   accounts.forEach(function (account) {
//     account.nickName = account.userName
//       .toLowerCase()
//       .split(" ")
//       .map((word) => word[0])
//       .join("");
//   });
// }

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
const displayBalance = function (account) {
  const balance = account.transactions.reduce((x, y) => x + y, 0);
  account.balance = balance;
  labelBalance.textContent = `${balance.toFixed(2)}$`;
};

// displayBalance(account);

const displayTotal = function (account) {
  const depositTotal = account.transactions
    .filter((transaction) => transaction > 0)
    .reduce((x, y) => x + y, 0);
  labelSumIn.textContent = `${depositTotal.toFixed(2)}$`;

  const withdrawTotal = account.transactions
    .filter((transaction) => transaction < 0)
    .reduce((x, y) => x + y, 0);
  labelSumOut.textContent = `${withdrawTotal.toFixed(2)}$`;

  const interestTotal = account.transactions
    .filter((transaction) => transaction > 0)
    .map((deposit) => (deposit * account.interest) / 100)
    .filter((interest, index, array) => {
      // console.log(array);
      return interest >= 5;
    })
    .reduce((x, y) => x + y, 0);
  labelSumInterest.textContent = `${interestTotal.toFixed(2)}$`;
};

// displayTotal(account1.transactions);

let currentAccount;

//Always logged in
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;

// labelDate.textContent = new Intl.DateTimeFormat("en-US", {}).format(now);

function updateUI(account) {
  displayTransactions(account);
  displayBalance(account);
  displayTotal(account);
}

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    (account) => account.nickname === inputLoginUsername.value
  );

  if (currentAccount?.pin === +inputLoginPin.value) {
    //Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.userName.split(" ")[0]
    }!`;
    containerApp.style.opacity = 100;

    const now = new Date();
    const month = `${now.getMonth() + 1}`.padStart(2, 0);
    const day = `${now.getDate()}`.padStart(2, 0);
    const year = now.getFullYear();
    labelDate.textContent = `${day}/${month}/${year}`;

    //Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.value = "";
    inputLoginPin.blur();
    updateUI(currentAccount);
  } else {
    alert("Wrong username or password");
  }
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const transferAmount = +inputTransferAmount.value;
  const recipientNickName = inputTransferTo.value;
  const recipientAccount = accounts.find(function (account) {
    return account.nickname === recipientNickName;
  });
  inputTransferAmount.value = inputTransferTo.value = "";
  if (
    transferAmount > 0 &&
    currentAccount.balance >= transferAmount &&
    recipientAccount &&
    currentAccount.nickname !== recipientAccount.nickname
  ) {
    //Doing the transfer
    currentAccount.transactions.push(-transferAmount);
    recipientAccount.transactions.push(transferAmount);

    //Add Date
    currentAccount.transactionsDates.push(new Date().toISOString());
    recipientAccount.transactionsDates.push(new Date().toISOString());

    //Update UI
    updateUI(currentAccount);
  } else {
    alert("Invalid transfer");
  }
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.nickname &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (account) => account.nickname === currentAccount.nickname
    );
    //Delete account
    accounts.splice(index, 1);
    //Hide UI
    containerApp.style.opacity = 0;
    labelWelcome.textContent = "Log in to get started";
  } else {
    alert("Invalid username or pin");
  }
  inputCloseUsername.value = inputClosePin.value = "";
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const loanAmount = Math.floor(inputLoanAmount.value);
  if (
    loanAmount > 0 &&
    currentAccount.transactions.some((x) => x >= (loanAmount * 10) / 100)
  ) {
    //Add loan to current account
    currentAccount.transactions.push(loanAmount);

    //Add Date
    currentAccount.transactionsDates.push(new Date().toISOString());

    //Update UI
    updateUI(currentAccount);
  } else {
    alert("Invalid loan");
  }
  inputLoanAmount.value = "";
});

let sortedTransactions = false;

btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayTransactions(currentAccount, !sortedTransactions);
  sortedTransactions = !sortedTransactions;
});

//Array.from example

// const logoImage = document.querySelector(".logo");
// logoImage.addEventListener("click", function (e) {
//   e.preventDefault();
//   const transactionsUI = document.querySelectorAll(".transactions__value");
//   console.log(transactionsUI);
//   // const transactionsUIArray = Array.from(transactionsUI);
//   // console.log(transactionsUIArray.map((x) => x.textContent));
//   const transactionsUIArray = Array.from(transactionsUI, (x) => +x.textContent);
//   console.log(transactionsUIArray);
// });

//Flat and flatMap Ex 1
// const bankDepositSum = accounts
//   .flatMap((account) => account.transactions)
//   .filter((x) => x > 0)
//   .reduce((x, y) => x + y);
// console.log("Bank deposit Sum: ", bankDepositSum);

//Ex 2
// const withdrawalsOver500 = accounts
//   .flatMap((account) => account.transactions)
//   .filter((x) => x < 0)
//   .filter((x) => x <= -500);
// console.log("Withdrawals over 500: ", withdrawalsOver500);

//Ex 3
// const withdrawalsOver300 = accounts
//   .flatMap((account) => account.transactions)
//   .reduce(
//     (counter, transaction) => (transaction <= -300 ? counter + 1 : counter),
//     0
//   );
// console.log("Withdrawals over 300: ", withdrawalsOver300);

//Ex 4
// const { depositsTotal, withdrawalsTotal } = accounts
//   .flatMap((account) => account.transactions)
//   .reduce(
//     (acc, trans) => {
//       // trans > 0
//       //   ? (acc.depositsTotal += trans)
//       //   : (acc.withdrawalsTotal += trans);
//       acc[trans > 0 ? "depositsTotal" : "withdrawalsTotal"] += trans;
//       return acc;
//     },
//     { depositsTotal: 0, withdrawalsTotal: 0 }
//   );
// console.log("Deposits total: ", depositsTotal);
// console.log("Withdrawals total: ", withdrawalsTotal);
// [...document.querySelectorAll(".transactions__row")].forEach(function (row, i) {
//   if (i % 2 === 0) {
//     row.style.backgroundColor = "gray";
//   }
// });

const logoImage = document.querySelector(".logo");
logoImage.addEventListener("click", function (e) {
  e.preventDefault();
  [...document.querySelectorAll(".transactions__row")].forEach(function (
    row,
    i
  ) {
    if (i % 2 === 0) {
      row.style.backgroundColor = "grey";
    }
  });
});
