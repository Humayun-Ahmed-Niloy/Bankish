"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Zulfur Rahman Raju",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Humayun Ahmed Niloy",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Sakib Al Hasan",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Dr Zafor Iqbal",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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

const showMovements = function (movements, sort = false) {
  containerMovements.innerHTML = "";

  const mov = sort ? movements.sort((a, b) => a - b) : movements;
  mov.forEach(function (value, id) {
    const type = value > 0 ? "deposit" : "withdrawal";
    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${id} ${type}</div>
    <div class="movements__value">${value}</div>
    </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const showTotalBalance = function (acc) {
  acc.Total = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.Total}€`;
};

const calcDisplaySummary = function (movements) {
  const income = movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${income}€`;

  const outcome = movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov);
  labelSumOut.textContent = `${Math.abs(outcome)}€`;
  const interest = movements
    .filter((move) => move > 0)
    .map((deposit) => (deposit * 1.2) / 100)
    .filter((int, i, arr) => int >= 1)
    .reduce((acc, inte) => acc + inte, 0);
  labelSumInterest.textContent = `${interest}`;
};

const createUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.accountUser = acc.owner
      .toLowerCase()
      .split(" ")
      .map(function (name) {
        return name[0];
      })
      .join("");
  });
};
createUserName(accounts);

const showUI = function (acc) {
  showMovements(acc.movements);
  //Showing summary
  calcDisplaySummary(acc.movements);
  //Show total balance
  showTotalBalance(acc);
};

///Event Handler
let currentUser;
btnLogin.addEventListener("click", function (a) {
  a.preventDefault();
  currentUser = accounts.find(
    (acc) => acc.accountUser === inputLoginUsername.value
  );
  if (currentUser?.pin === Number(inputLoginPin.value)) {
    //Start showing account details
    containerApp.style.opacity = 1;
    //Showing Welcome Message
    labelWelcome.textContent = `Welcome ${currentUser.owner.split(" ")[0]}`;
    //Showing movements
    showUI(currentUser);
  }
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receverAcc = accounts.find(
    (acc) => acc.accountUser === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = "";
  if (
    amount > 0 &&
    receverAcc &&
    currentUser.Total >= amount &&
    receverAcc.accountUser !== currentUser.accountUser
  ) {
    currentUser.movements.push(-amount);
    receverAcc.movements.push(amount);

    //update UI
    showUI(currentUser);
  }
});

//loan
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const loanAmount = Number(inputLoanAmount.value);
  if (
    loanAmount > 0 &&
    currentUser.movements.some((mov) => mov >= loanAmount * 0.1)
  ) {
    //add amount to user
    currentUser.movements.push(loanAmount);
    console.log(`You got loan ${loanAmount}`);
    console.log(currentUser.movements);
    //update ui
    showUI(currentUser);
  }
  inputLoanAmount.value = "";
});

//Close accounts work
btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  const closeAcc = accounts.find(
    (acc) => acc.accountUser === inputCloseUsername.value
  );
  const closePin = Number(inputClosePin.value);

  if (
    currentUser.accountUser.value === closeAcc.value &&
    currentUser.pin === closePin
  ) {
    const indexFind = accounts.findIndex(
      (acc) => acc.accountUser === currentUser.accountUser
    );
    console.log(indexFind);
    accounts.splice(indexFind, 1);
    containerApp.style.opacity = 0;
  }
  inputCloseUsername = inputClosePin = "";
});

let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  showMovements(currentUser.movements, !sorted);
  sorted = !sorted;
});

let h2 = true ;
btnSort.ariaDisabled("margin", funtion()){
  
}


/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//Practice///////////////////////////////////////////////////
//////////////////////////////////////////////////
// const diposit = movements.filter(function (mov) {
//   return mov > 0;
// });
// console.log("Diposit: " + diposit);
// const withdraw = movements.filter(function (mov) {
//   return mov < 0;
// });
// console.log("Withdraw: " + withdraw);
// const toUsd = 1.1;
// const totalDeposit = movements
//   .filter((mov) => mov > 0)
//   .map((mov) => mov * toUsd)
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(totalDeposit);
// const arre = [10, -25, 22, 130, -330, 12, 5, 16, 1, 190, -999];
// console.log(arre.sort((a, b) => a - b));
