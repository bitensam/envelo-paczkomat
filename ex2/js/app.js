// SELECTORS

const modalElement = document.getElementById("modal");
const modalTimeElement = document.getElementById("modal_time");
const formElement = document.querySelector(".form-grid");
const inputPhoneWrapper = document.querySelector(".input-group-phone");
const inputCodeWrapper = document.querySelector(".input-group-code");
const inputPhoneElement = document.getElementById("input_phone");
const inputCodeElement = document.getElementById("input_code");
const btnModalFinish = document.querySelector(".btn-finish");
const btnModalRestart = document.querySelector(".btn-restart");
const btnFormSubmit = document.querySelector(".btn-submit");

// global

let timerStarted = false;
let timeAmount = 0;
let timerCount;

// database

const db = [
  { phoneNumber: 123456789, code: 1234 },
  { phoneNumber: 987654321, code: 4321 },
  { phoneNumber: 666666666, code: 6666 },
];

//Init App
const appInit = () => {
  btnFormSubmit.addEventListener("click", handleSubmit);
  btnModalFinish.addEventListener("click", handleFinish);
  btnModalRestart.addEventListener("click", handleRestart);
  inputPhoneElement.addEventListener("input", handleChangeInputs);
  inputCodeElement.addEventListener("input", handleChangeInputs);
};

//Submit button handler
const handleSubmit = (e) => {
  e.preventDefault();
  if (!formElement.classList.contains("active")) {
    formElement.classList.add("active");
    timerStarted = !timerStarted;
    timerStart();
  } else {
    modalElement.classList.add("active");
    timerStop();
  }
};
//Inputs handler
const handleChangeInputs = (e) => {
  const { name, value } = e.target;

  values = {
    ...values,
    [name]: value,
  };

  console.log("values:", values);
};

let values = { phoneNumber: "", code: "" };

//Validate

const validate = (values) => {
  let errors = {};
  let phoneNumberErrorMsgWrapper = null;
  let codeErrorMsgWrapper = null;

  //=====================PHONE NUMBER===========================================
  db.map((item) => {
    if (item.phoneNumber === values.phoneNumber) {
      return;
    } else if (item.phoneNumber !== values.phoneNumber) {
      errors.phoneNumber = "Podaj prawidłowy numer telefonu";
      if (phoneNumberErrorMsgWrapper === null) {
        phoneNumberErrorMsgWrapper = inputPhoneWrapper.createElement("div");
        phoneNumberErrorMsgWrapper.innerHTML = `<p class="error-msg">${errors.phoneNumber}</p>`;
      } else {
        phoneNumberErrorMsgWrapper.innerHTML = `<p class="error-msg">${errors.phoneNumber}</p>`;
      }
    } else if (values.phoneNumber.trim().length === 0) {
      errors.phoneNumber = "Proszę wprowadzić 9-cyfrowy numer telefonu";
      if (phoneNumberErrorMsgWrapper === null) {
        phoneNumberErrorMsgWrapper = inputPhoneWrapper.createElement("div");
        phoneNumberErrorMsgWrapper.innerHTML = `<p class="error-msg">${errors.phoneNumber}</p>`;
      } else {
        phoneNumberErrorMsgWrapper.innerHTML = `<p class="error-msg">${errors.phoneNumber}</p>`;
      }
    }
  });
  //=====================CODE===========================================

  db.map((item) => {
    if (item.code === values.code) {
      return;
    } else if (item.code !== values.code) {
      errors.code = "Podany kod jest nieprawidłowy";
      if (codeErrorMsgWrapper === null) {
        codeErrorMsgWrapper = inputCodeWrapper.createElement("div");
        codeErrorMsgWrapper.innerHTML = `<p class="error-msg">${errors.code}</p>`;
      } else {
        codeErrorMsgWrapper.innerHTML = `<p class="error-msg">${errors.code}</p>`;
      }
    } else if (values.code.trim().length === 0) {
      errors.code = "Proszę wprowadzić 4-cyfrowy kod odbioru";
      if (codeErrorMsgWrapper === null) {
        codeErrorMsgWrapper = inputCodeWrapper.createElement("div");
        codeErrorMsgWrapper.innerHTML = `<p class="error-msg">${errors.code}</p>`;
      } else {
        codeErrorMsgWrapper.innerHTML = `<p class="error-msg">${errors.code}</p>`;
      }
    }
  });
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

//Finish button handler
const handleFinish = (e) => {
  e.preventDefault();
  modalElement.classList.remove("active");
  formElement.classList.remove("active");
};
//Restart button handler
const handleRestart = (e) => {
  e.preventDefault();
  modalElement.classList.remove("active");
  timeAmount = 0;
};

appInit();
