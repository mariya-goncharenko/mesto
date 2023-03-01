import Popup from './Popup.js';

export default class PopupWIthForm extends Popup {
    constructor(popupSelector, handleFormSubmit){
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
        this._buttonSave = this._popup.querySelector(".popup__button-save");
        this._buttonSaveEnit = this._buttonSave.textContent;
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        return this._formValues;
    }

    renameButtonSave() {
        this._buttonSave.textContent = 'Сохранение...';
    }

    close() {
        super.close();
        this._form.reset();
        this._buttonSave.textContent = this._buttonSaveEnit;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }

}