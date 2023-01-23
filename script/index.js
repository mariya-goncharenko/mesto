import { Card } from './Card.js';
//import { validationConfig } from './validationConfig.js';
import { initialCards } from './initialCards.js';

// Объявление констант для POP-UP изменения профиля:
const popupEditProfile = document.querySelector(".popup_type_edit-profile");

// Объявление констант для полей ввода POP-UP изменения профиля:
const popupName = popupEditProfile.querySelector(".popup__input_type_name");
const popupJob = popupEditProfile.querySelector(".popup__input_type_job");

// Объявление констант для POP-UP добавления карточки:
const popupAddCard = document.querySelector(".popup_type_add-card");

// Объявление констант для полей ввода POP-UP добавления карточки:
const popupCardImg = popupAddCard.querySelector(".popup__input_type_img");
const popupCardLink = popupAddCard.querySelector(".popup__input_type_link");

// Объявление констант для POP-UP с картинкой:
const popupImg = document.querySelector(".popup_type_img");

// Объявление констант для форм:
const formEditProfile = popupEditProfile.querySelector("#editForm");
const formCardNew = popupAddCard.querySelector("#addForm");

// Объявление констант для кнопок:
const buttonEditProfile = document.querySelector(".profile__edit-profile");
const buttonAddCard = document.querySelector(".profile__add-button");

// Объявление констант для кнопок закрытия:
const buttonCloseEdit = popupEditProfile.querySelector(".popup__close");
const buttonCloseAdd = popupAddCard.querySelector(".popup__close");
const buttonCloseImg = popupImg.querySelector(".popup__close");

// Объявление констант для информации со страницы:
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

// Объявление констант для блока с карточками и POP-UP с картинкой:
const cardsSection = document.querySelector(".elements")
const template = document.querySelector("#element-template").content
const cardElement = template.querySelector(".element")

const popupImageOpen = popupImg.querySelector(".popup__img-container")
const popupImageImg = popupImg.querySelector(".popup__img")
const popupImageTitle = popupImg.querySelector(".popup__img-title")

//Функция для открытия POP-UP:
  function openPopup(popup) {
    popup.addEventListener("click", closePopupOnOverlay);
    document.addEventListener("keydown", closePopupOnEscape);
    popup.classList.add("popup_opened");
  }
  
//Функция для закрытия POP-UP:
  function closePopupOnEscape(evt) {
    if (evt.code == "Escape") {
      const popup = document.querySelector(".popup_opened")
      closePopup(popup)
    }
  }

  function closePopupOnOverlay(evt) {
    if (evt.currentTarget === evt.target) {
      const popup = document.querySelector(".popup_opened")
      closePopup(popup)
    }   
  }

  function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", closePopupOnEscape);
    popup.removeEventListener("click", closePopupOnOverlay);
  }

//Функции для POP-UP изменения профиля:
  buttonEditProfile.addEventListener("click", () => {
    popupName.value = profileName.textContent
    popupJob.value = profileJob.textContent
    disableSubmitButton(popupEditProfile, validationConfig)
    openPopup(popupEditProfile)
  })
  
  buttonCloseEdit.addEventListener("click", () => {
    closePopup(popupEditProfile)
  })

  function submitProfileForm(evt) {
    evt.preventDefault()
    profileName.textContent = popupName.value
    profileJob.textContent = popupJob.value
    closePopup(popupEditProfile)
  }

  formEditProfile.addEventListener('submit', submitProfileForm);

//Функции для POP-UP добавления карточек:

  buttonAddCard.addEventListener("click", () => {
    disableSubmitButton(popupAddCard, validationConfig)
    openPopup(popupAddCard)
  })
  
  buttonCloseAdd.addEventListener("click", () => {
    closePopup(popupAddCard)
  })

  function createCard(value) {
    const card = new Card(value, "#element-template", openBigImage).generateCard();
    return card
    }
  
  function renderCard(card, container) {
    container.prepend(card)
  }
  
  function render() {
    initialCards.reverse().forEach((value) => {
      const newCard = createCard(value)
      renderCard(newCard, cardsSection)
    })
  }
  
  render()
  
  function submitCardForm(evt) {
    evt.preventDefault()
    const name = popupCardImg.value
    const link = popupCardLink.value
    const newCard = createCard({ name, link })
    renderCard(newCard, cardsSection)
    closePopup(popupAddCard)
    formCardNew.reset()
  }
  
  formCardNew.addEventListener("submit", submitCardForm)
  
//Функции для POP-UP картинки:  
  buttonCloseImg.addEventListener("click", () => {
    closePopup(popupImg)
  })

  function openBigImage(name, link) {
    popupImageImg.src = link
    popupImageImg.alt = name
    popupImageTitle.textContent = name
    openPopup(popupImg)
  }

  enableValidation(validationConfig);