"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2022-02-11T17:01:17.194Z",
    "2022-02-13T23:36:17.929Z",
    "2022-02-14T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

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

const formatMovementDate = (date) => {
  const calcDaysPassed = (date1, date2) => {
    return Math.abs(Math.round((date2 - date1) / (1000 * 60 * 60 * 24)));
  };

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) {
    return "Today";
  } else if (daysPassed === 1) {
    return "Yesterday";
  } else if (daysPassed < 5) {
    return `${daysPassed} days ago`;
  }

  const day = date.getDate().toString().padStart(2, 0);
  const month = (date.getMonth() + 1).toString().padStart(2, 0);
  const year = date.getFullYear();
  // return `${day}/${month}/${year}`;

  return new Intl.DateTimeFormat(currentAccount.locale).format(date);
};

const formatCur = (value, locale, currency) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

const displayMovements = function (account, sort = false) {
  //empty parent first
  containerMovements.innerHTML = "";
  const { movements } = account;

  //spread operator won't work with chaining
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach((mov, i) => {
    let movementType = mov >= 0 ? "deposit" : "withdrawal";
    const date = new Date(account.movementsDates[i]);
    const displayDate = formatMovementDate(date);

    const formattedMovement = formatCur(mov, account.locale, account.currency);

    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${movementType}">
            ${i + 1} ${movementType}
          </div>
          <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${formattedMovement}</div>
        </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const createUserNames = (accs) => {
  accs.forEach((acc) => {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};

const calcDisplayBalance = (account) => {
  const { movements } = account;
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  account.balance = balance;
  labelBalance.textContent = `${formatCur(
    balance,
    account.locale,
    account.currency
  )}`;
};

const calcDisplaySummary = (account) => {
  const { movements } = account;

  //incomes
  const incomes = movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${formatCur(
    incomes,
    account.locale,
    account.currency
  )}`;

  //spent
  const spent = movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov * -1, 0);
  labelSumOut.textContent = `${formatCur(
    spent,
    account.locale,
    account.currency
  )}`;

  //interest :1,2% on deposits,only if more than 1
  const interest = movements
    .filter((mov) => mov > 0)
    .map((mov) => (mov * account.interestRate) / 100)
    .filter((interest) => interest >= 1)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumInterest.textContent = `${formatCur(
    interest,
    account.locale,
    account.currency
  )}`;
};

const updateUI = (currentAccount) => {
  //display balance
  calcDisplayBalance(currentAccount);
  //display movements
  displayMovements(currentAccount);
  //display summary
  calcDisplaySummary(currentAccount);

  const now = new Date();
  // day/month/year

  // const day = now.getDate().toString().padStart(2, 0);
  // const month = (now.getMonth() + 1).toString().padStart(2, 0);
  // const year = now.getFullYear();
  // const hour = now.getHours().toString().padStart(2, 0);
  // const minutes = now.getMinutes().toString().padStart(2, 0);

  // labelDate.textContent = `${day}/${month}/${year} ${hour}:${minutes}`;
  // const locale = navigator.language; // 'hu-HU'
  const options = { month: "long", day: "numeric", year: "numeric" };
  labelDate.textContent = Intl.DateTimeFormat(
    currentAccount.locale,
    options
  ).format(now);
};

const startLogoutTimer = () => {
  //set time
  let time = 120; //seconds

  const timerInterval = setInterval(() => {
    let minutes = Math.trunc(time / 60);
    let seconds = time - minutes * 60;
    //print remaining time on UI
    labelTimer.textContent = `${minutes.toString().padStart(2, 0)}: ${seconds
      .toString()
      .padStart(2, 0)}`;
    time -= 1;
    if (time < 0) {
      //logout
      clearInterval(timerInterval);
      labelWelcome.textContent = "Log in to get started";
      containerApp.style.opacity = 0;
    }
  }, 1000);
  return timerInterval;
};

let currentAccount;
let timer;

//FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 1;

//event handlers
btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //display ui and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }!`;
    //clear fields
    inputLoginUsername.value = "";
    inputLoginPin.value = "";
    inputLoginPin.blur();
    containerApp.style.opacity = 1;
    updateUI(currentAccount);
    if (timer) clearInterval(timer);
    timer = startLogoutTimer();
  }
});

btnTransfer.addEventListener("click", (e) => {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = "";
  inputTransferTo.value = "";

  if (
    receiverAccount &&
    amount > 0 &&
    amount <= currentAccount.balance &&
    receiverAccount?.username !== currentAccount.username
  ) {
    receiverAccount.movements.push(amount);
    currentAccount.movements.push(amount * -1);
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAccount.movementsDates.push(new Date().toISOString());
    updateUI(currentAccount);

    //reset timer
    clearInterval(timer);
    startLogoutTimer();
  }
});

btnLoan.addEventListener("click", (e) => {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);
  setTimeout(() => {
    if (
      amount > 0 &&
      currentAccount.movements.some((mov) => mov >= amount * 0.1)
    ) {
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date().toISOString());
      updateUI(currentAccount);
    }
  }, 2500);
  inputLoanAmount.value = "";

  //reset timer
  clearInterval(timer);
  startLogoutTimer();
});

btnClose.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      (acc) => (acc.username = currentAccount.username)
    );
    accounts.splice(index, 1);
    inputClosePin.value = "";
    inputCloseUsername.value = "";
    containerApp.style.opacity = 0;
  }
});

let sorted = false;
btnSort.addEventListener("click", (e) => {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

createUserNames(accounts);

// array methods pratice
const bankDepositSum = accounts
  .map((acc) => acc.movements.filter((s) => s > 0))
  .flat()
  .reduce((acc, curr) => acc + curr, 0);

console.log(`All bank deposits: € ${bankDepositSum}`);

//all bank deposits >1000

const bigDeposits = accounts.flatMap((acc) =>
  acc.movements.filter((s) => s >= 1000)
).length;
console.log(bigDeposits);

const bigDeposits2 = accounts
  .flatMap((acc) => acc.movements)
  .reduce((acc, curr) => {
    return curr >= 1000 ? acc + 1 : acc;
  }, 0);
console.log(bigDeposits2);

const allSums = accounts
  .flatMap((acc) => acc.movements)
  .reduce(
    (acc, curr) => {
      if (curr >= 0) {
        acc.sumDeposits += curr;
      } else {
        acc.sumWithdrawals += Math.abs(curr);
      }
      return acc;
    },
    { sumDeposits: 0, sumWithdrawals: 0 }
  );

console.log(allSums);

//this is a nice title => This Is a Nice Title
const formatTitle = (title) => {
  const words = title.toLowerCase().split(" ");
  const excluded = ["a", "an", "but", "and", "on", "in", "with"];
  const newTitle = words
    .map((word, i) =>
      excluded.includes(word) && i != 0
        ? word
        : word[0].toUpperCase() + word.slice(1)
    )
    .join(" ");
  return newTitle;
};

console.log(formatTitle("this is a NICE title"));
console.log(formatTitle("and this is another title"));
