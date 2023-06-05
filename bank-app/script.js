"use strict";

// Simply Bank App

const account1 = {
  userName: "Cecil Ireland",
  transactions: [500, 250, -300, 5000, -850, -110, -170, 1100],
  interest: 1.5,
  pin: 1111,
  transactionsDates: [
    "2022-10-02T14:43:31.074Z",
    "2022-10-29T11:24:19.761Z",
    "2022-11-15T10:45:23.907Z",
    "2023-01-22T12:17:46.255Z",
    "2023-02-12T15:14:06.486Z",
    "2023-03-09T11:42:26.371Z",
    "2023-05-31T07:43:59.331Z",
    "2023-06-04T15:21:20.814Z",
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
    "2022-10-02T14:43:31.074Z",
    "2022-10-29T11:24:19.761Z",
    "2022-11-15T10:45:23.907Z",
    "2023-01-22T12:17:46.255Z",
    "2023-02-12T15:14:06.486Z",
    "2023-03-09T11:42:26.371Z",
    "2023-05-21T07:43:59.331Z",
    "2023-06-04T15:21:20.814Z",
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

const formatTransactionDate = function (date, locale) {
  const getDaysBetweenTwoDates = (date1, date2) =>
    Math.round(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24));
  const daysPassed = getDaysBetweenTwoDates(new Date(), date);
  console.log(daysPassed);
  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

const formatCurrency = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

function displayTransactions(account, sort = false) {
  containerTransactions.innerHTML = "";
  const transacs = sort
    ? account.transactions.slice().sort((a, b) => a - b)
    : account.transactions;
  transacs.forEach(function (trans, index) {
    const transType = trans > 0 ? "deposit" : "withdrawal";
    const date = new Date(account.transactionsDates[index]);
    const transDate = formatTransactionDate(date, account.locale);

    const formattedTransact = formatCurrency(
      trans,
      account.locale,
      account.currency
    );

    const transactionRow = `
   <div class="transactions__row">
   <div class="transactions__type transactions__type--${transType}">
     ${index + 1} ${transType}
   </div>
   <div class="transactions__date">${transDate}</div>
  
   <div class="transactions__value">${formattedTransact}</div>
 </div>
 `;
    containerTransactions.insertAdjacentHTML("afterbegin", transactionRow);
  });
}

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

const displayBalance = function (account) {
  const balance = account.transactions.reduce((x, y) => x + y, 0);
  account.balance = balance;
  labelBalance.textContent = formatCurrency(
    balance,
    account.locale,
    account.currency
  );
};

const displayTotal = function (account) {
  const depositTotal = account.transactions
    .filter((transaction) => transaction > 0)
    .reduce((x, y) => x + y, 0);
  labelSumIn.textContent = formatCurrency(
    depositTotal,
    account.locale,
    account.currency
  );

  const withdrawTotal = account.transactions
    .filter((transaction) => transaction < 0)
    .reduce((x, y) => x + y, 0);
  labelSumOut.textContent = formatCurrency(
    withdrawTotal,
    account.locale,
    account.currency
  );

  const interestTotal = account.transactions
    .filter((transaction) => transaction > 0)
    .map((deposit) => (deposit * account.interest) / 100)
    .filter((interest, index, array) => {
      return interest >= 5;
    })
    .reduce((x, y) => x + y, 0);
  labelSumInterest.textContent = formatCurrency(
    interestTotal,
    account.locale,
    account.currency
  );
};

let currentAccount, currentLogoutTimer;

//Always logged in
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

// const now = new Date();
// const options = {
//   hour: "numeric",
//   minute: "numeric",
//   day: "numeric",
//   month: "long",
//   year: "numeric",
//   weekday: "long",
// };

// const locale = navigator.language;
// console.log(locale);
// labelDate.textContent = new Intl.DateTimeFormat("uk-UA", options).format(now);

const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;
    if (time === 0) {
      clearInterval(logOutTimer);
      labelWelcome.textContent = "Войдите в свой аккаунт";
      containerApp.style.opacity = 0;
    }
    time--;
  };
  let time = 300;
  tick();
  const logOutTimer = setInterval(tick, 1000);
  return logOutTimer;
};

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
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    };

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    //Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.value = "";
    inputLoginPin.blur();

    //Check if timer exists
    if (currentLogoutTimer) clearInterval(currentLogoutTimer);
    //Start timer
    currentLogoutTimer = startLogOutTimer();

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

    //Reset timer
    clearInterval(currentLogoutTimer);
    currentLogoutTimer = startLogOutTimer();
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
  )
    setTimeout(function () {
      currentAccount.transactions.push(loanAmount);
      currentAccount.transactionsDates.push(new Date().toISOString());
      updateUI(currentAccount);
    }, 5000);
  else {
    alert("Invalid loan");
  }
  inputLoanAmount.value = "";
  //Reset timer
  clearInterval(currentLogoutTimer);
  currentLogoutTimer = startLogOutTimer();
});

let sortedTransactions = false;

btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayTransactions(currentAccount, !sortedTransactions);
  sortedTransactions = !sortedTransactions;
});

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

console.log(accounts);
