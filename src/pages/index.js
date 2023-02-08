// Импорты
import './index.css';
import { Card } from '../components/Card.js';
import { initialCards } from '../utils/initialCards.js';
import { validationConfig } from '../utils/validationConfig.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWIthForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {popupName, popupJob, formEditProfile, formCardNew, buttonEditProfile, buttonAddCard } from '../utils/constants.js'

// Валидация форм
const enableValidationEdit = new FormValidator(formEditProfile, validationConfig);
enableValidationEdit.enableValidation(formEditProfile)

const enableValidationAddCard = new FormValidator(formCardNew, validationConfig);
enableValidationAddCard.enableValidation(formCardNew)

//Новая секция:
const contentCards = new Section ({ items:initialCards.reverse() , renderer: createCard }, ".elements" );
contentCards.renderItems()

//Открытие большой картинки: 
const openBigImage = new PopupWithImage(".popup_type_img");
openBigImage.setEventListeners()

//Информация о пользователе:
const userInfo = new UserInfo({
  name: '.profile__name',
  info: '.profile__job'
});

//Форма Edit: 
const popupEditForm = new PopupWIthForm(".popup_type_edit-profile", submitProfileForm);
popupEditForm.setEventListeners()

buttonEditProfile.addEventListener("click", () => {
  popupName.value = userInfo.getUserInfo().user
  popupJob.value = userInfo.getUserInfo().info
  enableValidationEdit.resetValidation()
  popupEditForm.open()
})

function submitProfileForm(evt) {
  userInfo.setUserInfo(evt.nameInput , evt.jobInput)
  popupEditForm.close()
}

//Форма Add: 
const popupAddForm = new PopupWIthForm ( ".popup_type_add-card", submitCardForm );
popupAddForm.setEventListeners()

function submitCardForm(evt) {
  const name = evt.imgInput
  const link = evt.linkInput
  const newCard = createCard({ name, link })
  contentCards.addItem(newCard)
  popupAddForm.close()
}

buttonAddCard.addEventListener("click", () => {
  enableValidationAddCard.resetValidation()
  popupAddForm.open()
})

// Отрисовка карточек:

function createCard(value) {
  const card = new Card(value, ".element-template", handleCardClick).generateCard();
  return card
}

// Открытие большой картинки:
function handleCardClick (name,link) {
  openBigImage.open(name, link)
}