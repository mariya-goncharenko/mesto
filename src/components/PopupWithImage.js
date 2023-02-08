import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super (popupSelector);

        this._popupImageImg = this._popup.querySelector(".popup__img");
        this._popupImageTitle = this._popup.querySelector(".popup__img-title");
    }

    open(name, link) {
        super.open();
        this._popupImageImg.src = link;
        this._popupImageImg.alt = name;
        this._popupImageTitle.textContent = name;
    }

    close() {
        super.close();
        this._popupImageImg.src = '';
        this._popupImageImg.alt = '';
        this._popupImageTitle.textContent = '';
    }
    
}