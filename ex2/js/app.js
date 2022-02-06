// SELECTORS

const modalElement = document.getElementById("modal");
const modalTimeElement = document.getElementById("modal_time");
const mainElement = document.getElementById("main_app");
const formElement = document.querySelector(".form-grid");
const errorMsgPhoneElement = document.querySelector(".error-msg-phone");
const errorMsgCodeElement = document.querySelector(".error-msg-code");
const inputPhoneElement = document.getElementById("input_phone");
const inputCodeElement = document.getElementById("input_code");
const btnModalFinish = document.querySelector(".btn-finish");
const btnModalRestart = document.querySelector(".btn-restart");
const btnFormSubmit = document.querySelector(".btn-submit");

// global

let timerStarted = false;
let timeAmount = 0;
let timerCount;
let inputPhoneNumber = "";
let inputCode = "";

// database

const DATA_BASE = [
  {
    userPhoneNumber: "111111111",
    userCode: "1111",
  },
  {
    userPhoneNumber: "222222222",
    userCode: "2222",
  },
  {
    userPhoneNumber: "123456789",
    userCode: "1234",
  },
];

//Init App
const appInit = () => {
  btnFormSubmit.addEventListener("click", handleSubmit);
  btnModalFinish.addEventListener("click", handleFinish);
  btnModalRestart.addEventListener("click", handleRestart);
  inputPhoneElement.addEventListener("input", handleChangePhoneNumber);
  inputCodeElement.addEventListener("input", handleChangeCode);
};

//Submit button handler
const handleSubmit = (e) => {
  e.preventDefault();
  if (!formElement.classList.contains("active")) {
    formElement.classList.add("active");
    timerStarted = !timerStarted;
    timerStart();
  } else {
    validate(inputPhoneNumber, inputCode);
  }
};

//Inputs handlers
const handleChangePhoneNumber = (e) => {
  console.log("phone:", e.target.value);
  return (inputPhoneNumber = e.target.value);
};

const handleChangeCode = (e) => {
  console.log("code:", e.target.value);
  return (inputCode = e.target.value);
};

//Validate

const isInDatabase = (phoneNumber, code) => {
  DATA_BASE.forEach((record) => {
    if (record.userPhoneNumber === phoneNumber && record.userCode === code) {
      mainElement.classList.remove("active");
      timerStop();
      modalElement.classList.add("active");
    } else {
      errorMsgPhoneElement.classList.add("active");
      errorMsgCodeElement.classList.add("active");
      const errorNotInDatabase = "Podanej kombinacji nie znaleziono w bazie";
      errorMsgPhoneElement.innerText = errorNotInDatabase;
      errorMsgCodeElement.innerText = errorNotInDatabase;
    }
  });
};

const validate = (phoneNumber, code) => {
  let errors = {};

  if (phoneNumber.length !== 9) {
    errors.phoneNumber = "Wprowadź 9-cyfrowy numer telefonu";
    errorMsgPhoneElement.classList.add("active");
    errorMsgPhoneElement.innerText = errors.phoneNumber;
  } else if (isNaN(+phoneNumber)) {
    errorMsgPhoneElement.classList.add("active");
    errors.phoneNumber = "Numer musi składać się z cyfr";
    errorMsgPhoneElement.innerText = errors.phoneNumber;
  } else {
    errorMsgPhoneElement.classList.remove("active");
  }

  if (code.length !== 4) {
    errors.code = "Wprowadź 4-cyfrowy kod odbioru";
    errorMsgCodeElement.classList.add("active");
    errorMsgCodeElement.innerText = errors.code;
  } else if (isNaN(+code)) {
    errorMsgCodeElement.classList.add("active");
    errors.code = "Kod musi składać się z cyfr";
    errorMsgCodeElement.innerText = errors.code;
  } else {
    errorMsgCodeElement.classList.remove("active");
  }

  if (
    phoneNumber.length === 9 &&
    !isNaN(+phoneNumber) &&
    code.length === 4 &&
    !isNaN(+code)
  ) {
    isInDatabase(phoneNumber, code);
  }
  //   errorMsgPhoneElement.classList.remove("active");
  //   errorMsgCodeElement.classList.remove("active");
  //   timerStop();
  //   modalElement.classList.add("active");
  // }
};

//Timer
const timerStart = () => {
  if ((timerStarted = true)) {
    timeAmount = 0;
    timerCount = setInterval(() => {
      timeAmount++;
    }, 1000);
  }
};

const timerStop = () => {
  clearInterval(timerCount);
  modalTimeElement.innerText = timeAmount.toString();
  timerStarted = false;
};

const clearUp = () => {
  inputPhoneElement.value = "";
  inputCodeElement.value = "";
  errorMsgCodeElement.innerText = "";
  errorMsgPhoneElement.innerText = "";
  errorMsgPhoneElement.classList.remove("active");
  errorMsgCodeElement.classList.remove("active");
};

//Finish button handler
const handleFinish = (e) => {
  e.preventDefault();
  modalElement.classList.remove("active");
  mainElement.classList.add("active");
  formElement.classList.remove("active");
  clearUp();
};
//Restart button handler
const handleRestart = (e) => {
  e.preventDefault();
  modalElement.classList.remove("active");
  mainElement.classList.add("active");
  clearUp();
  timerStart();
};

appInit();
