
function disableSubmitButton(formElement, validationConfig) {
  const buttonSave = formElement.querySelector(validationConfig.submitButtonSelector)
    buttonSave.classList.remove(validationConfig.activeButtonClass)
    buttonSave.classList.add(validationConfig.inactiveButtonClass)
    buttonSave.disabled = true
}

  const showInputError = (formElement, inputElement, validationConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(validationConfig.errorClass);
  };
  
  const hideInputError = (formElement, inputElement, validationConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = '';
  };

  function checkInputValidity(formElement, inputElement, validationConfig) {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, validationConfig);
    } else {
      hideInputError(formElement, inputElement, validationConfig);
    }
  };

  function hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  
  function toggleButtonState(inputList, buttonElement, validationConfig) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.remove(validationConfig.activeButtonClass);
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    buttonElement.disabled = true
  } else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    buttonElement.classList.add(validationConfig.activeButtonClass);
    buttonElement.disabled = false
  }
  };

  function setEventListeners(formElement, validationConfig) {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, validationConfig);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, validationConfig);
        toggleButtonState(inputList, buttonElement, validationConfig);
      });
    });
  };

  function enableValidation(validationConfig) {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
  
      setEventListeners(formElement,validationConfig);
    });
  };
  