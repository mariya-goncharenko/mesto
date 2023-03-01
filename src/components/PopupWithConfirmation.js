import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector){
        super(popupSelector);
        this._button = this._popup.querySelector('.popup__button-save');
    }
    open(handleSubmit) {
        super.open();
        this._handleSubmit = handleSubmit;
    }

    setEventListeners() {
        super.setEventListeners();
        this._button.addEventListener('click', (evt) => {
            evt.preventDefault();
            this._handleSubmit();
        });
    }
}