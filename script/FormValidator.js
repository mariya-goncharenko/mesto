class FormValidator {
  constructor (formElement, validationConfig) {
    this._formElement = formElement
    this._validationConfig = validationConfig
  }

  _disableSubmitButton() {
    const buttonSave = this._formElement.querySelector(this._validationConfig.submitButtonSelector)
      buttonSave.classList.remove(this._validationConfig.activeButtonClass)
      buttonSave.classList.add(this._validationConfig.inactiveButtonClass)
      buttonSave.disabled = true
  }  
    
  _showInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._validationConfig.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._validationConfig.errorClass);
  };
  
  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._validationConfig.inputErrorClass);
    errorElement.classList.remove(this._validationConfig.errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  
  _toggleButtonState(inputList, buttonElement) {
  if (this._hasInvalidInput(inputList)) {
    buttonElement.classList.remove(this._validationConfig.activeButtonClass);
    buttonElement.classList.add(this._validationConfig.inactiveButtonClass);
    buttonElement.disabled = true
  } else {
    buttonElement.classList.remove(this._validationConfig.inactiveButtonClass);
    buttonElement.classList.add(this._validationConfig.activeButtonClass);
    buttonElement.disabled = false
  }
  };

  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._validationConfig.inputSelector));
    const buttonElement = this._formElement.querySelector(this._validationConfig.submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input',() => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement, this._validationConfig);
      });
    });
  };

  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this._validationConfig.formSelector));
    formList.forEach((formElement) => {
      this._formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
  
      this._setEventListeners(this._formElement,this._validationConfig);
    });
         
    }
  }

    export {FormValidator}