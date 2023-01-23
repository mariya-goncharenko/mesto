/*Создайте класс Card, который создаёт карточку с текстом и ссылкой на изображение:
принимает в конструктор её данные и селектор её template-элемента;
содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;
содержит приватные методы для каждого обработчика;
содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.*/


class Card {
    constructor(data, templateSelector, clickImageHandle) {
      this._name = data.name
      this._link = data.link
      this._templateSelector = templateSelector
      this._clickImageHandle = clickImageHandle
    }
  
    generateCard = () => {
      this._cardElement = document
        .querySelector(this._templateSelector)
        .content.cloneNode(true)
      this._like = this._cardElement.querySelector(".element__like-photo")
      this._title = this._cardElement.querySelector(".element__title")
      this._image = this._cardElement.querySelector(".element__img")
      this._delete = this._cardElement.querySelector(".element__delete-card")  
      this._fillCard()
      this._setEventHandlers()
      return this._cardElement
    }
  
    _likeCard = () => {
      this._like.classList.toggle("element__like-photo_active");
    }
  
    _deleteCard = () => {
      this._delete.closest(".element").remove()
    }
  
    _setEventHandlers = () => {
      this._delete.addEventListener("click", () => this._deleteCard())
      this._like.addEventListener("click", () => this._likeCard())
      this._image.addEventListener("click", () =>
        this._clickImageHandle(this._name, this._link)
      )
    }
  
    _fillCard = () => {
      this._image.src = this._link
      this._image.alt = this._name
      this._title.textContent = this._name
    }
  }
  
  export {Card};