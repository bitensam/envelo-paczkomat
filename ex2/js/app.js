import { select, database } from "./settings.js";

// SELECTORS

const modalElement = document.getElementById(select.modal.modalWrapper);
const modalTimeElement = document.getElementById(select.modal.modalTime);
const btnModalFinish = document.querySelector(select.modal.btnFinish);
const btnModalRestart = document.querySelector(select.modal.btnRestart);

const mainWrapper = document.getElementById(select.main.mainWrapper);

const formWrapper = document.querySelector(select.form.formWrapper);
const inputPhoneElement = document.getElementById(select.form.inputPhone);
const inputCodeElement = document.getElementById(select.form.inputCode);
const btnFormSubmit = document.querySelector(select.form.btnSubmit);
const errorMsgPhoneElement = document.querySelector(select.form.errorMsgPhone);
const errorMsgCodeElement = document.querySelector(select.form.errorMsgCode);

// GLOBAL VARIABLES

let timerStarted = false;
let timeAmount = 0;
let timerCount;
let inputPhoneNumber = "";
let inputCode = "";

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
  if (!formWrapper.classList.contains("active")) {
    formWrapper.classList.add("active");
    timerStarted = !timerStarted;
    timerStart();
  } else {
    validate(inputPhoneNumber, inputCode);
  }
};

//Inputs handlers
const handleChangePhoneNumber = (e) => {
  inputPhoneNumber = e.target.value;
};

const handleChangeCode = (e) => {
  inputCode = e.target.value;
};

//Validate

const isInDatabase = (phoneNumber, code) => {
  database.forEach((record) => {
    if (record.userPhoneNumber === phoneNumber && record.userCode === code) {
      mainWrapper.classList.remove("active");
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
  mainWrapper.classList.add("active");
  formWrapper.classList.remove("active");
  clearUp();
};
//Restart button handler
const handleRestart = (e) => {
  e.preventDefault();
  modalElement.classList.remove("active");
  mainWrapper.classList.add("active");
  clearUp();
  timerStart();
};

appInit();
