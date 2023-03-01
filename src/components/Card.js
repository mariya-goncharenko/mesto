class Card {
    constructor(data, user, templateSelector, clickImageHandle, deleteCard, likeCard, dislikeCard) {
      this._name = data.name
      this._link = data.link
      this._likeNumber = data.likes
      this._userId = user._id
      this._ownerId = data.owner._id
      this._cardId = data._id
      this._templateSelector = templateSelector
      this._clickImageHandle = clickImageHandle
      this._deleteCard = deleteCard
      this._likeCard = likeCard
      this._dislikeCard = dislikeCard
    }

    generateCard = () => {
      this._cardElement = document
        .querySelector(this._templateSelector)
        .content.cloneNode(true)
      this._like = this._cardElement.querySelector(".element__like-photo")
      this._likeNumberElement = this._cardElement.querySelector(".element__like-number")
      this._title = this._cardElement.querySelector(".element__title")
      this._image = this._cardElement.querySelector(".element__img")
      this._delete = this._cardElement.querySelector(".element__delete-card")  
      this._fillCard()
      this._setEventHandlers()
      return this._cardElement
    }
  
    _addLikeCard = () => {
      this._like.classList.add("element__like-photo_active");
      this._likeCard(this, this._cardId)
    }

    likeElement(cardData) {
      this._likeNumberElement.textContent = cardData.likes.length;
      this._likeNumber = cardData.likes;
    }

    _removeLikeCard = () => {
      this._like.classList.remove("element__like-photo_active");
      this._dislikeCard(this, this._cardId)
    }

    dislikeElement(cardData) {
      this._likeNumberElement.textContent = cardData.likes.length; 
      this._likeNumber = cardData.likes;
    }

    _isLike = () => {return this._likeNumber.find((elementId) => elementId._id === this._userId)}
    _isYouCard() {
      if (this._ownerId === this._userId) {
        return true
      } else {
        return false
      }
    }

    _likeCardForUser () {
       if (this._isLike()) { 
        this._removeLikeCard()
      } else {
        this._addLikeCard()
      } 
    }

    deleteCardElement(){
      this._delete.closest(".element").remove();
    }
  
    _setEventHandlers = () => {
      this._delete.addEventListener("click", () => 
      this._deleteCard(this, this._cardId))
      this._like.addEventListener("click", () => this._likeCardForUser())
      this._image.addEventListener("click", () =>
        this._clickImageHandle(this._name, this._link)
      )
    }
  
    _fillCard = () => {
      if (this._isLike()) {
          this._like.classList.add("element__like-photo_active")
        } else {
          this._like.classList.remove("element__like-photo_active")
        };

      if (this._isYouCard() === false) {
        const deleteElement = this._cardElement.getElementById('element__delete-card');
        deleteElement.remove()
      } 
      
      this._likeNumberElement.textContent = this._likeNumber.length
      this._image.src = this._link
      this._image.alt = this._name
      this._title.textContent = this._name
    }
  }
  
  export {Card};